import { useNavigate } from 'react-router-dom';
import { MapPin, Sparkles, Bookmark, Clock } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import ReactGA from 'react-ga4';

function Home() {
    const navigate = useNavigate();

    const hasResult = localStorage.getItem('hasRecommendationResult') === 'true';

    const handleStartRecommend = () => {
        ReactGA.event('recommend_start_click', {
            page: 'home',
        });

        navigate('/recommend');
    };

    const handleRecentResultClick = () => {
        ReactGA.event('recent_result_click', {
            page: 'home',
        });

        navigate('/recent');
    };

    return (
        <main className="min-h-screen bg-white px-6 pb-24 pt-8 text-left">
            <header className="text-center">
                <h1 className="text-[28px] font-black tracking-[-1px] text-[#FF5A0A]">PickEat</h1>
            </header>

            <section className="mt-8 rounded-[30px] bg-[#FFF3EA] p-6">
                <div className="flex items-center gap-2 text-[#FF5A0A]">
                    <MapPin size={20} />
                    <span className="text-[14px] font-black">외대생 생활반경</span>
                </div>

                <h2 className="mt-5 text-[30px] font-black leading-tight tracking-[-2px] text-[#111]">
                    오늘 뭐 먹을지
                    <br />
                    고민 중이세요?
                </h2>

                <p className="mt-3 text-[15px] font-semibold leading-6 text-[#777]">
                    상황과 취향을 고르면 PickEat이
                    <br />딱 맞는 맛집을 추천해드려요.
                </p>

                <div className="mt-6 text-center text-[96px] drop-shadow-[0_16px_14px_rgba(161,80,23,0.16)]">🍔</div>
            </section>

            <button
                onClick={handleStartRecommend}
                className="mt-6 flex h-[62px] w-full items-center justify-center gap-2 rounded-[24px] bg-gradient-to-b from-[#FF761A] to-[#FF4F00] text-[20px] font-black text-white shadow-[0_12px_24px_rgba(255,96,0,0.22)]"
            >
                <Sparkles size={22} />
                AI 추천받기
            </button>

            {hasResult && (
                <button
                    onClick={handleRecentResultClick}
                    className="mt-4 flex h-[58px] w-full items-center justify-center gap-2 rounded-[22px] bg-[#FFF2E8] text-[17px] font-black text-[#FF5A0A]"
                >
                    <Clock size={20} />
                    최근 추천 결과 보기
                </button>
            )}

            <section className="mt-5 rounded-[24px] border border-[#FFE0C7] bg-[#FFF9F4] p-5">
                <div className="flex items-center gap-2 text-[#FF5A0A]">
                    <Bookmark size={19} />
                    <h3 className="text-[17px] font-black">저장한 맛집</h3>
                </div>

                <p className="mt-2 text-[14px] font-semibold leading-6 text-[#777]">
                    추천받은 맛집은 저장해두고
                    <br />
                    나중에 다시 확인할 수 있어요.
                </p>
            </section>

            <BottomNav />
        </main>
    );
}

function InfoCard({ icon, title, text }) {
    return (
        <div className="rounded-[22px] bg-white p-5 shadow-[0_8px_22px_rgba(0,0,0,0.06)] ring-1 ring-[#F0F0F0]">
            <div className="text-[32px]">{icon}</div>
            <h3 className="mt-3 text-[17px] font-black text-[#222]">{title}</h3>
            <p className="mt-1 text-[13px] font-semibold text-[#777]">{text}</p>
        </div>
    );
}

export default Home;
