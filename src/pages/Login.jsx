import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, LockKeyhole, UserPlus } from 'lucide-react';

function Login() {
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/home');
    };
    return (
        <main className="flex h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_50%_32%,#FFF4E8_0%,#FFFCF8_45%,#FFFFFF_100%)] px-7 pb-5 pt-8 text-left">
            <button onClick={() => navigate('/')} className="absolute left-5 top-10 text-[#111]">
                <ChevronLeft size={30} />
            </button>

            <section className="pt-10 text-center">
                <h1 className="text-[28px] font-black tracking-[-1px] text-[#FF4F00]">PickEat</h1>

                <h2 className="mt-3 text-[26px] font-black tracking-[-1px] text-[#222]">어서오세요! 👋</h2>

                <p className="mt-1 text-[14px] font-medium text-[#666]">로그인하고 나만의 맛집을 저장해보세요.</p>

                <div className="relative mt-1 h-[145px]">
                    <span className="absolute left-16 top-14 text-2xl text-[#FF9B2F]">✦</span>
                    <span className="absolute right-16 top-8 text-2xl text-[#FF9B2F]">✦</span>

                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[88px] drop-shadow-[0_18px_16px_rgba(161,80,23,0.18)]">
                        🍔
                    </div>
                </div>
            </section>

            <form className="mt-1" onSubmit={handleLogin}>
                <label className="block text-[13px] font-extrabold text-[#222]">
                    아이디
                    <div className="mt-2 flex h-[50px] items-center gap-3 rounded-2xl border border-[#DDD7D2] bg-white px-4 text-[#AAA]">
                        <User size={20} />
                        <input
                            type="text"
                            placeholder="아이디를 입력해주세요"
                            className="w-full bg-transparent text-[15px] text-[#222] outline-none placeholder:text-[#B8B8B8]"
                        />
                    </div>
                </label>

                <label className="mt-3 block text-[13px] font-extrabold text-[#222]">
                    비밀번호
                    <div className="mt-2 flex h-[50px] items-center gap-3 rounded-2xl border border-[#DDD7D2] bg-white px-4 text-[#AAA]">
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
                    className="mt-5 h-[50px] w-full rounded-2xl bg-gradient-to-b from-[#FF650D] to-[#FF4800] text-[17px] font-extrabold text-white"
                >
                    로그인
                </button>
            </form>

            <div className="mx-4 my-4 flex items-center gap-5">
                <div className="h-px flex-1 bg-[#DDD]" />
                <p className="text-[13px] font-bold text-[#333]">또는</p>
                <div className="h-px flex-1 bg-[#DDD]" />
            </div>

            <button className="h-[50px] w-full rounded-2xl border-[1.5px] border-[#FF5A0A] bg-white text-[17px] font-extrabold text-[#FF5A0A]">
                회원가입
            </button>

            <div className="mt-3 flex gap-3 rounded-2xl bg-[#FFF2E8] p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#FF5A0A]">
                    <UserPlus size={22} />
                </div>

                <div>
                    <strong className="block text-[13px] leading-5 text-[#222]">
                        회원가입 없이도 PickEat을 이용할 수 있어요!
                    </strong>
                    <p className="mt-0.5 text-[12px] leading-5 text-[#666]">
                        지금 바로 맛집 추천, 저장, 길찾기를 체험해보세요.
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Login;
