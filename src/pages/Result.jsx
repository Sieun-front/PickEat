import { useEffect, useState } from 'react';
import { Bookmark, BookmarkCheck, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import ReactGA from 'react-ga4';
import { saveRestaurant, unsaveRestaurant } from '../api/restaurantApi';

function Result() {
    const navigate = useNavigate();

    const [restaurants, setRestaurants] = useState([]);
    const [hasRetried, setHasRetried] = useState(false);

    const userMode = localStorage.getItem('userMode');
    const user = JSON.parse(localStorage.getItem('user'));
    const nickname = user?.nickname;

    const isLogin = userMode === 'login';
    const displayName = userMode === 'guest' ? '배고픈 픽잇러' : nickname || '픽잇러';

    useEffect(() => {
        const savedRecommendations = localStorage.getItem('recommendations');

        if (!savedRecommendations) {
            alert('추천 결과가 없습니다. 다시 추천을 받아주세요.');
            navigate('/recommend', { replace: true });
            return;
        }

        const parsedRecommendations = JSON.parse(savedRecommendations);
        const localSavedRestaurants = JSON.parse(localStorage.getItem('savedRestaurants') || '[]');

        const recommendationsWithSavedStatus = parsedRecommendations.map((restaurant) => ({
            ...restaurant,
            is_saved: isLogin
                ? restaurant.is_saved
                : localSavedRestaurants.some((saved) => saved.naver_id === restaurant.naver_id),
        }));

        setRestaurants(recommendationsWithSavedStatus);

        const retryStatus = localStorage.getItem('hasRetried');

        if (retryStatus === 'true') {
            setHasRetried(true);
        }

        localStorage.setItem('hasRecommendationResult', 'true');

        ReactGA.event('recommendation_result_view', {
            page: 'result',
            user_mode: userMode || 'unknown',
        });
    }, [navigate, userMode, isLogin]);

    const handleBackToOptions = () => {
        localStorage.removeItem('hasRetried');
        localStorage.removeItem('excludedNaverIds');

        ReactGA.event('back_to_options_click', {
            page: 'result',
            user_mode: userMode || 'unknown',
        });

        navigate('/recommend');
    };

    const handleGuestSaveClick = (restaurant) => {
        const savedRestaurants = JSON.parse(localStorage.getItem('savedRestaurants') || '[]');

        const isAlreadySaved = savedRestaurants.some((item) => item.naver_id === restaurant.naver_id);

        const updatedSavedRestaurants = isAlreadySaved
            ? savedRestaurants.filter((item) => item.naver_id !== restaurant.naver_id)
            : [
                  ...savedRestaurants,
                  {
                      ...restaurant,
                      is_saved: true,
                  },
              ];

        localStorage.setItem('savedRestaurants', JSON.stringify(updatedSavedRestaurants));

        setRestaurants((prev) =>
            prev.map((item) =>
                item.naver_id === restaurant.naver_id
                    ? {
                          ...item,
                          is_saved: !isAlreadySaved,
                      }
                    : item
            )
        );

        ReactGA.event(isAlreadySaved ? 'restaurant_unsave_click' : 'restaurant_save_click', {
            page: 'result',
            save_type: 'local',
            restaurant_id: restaurant.id,
            restaurant_name: restaurant.name,
            naver_id: restaurant.naver_id,
            user_mode: userMode || 'unknown',
        });
    };

    const handleLoginSaveClick = async (restaurant) => {
        try {
            const isAlreadySaved = restaurant.is_saved;

            const data = isAlreadySaved
                ? await unsaveRestaurant(restaurant.naver_id)
                : await saveRestaurant(restaurant.naver_id);

            setRestaurants((prev) =>
                prev.map((item) =>
                    item.naver_id === restaurant.naver_id
                        ? {
                              ...item,
                              is_saved: data.saved,
                          }
                        : item
                )
            );

            ReactGA.event(isAlreadySaved ? 'restaurant_unsave_click' : 'restaurant_save_click', {
                page: 'result',
                save_type: 'server',
                restaurant_id: restaurant.id,
                restaurant_name: restaurant.name,
                naver_id: restaurant.naver_id,
                user_mode: userMode || 'unknown',
            });
        } catch (error) {
            console.error('서버 저장 처리 실패:', error);
            alert('저장 처리에 실패했어요. 다시 시도해주세요.');
        }
    };

    const handleSaveClick = (restaurant) => {
        if (isLogin) {
            handleLoginSaveClick(restaurant);
            return;
        }

        handleGuestSaveClick(restaurant);
    };

    const handleNaverMapClick = (restaurant) => {
        ReactGA.event('naver_map_click', {
            page: 'result',
            restaurant_id: restaurant.id,
            restaurant_name: restaurant.name,
            naver_id: restaurant.naver_id,
            user_mode: userMode || 'unknown',
        });

        window.open(`https://map.naver.com/p/entry/place/${restaurant.naver_id}`, '_blank');
    };

    const handleRetryRecommend = () => {
        if (hasRetried) return;

        ReactGA.event('recommendation_retry_click', {
            page: 'result',
            user_mode: userMode || 'unknown',
        });

        const currentRecommendations = JSON.parse(localStorage.getItem('recommendations') || '[]');

        const excludedNaverIds = currentRecommendations.map((restaurant) => restaurant.naver_id).filter(Boolean);

        localStorage.setItem('excludedNaverIds', JSON.stringify(excludedNaverIds));

        setHasRetried(true);
        localStorage.setItem('hasRetried', 'true');
        localStorage.removeItem('recommendations');

        navigate('/loading');
    };

    return (
        <main className="min-h-screen overflow-y-auto bg-white pb-24 text-left">
            <section className="relative h-[128px] overflow-hidden bg-gradient-to-b from-[#FF761A] to-[#FF4F00] px-6 pt-10 text-center text-white">
                <h1 className="text-[28px] font-black tracking-[-1px]">PickEat</h1>
                <div className="absolute bottom-[-28px] left-[-10%] h-[58px] w-[120%] rounded-[50%] bg-white" />
            </section>

            <section className="px-6 pt-8">
                <button
                    type="button"
                    onClick={handleBackToOptions}
                    className="mb-5 rounded-full bg-[#FFF2E8] px-4 py-2 text-[14px] font-black text-[#FF5A0A]"
                >
                    ← 옵션 다시 고르기
                </button>

                <h2 className="text-[29px] font-black leading-tight tracking-[-2px] text-[#111]">
                    {displayName}님에게 딱 맞는
                    <br />
                    추천 맛집 <span className="text-[#FF5A0A]">{restaurants.length}곳</span> ✨
                </h2>
            </section>

            <section className="mt-5 flex flex-col gap-4 px-5">
                {restaurants.map((restaurant) => (
                    <article
                        key={restaurant.id}
                        className="relative rounded-[24px] bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-[#F0F0F0]"
                    >
                        <div className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-b from-[#FF761A] to-[#FF4F00] text-[22px] font-black text-white">
                            {restaurant.rank}
                        </div>

                        <div className="flex gap-4">
                            <img
                                src={restaurant.picture}
                                alt={restaurant.name}
                                className="h-[140px] w-[140px] shrink-0 rounded-2xl object-cover"
                                onError={(e) => {
                                    e.currentTarget.src =
                                        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600';
                                }}
                            />

                            <div className="flex flex-1 flex-col">
                                <h3 className="mt-2 text-[21px] font-black text-[#111]">{restaurant.name}</h3>

                                <div className="mt-8">
                                    <strong className="text-[14px] font-black text-[#FF5A0A]">AI 추천 이유</strong>
                                    <p className="mt-2 text-[13px] font-semibold leading-5 text-[#555]">
                                        {restaurant.reason}
                                    </p>
                                </div>

                                <div className="mt-4 flex items-center justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleSaveClick(restaurant)}
                                        className={
                                            restaurant.is_saved
                                                ? 'flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF2E8] text-[#FF5A0A]'
                                                : 'flex h-10 w-10 items-center justify-center rounded-xl border border-[#EAEAEA] text-[#666] transition hover:bg-[#F8F8F8]'
                                        }
                                        aria-label={`${restaurant.name} 저장하기`}
                                    >
                                        {restaurant.is_saved ? (
                                            <BookmarkCheck size={18} fill="currentColor" />
                                        ) : (
                                            <Bookmark size={18} />
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleNaverMapClick(restaurant)}
                                        className="flex h-10 items-center gap-1 rounded-xl bg-[#FF5A0A] px-4 text-[14px] font-black text-white"
                                    >
                                        <Navigation size={15} />
                                        길찾기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}

                <button
                    type="button"
                    onClick={handleRetryRecommend}
                    disabled={hasRetried}
                    className={
                        hasRetried
                            ? 'mt-2 h-[56px] w-full rounded-[22px] bg-[#D9D9D9] text-[17px] font-black text-white'
                            : 'mt-2 h-[56px] w-full rounded-[22px] bg-[#FFF2E8] text-[17px] font-black text-[#FF5A0A]'
                    }
                >
                    {hasRetried ? '다시 추천은 한 번만 가능해요' : '같은 조건으로 다시 추천받기'}
                </button>
            </section>

            <BottomNav />
        </main>
    );
}

export default Result;
