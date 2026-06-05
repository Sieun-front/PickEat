import { MapPin, Star } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import ReactGA from 'react-ga4';

const recentRestaurants = [
    {
        id: 1,
        name: '한성 닭한마리',
        category: '한식',
        distance: '도보 7분',
        rating: '4.7',
    },
    {
        id: 2,
        name: '정성서울국수집',
        category: '한식',
        distance: '도보 5분',
        rating: '4.5',
    },
    {
        id: 3,
        name: '키부키',
        category: '일식',
        distance: '도보 8분',
        rating: '4.6',
    },
];

function RecentResult() {
    const handleRestaurantClick = (restaurant) => {
        const userMode = localStorage.getItem('userMode') || 'unknown';

        ReactGA.event('recent_restaurant_click', {
            page: 'recent',
            user_mode: userMode,
            restaurant_id: restaurant.id,
            restaurant_name: restaurant.name,
        });
    };

    return (
        <main className="min-h-screen bg-white px-6 pb-24 pt-10 text-left">
            <header>
                <h1 className="text-[28px] font-black text-[#FF5A0A]">최근 추천 결과</h1>
                <p className="mt-2 text-[15px] font-semibold text-[#777]">가장 최근에 추천받은 맛집 리스트예요.</p>
            </header>

            <section className="mt-7 flex flex-col gap-3">
                {recentRestaurants.map((restaurant) => (
                    <button
                        key={restaurant.id}
                        onClick={() => handleRestaurantClick(restaurant)}
                        className="flex items-center justify-between rounded-[22px] border border-[#EEE] bg-white p-5 text-left shadow-[0_8px_22px_rgba(0,0,0,0.05)]"
                    >
                        <div>
                            <h2 className="text-[20px] font-black text-[#222]">{restaurant.name}</h2>

                            <div className="mt-2 flex items-center gap-2 text-[13px] font-bold text-[#777]">
                                <span>{restaurant.category}</span>
                                <span>·</span>
                                <MapPin size={14} />
                                <span>{restaurant.distance}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 rounded-full bg-[#FFF2E8] px-3 py-1 text-[#FF5A0A]">
                            <Star size={14} fill="currentColor" />
                            <span className="text-[13px] font-black">{restaurant.rating}</span>
                        </div>
                    </button>
                ))}
            </section>

            <BottomNav />
        </main>
    );
}

export default RecentResult;
