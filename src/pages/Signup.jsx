import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, LockKeyhole, Mail, UserPlus } from 'lucide-react';
import ReactGA from 'react-ga4';

function Signup() {
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        localStorage.setItem('userMode', 'login');

        ReactGA.event('signup_submit', {
            page: 'signup',
            user_mode: 'login',
        });

        navigate('/home');
    };
    const handleMoveToLogin = () => {
        ReactGA.event('move_to_login_from_signup', {
            page: 'signup',
        });

        navigate('/login');
    };
    return (
        <main className="flex h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_50%_32%,#FFF4E8_0%,#FFFCF8_45%,#FFFFFF_100%)] px-7 pb-5 pt-8 text-left">
            <button onClick={() => navigate('/')} className="absolute left-5 top-10 text-[#111]">
                <ChevronLeft size={30} />
            </button>

            <section className="pt-10 text-center">
                <h1 className="text-[28px] font-black tracking-[-1px] text-[#FF4F00]">PickEat</h1>

                <h2 className="mt-3 text-[26px] font-black tracking-[-1px] text-[#222]">회원가입하기 ✨</h2>

                <p className="mt-1 text-[14px] font-medium text-[#666]">나만의 맛집 추천을 더 편하게 이용해보세요.</p>

                <div className="relative mt-1 h-[110px]">
                    <span className="absolute left-16 top-10 text-2xl text-[#FF9B2F]">✦</span>
                    <span className="absolute right-16 top-5 text-2xl text-[#FF9B2F]">✦</span>

                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[72px] drop-shadow-[0_18px_16px_rgba(161,80,23,0.18)]">
                        🍔
                    </div>
                </div>
            </section>

            <form className="mt-1" onSubmit={handleSignup}>
                <label className="block text-[13px] font-extrabold text-[#222]">
                    아이디
                    <div className="mt-2 flex h-[48px] items-center gap-3 rounded-2xl border border-[#DDD7D2] bg-white px-4 text-[#AAA]">
                        <User size={20} />
                        <input
                            type="text"
                            placeholder="아이디를 입력해주세요"
                            className="w-full bg-transparent text-[15px] text-[#222] outline-none placeholder:text-[#B8B8B8]"
                        />
                    </div>
                </label>

                <label className="mt-3 block text-[13px] font-extrabold text-[#222]">
                    이메일
                    <div className="mt-2 flex h-[48px] items-center gap-3 rounded-2xl border border-[#DDD7D2] bg-white px-4 text-[#AAA]">
                        <Mail size={20} />
                        <input
                            type="email"
                            placeholder="이메일을 입력해주세요"
                            className="w-full bg-transparent text-[15px] text-[#222] outline-none placeholder:text-[#B8B8B8]"
                        />
                    </div>
                </label>

                <label className="mt-3 block text-[13px] font-extrabold text-[#222]">
                    비밀번호
                    <div className="mt-2 flex h-[48px] items-center gap-3 rounded-2xl border border-[#DDD7D2] bg-white px-4 text-[#AAA]">
                        <LockKeyhole size={19} />
                        <input
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                            className="w-full bg-transparent text-[15px] text-[#222] outline-none placeholder:text-[#B8B8B8]"
                        />
                    </div>
                </label>

                <button
                    type="submit"
                    className="mt-5 flex h-[50px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#FF650D] to-[#FF4800] text-[17px] font-extrabold text-white"
                >
                    <UserPlus size={21} />
                    회원가입
                </button>
            </form>

            <button
                onClick={() => navigate('/login')}
                className="mt-3 h-[50px] w-full rounded-2xl border-[1.5px] border-[#FF5A0A] bg-white text-[16px] font-extrabold text-[#FF5A0A]"
            >
                이미 계정이 있어요
            </button>

            <p className="mt-3 text-center text-[12px] leading-5 text-[#777]">
                지금은 포트폴리오용 임시 회원가입입니다.
                <br />
                입력 정보는 서버에 저장되지 않아요.
            </p>
        </main>
    );
}

export default Signup;
