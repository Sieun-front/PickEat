import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import ReactGA from 'react-ga4';

function Result() {
    const navigate = useNavigate();

    const [restaurants, setRestaurants] = useState([]);
    const [hasRetried, setHasRetried] = useState(false);

    const userMode = localStorage.getItem('userMode');
    const user = JSON.parse(localStorage.getItem('user'));
    const nickname = user?.nickname;

    const displayName = userMode === 'guest' ? '배고픈 픽잇러' : nickname || '픽잇러';

    useEffect(() => {
        const savedRecommendations = localStorage.getItem('recommendations');

        if (!savedRecommendations) {
            alert('추천 결과가 없습니다. 다시 추천을 받아주세요.');
            navigate('/recommend', { replace: true });
            return;
        }

        const parsedRecommendations = JSON.parse(savedRecommendations);
        setRestaurants(parsedRecommendations);

        const retryStatus = localStorage.getItem('hasRetried');

        if (retryStatus === 'true') {
            setHasRetried(true);
        }

        localStorage.setItem('hasRecommendationResult', 'true');

        ReactGA.event('recommendation_result_view', {
            page: 'result',
            user_mode: userMode || 'unknown',
        });
    }, [navigate, userMode]);

    const handleBackToOptions = () => {
        localStorage.removeItem('hasRetried');

        ReactGA.event('back_to_options_click', {
            page: 'result',
            user_mode: userMode || 'unknown',
        });

        navigate('/recommend');
    };

    const handleDetailClick = (restaurant) => {
        ReactGA.event('restaurant_detail_click', {
            page: 'result',
            restaurant_id: restaurant.id,
            restaurant_name: restaurant.name,
            user_mode: userMode || 'unknown',
        });

        localStorage.setItem('selectedRestaurant', JSON.stringify(restaurant));

        alert('상세보기 페이지는 준비 중이에요!');
    };

    const handleRetryRecommend = () => {
        if (hasRetried) return;

        ReactGA.event('recommendation_retry_click', {
            page: 'result',
            user_mode: userMode || 'unknown',
        });

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

                                <button
                                    type="button"
                                    onClick={() => handleDetailClick(restaurant)}
                                    className="mt-4 self-end rounded-xl border border-[#FF6A13] px-4 py-2 text-[14px] font-black text-[#FF5A0A]"
                                >
                                    상세보기
                                </button>
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
