import { useEffect, useState } from 'react';
import { MapPin, Star } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import ReactGA from 'react-ga4';

function RecentResult() {
    const [recentRestaurants, setRecentRestaurants] = useState([]);

    useEffect(() => {
        const savedRecommendations = localStorage.getItem('recommendations');

        if (savedRecommendations) {
            setRecentRestaurants(JSON.parse(savedRecommendations));
        }

        ReactGA.event('recent_result_view', {
            page: 'recent',
            user_mode: localStorage.getItem('userMode') || 'unknown',
        });
    }, []);

    const handleRestaurantClick = (restaurant) => {
        const userMode = localStorage.getItem('userMode') || 'unknown';

        ReactGA.event('recent_restaurant_click', {
            page: 'recent',
            user_mode: userMode,
            restaurant_id: restaurant.id,
            restaurant_name: restaurant.name,
        });

        localStorage.setItem('selectedRestaurant', JSON.stringify(restaurant));
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
                        <button
                            key={restaurant.id}
                            onClick={() => handleRestaurantClick(restaurant)}
                            className="flex items-center justify-between rounded-[22px] border border-[#EEE] bg-white p-5 text-left shadow-[0_8px_22px_rgba(0,0,0,0.05)]"
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

                            <div className="flex items-center gap-1 rounded-full bg-[#FFF2E8] px-3 py-1 text-[#FF5A0A]">
                                <Star size={14} fill="currentColor" />
                                <span className="text-[13px] font-black">
                                    {restaurant.is_saved ? '저장됨' : '추천'}
                                </span>
                            </div>
                        </button>
                    ))
                )}
            </section>

            <BottomNav />
        </main>
    );
}

export default RecentResult;
