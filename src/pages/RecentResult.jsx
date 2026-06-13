import { useEffect, useState } from 'react';
import { MapPin, Bookmark, BookmarkCheck, Navigation } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import ReactGA from 'react-ga4';

function RecentResult() {
    const [recentRestaurants, setRecentRestaurants] = useState([]);

    useEffect(() => {
        const savedRecommendations = localStorage.getItem('recommendations');
        const savedRestaurants = JSON.parse(localStorage.getItem('savedRestaurants') || '[]');

        if (savedRecommendations) {
            const recommendations = JSON.parse(savedRecommendations);

            const recommendationsWithSavedStatus = recommendations.map((restaurant) => ({
                ...restaurant,
                is_saved: savedRestaurants.some((saved) => saved.naver_id === restaurant.naver_id),
            }));

            setRecentRestaurants(recommendationsWithSavedStatus);
        }

        ReactGA.event('recent_result_view', {
            page: 'recent',
            user_mode: localStorage.getItem('userMode') || 'unknown',
        });
    }, []);

    const handleSaveClick = (restaurant) => {
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

        setRecentRestaurants((prev) =>
            prev.map((item) =>
                item.naver_id === restaurant.naver_id
                    ? {
                          ...item,
                          is_saved: !isAlreadySaved,
                      }
                    : item
            )
        );

        ReactGA.event(isAlreadySaved ? 'recent_restaurant_unsave_click' : 'recent_restaurant_save_click', {
            page: 'recent',
            user_mode: localStorage.getItem('userMode') || 'unknown',
            restaurant_id: restaurant.id,
            restaurant_name: restaurant.name,
            naver_id: restaurant.naver_id,
        });
    };

    const handleNaverMapClick = (restaurant) => {
        ReactGA.event('recent_naver_map_click', {
            page: 'recent',
            user_mode: localStorage.getItem('userMode') || 'unknown',
            restaurant_id: restaurant.id,
            restaurant_name: restaurant.name,
            naver_id: restaurant.naver_id,
        });

        window.open(`https://map.naver.com/p/entry/place/${restaurant.naver_id}`, '_blank');
    };

    return (
        <main className="min-h-screen bg-white px-6 pb-24 pt-10 text-left">
            <header>
                <h1 className="text-[28px] font-black text-[#FF5A0A]">최근 추천 결과</h1>
                <p className="mt-2 text-[15px] font-semibold text-[#777]">가장 최근에 추천받은 맛집 리스트예요.</p>
            </header>

            <section className="mt-7 flex flex-col gap-3">
                {recentRestaurants.length === 0 ? (
                    <div className="rounded-[22px] bg-[#FFF6EF] p-6 text-center">
                        <p className="text-[16px] font-black text-[#222]">아직 추천받은 맛집이 없어요.</p>
                        <p className="mt-2 text-[14px] font-semibold text-[#777]">AI 추천을 먼저 받아보세요.</p>
                    </div>
                ) : (
                    recentRestaurants.map((restaurant) => (
                        <article
                            key={restaurant.id}
                            className="rounded-[22px] border border-[#EEE] bg-white p-5 shadow-[0_8px_22px_rgba(0,0,0,0.05)]"
                        >
                            <div>
                                <h2 className="text-[20px] font-black text-[#222]">{restaurant.name}</h2>

                                <div className="mt-2 flex items-center gap-2 text-[13px] font-bold text-[#777]">
                                    <span>추천 순위 {restaurant.rank}위</span>
                                    <span>·</span>
                                    <MapPin size={14} />
                                    <span>최근 추천</span>
                                </div>

                                <p className="mt-2 text-[13px] font-semibold leading-5 text-[#666]">
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
                        </article>
                    ))
                )}
            </section>

            <BottomNav />
        </main>
    );
}

export default RecentResult;
