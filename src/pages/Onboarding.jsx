import { useNavigate } from 'react-router-dom';
import { Search, Map, Heart, User, UserPlus, ChevronRight } from 'lucide-react';
import ReactGA from 'react-ga4';

function Onboarding() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        ReactGA.event('login_click', {
            page: 'onboarding',
        });

        navigate('/login');
    };

    const handleSignupClick = () => {
        ReactGA.event('signup_click', {
            page: 'onboarding',
        });

        navigate('/signup');
    };

    const handleGuestStart = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user');
        localStorage.removeItem('recommendations');
        localStorage.removeItem('selectedRestaurant');

        localStorage.setItem('userMode', 'guest');

        ReactGA.event('guest_start_click', {
            page: 'onboarding',
            user_mode: 'guest',
        });

        navigate('/home');
    };

    return (
        <main className="flex h-screen flex-col overflow-y-auto bg-[radial-gradient(circle_at_50%_32%,#FFF4E8_0%,#FFFCF8_45%,#FFFFFF_100%)] px-7 pb-5 pt-10 text-center">
            <section className="mt-10">
                <h1 className="text-[40px] font-black tracking-[-2px] text-[#FF4F00]">PickEat</h1>

                <h2 className="mt-3 text-[32px] font-black leading-tight tracking-[-2px] text-[#222]">
                    오늘 <span className="text-[#FF4F00]">뭐 먹지?</span>
                </h2>

                <p className="mt-2 text-[15px] font-medium leading-6 text-[#666]">
                    맛잘알 AI가 외대생의 취향과 상황에 딱 맞는
                    <br />
                    맛집을 추천해드려요!
                </p>

                <section className="relative mt-1 h-[185px]">
                    <div className="absolute left-2 top-8 flex h-[54px] w-[68px] items-center justify-center rounded-full bg-white text-2xl shadow-[0_10px_25px_rgba(120,70,30,0.12)]">
                        🍽️
                    </div>

                    <div className="absolute right-3 top-14 flex h-[54px] w-[68px] items-center justify-center rounded-full bg-white text-2xl shadow-[0_10px_25px_rgba(120,70,30,0.12)]">
                        📍
                    </div>

                    <span className="absolute bottom-16 left-11 text-2xl text-[#FF9B2F]">✦</span>
                    <span className="absolute bottom-8 right-16 text-xl text-[#FF9B2F]">✦</span>

                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[104px] drop-shadow-[0_18px_16px_rgba(161,80,23,0.18)]">
                        🍔
                    </div>
                </section>

                <section className="grid grid-cols-3 gap-3">
                    <FeatureCard icon={<Search size={25} />} text={['내 상황에 맞는', '맛집 추천']} />
                    <FeatureCard icon={<Map size={25} />} text={['지도와 함께', '쉽게 찾아가요']} />
                    <FeatureCard icon={<Heart size={25} />} text={['마음에 드는 곳은', '저장해주세요']} />
                </section>
            </section>

            <section className="mt-20">
                <section className="flex flex-col gap-2">
                    <button
                        onClick={handleLoginClick}
                        className="flex h-[52px] w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-b from-[#FF650D] to-[#FF4800] text-[18px] font-extrabold text-white"
                    >
                        <User size={22} />
                        로그인
                    </button>

                    <button
                        onClick={handleSignupClick}
                        className="flex h-[52px] w-full items-center justify-center gap-3 rounded-2xl border-[1.5px] border-[#FF5A0A] bg-white text-[18px] font-extrabold text-[#FF5A0A]"
                    >
                        <UserPlus size={22} />
                        회원가입
                    </button>

                    <button
                        onClick={handleGuestStart}
                        className="flex h-[52px] w-full items-center justify-center gap-1 rounded-2xl bg-[#FFF2E8] text-[15px] font-extrabold text-[#222]"
                    >
                        회원가입 없이 시작하기
                        <ChevronRight size={18} />
                    </button>
                </section>

                <p className="mt-3 text-[13px] leading-5 text-[#777]">
                    회원가입 없이도 PickEat의 추천 서비스를
                    <br />
                    모두 이용할 수 있어요!
                </p>
            </section>
        </main>
    );
}

function FeatureCard({ icon, text }) {
    return (
        <div className="flex min-h-[90px] flex-col items-center justify-center rounded-2xl bg-white px-2 py-3 shadow-[0_10px_25px_rgba(109,74,49,0.1)]">
            <div className="mb-1.5 text-[#FF5A0A]">{icon}</div>
            <p className="text-[12px] font-extrabold leading-4 text-[#222]">
                {text[0]}
                <br />
                {text[1]}
            </p>
        </div>
    );
}

export default Onboarding;
