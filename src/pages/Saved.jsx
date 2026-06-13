import { useEffect, useState } from 'react';
import { BookmarkCheck, Navigation } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { getMyPicks, unsaveRestaurant } from '../api/restaurantApi';
import ReactGA from 'react-ga4';

function Saved() {
    const [savedRestaurants, setSavedRestaurants] = useState([]);

    useEffect(() => {
        const fetchMyPicks = async () => {
            try {
                const data = await getMyPicks();
                const results = data.results || [];

                setSavedRestaurants(results.map((item) => item.restaurant));

                ReactGA.event('saved_page_view', {
                    page: 'saved',
                    saved_count: data.count || results.length,
                });
            } catch (error) {
                console.error('저장 목록 조회 실패:', error);
                alert('저장 목록을 불러오지 못했어요.');
            }
        };

        fetchMyPicks();
    }, []);

    const handleUnsaveClick = async (restaurant) => {
        try {
            await unsaveRestaurant(restaurant.naver_id);

            setSavedRestaurants((prev) => prev.filter((item) => item.naver_id !== restaurant.naver_id));

            ReactGA.event('saved_restaurant_unsave_click', {
                page: 'saved',
                restaurant_id: restaurant.id,
                restaurant_name: restaurant.name,
                naver_id: restaurant.naver_id,
            });
        } catch (error) {
            console.error('저장 취소 실패:', error);
            alert('저장 취소에 실패했어요.');
        }
    };

    const handleNaverMapClick = (restaurant) => {
        ReactGA.event('saved_naver_map_click', {
            page: 'saved',
            restaurant_id: restaurant.id,
            restaurant_name: restaurant.name,
            naver_id: restaurant.naver_id,
        });

        window.open(`https://map.naver.com/p/entry/place/${restaurant.naver_id}`, '_blank');
    };

    return (
        <main className="min-h-screen bg-white pb-24 text-left">
            <section className="relative h-[128px] overflow-hidden bg-gradient-to-b from-[#FF761A] to-[#FF4F00] px-6 pt-10 text-center text-white">
                <h1 className="text-[28px] font-black tracking-[-1px]">My Picks</h1>
                <div className="absolute bottom-[-28px] left-[-10%] h-[58px] w-[120%] rounded-[50%] bg-white" />
            </section>

            <section className="px-6 pt-8">
                <h2 className="text-[29px] font-black tracking-[-2px] text-[#111]">
                    저장한 맛집 <span className="text-[#FF5A0A]">{savedRestaurants.length}곳</span>
                </h2>
            </section>

            <section className="mt-5 flex flex-col gap-4 px-5">
                {savedRestaurants.length === 0 ? (
                    <div className="mt-20 text-center">
                        <p className="text-[48px]">🔖</p>
                        <p className="mt-4 text-[17px] font-black text-[#333]">아직 저장한 맛집이 없어요</p>
                        <p className="mt-2 text-[14px] font-semibold text-[#888]">
                            추천 결과에서 마음에 드는 맛집을 저장해보세요.
                        </p>
                    </div>
                ) : (
                    savedRestaurants.map((restaurant) => (
                        <article
                            key={restaurant.naver_id}
                            className="rounded-[24px] bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-[#F0F0F0]"
                        >
                            <div className="flex gap-4">
                                <img
                                    src={restaurant.picture}
                                    alt={restaurant.name}
                                    className="h-[120px] w-[120px] shrink-0 rounded-2xl object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600';
                                    }}
                                />

                                <div className="flex flex-1 flex-col justify-between">
                                    <h3 className="mt-2 text-[21px] font-black text-[#111]">{restaurant.name}</h3>

                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleUnsaveClick(restaurant)}
                                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF2E8] text-[#FF5A0A]"
                                        >
                                            <BookmarkCheck size={18} fill="currentColor" />
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
                    ))
                )}
            </section>

            <BottomNav />
        </main>
    );
}

export default Saved;
