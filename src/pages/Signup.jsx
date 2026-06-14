import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, LockKeyhole, UserPlus } from 'lucide-react';
import ReactGA from 'react-ga4';
import { register } from '../api/authApi';

function Signup() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const trimmedUsername = username.trim();
        const trimmedNickname = nickname.trim();
        const trimmedPassword = password.trim();

        if (!trimmedUsername || !trimmedNickname || !trimmedPassword) {
            setErrorMessage('아이디, 닉네임, 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            setIsLoading(true);

            const data = await register({
                username: trimmedUsername,
                nickname: trimmedNickname,
                password: trimmedPassword,
            });

            console.log('회원가입 응답:', data);
            console.log('실제 저장된 username:', data.user?.username);
            console.log('실제 저장된 nickname:', data.user?.nickname);

            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('userMode', 'login');

            ReactGA.event('signup_submit', {
                page: 'signup',
                user_mode: 'login',
                user_id: data.user?.id,
            });

            navigate('/home');
        } catch (error) {
            console.error('회원가입 실패 상태:', error.response?.status);
            console.error('회원가입 실패 응답:', error.response?.data);

            const serverError = error.response?.data;

            if (serverError?.username) {
                setErrorMessage(`아이디: ${serverError.username[0]}`);
            } else if (serverError?.nickname) {
                setErrorMessage(`닉네임: ${serverError.nickname[0]}`);
            } else if (serverError?.password) {
                setErrorMessage(`비밀번호: ${serverError.password[0]}`);
            } else {
                setErrorMessage('회원가입에 실패했습니다. 이미 사용 중인 아이디일 수 있어요.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleMoveToLogin = () => {
        ReactGA.event('move_to_login_from_signup', {
            page: 'signup',
        });

        navigate('/login');
    };

    return (
        <main className="mx-auto flex min-h-screen max-w-[430px] flex-col overflow-hidden bg-[radial-gradient(circle_at_50%_32%,#FFF4E8_0%,#FFFCF8_45%,#FFFFFF_100%)] px-7 pb-5 pt-8 text-left">
            <button
                type="button"
                onClick={() => navigate('/')}
                className="mb-2 flex h-10 w-10 items-center justify-center text-[#111]"
            >
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
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="아이디를 입력해주세요"
                            className="w-full bg-transparent text-[15px] text-[#222] outline-none placeholder:text-[#B8B8B8]"
                        />
                    </div>
                </label>

                <label className="mt-3 block text-[13px] font-extrabold text-[#222]">
                    닉네임
                    <div className="mt-2 flex h-[48px] items-center gap-3 rounded-2xl border border-[#DDD7D2] bg-white px-4 text-[#AAA]">
                        <UserPlus size={20} />
                        <input
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="닉네임을 입력해주세요"
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력해주세요"
                            className="w-full bg-transparent text-[15px] text-[#222] outline-none placeholder:text-[#B8B8B8]"
                        />
                    </div>
                </label>

                {errorMessage && <p className="mt-3 text-center text-[13px] font-bold text-red-500">{errorMessage}</p>}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-5 flex h-[50px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#FF650D] to-[#FF4800] text-[17px] font-extrabold text-white disabled:opacity-60"
                >
                    <UserPlus size={21} />
                    {isLoading ? '가입 중...' : '회원가입'}
                </button>
            </form>

            <button
                onClick={handleMoveToLogin}
                className="mt-3 h-[50px] w-full rounded-2xl border-[1.5px] border-[#FF5A0A] bg-white text-[16px] font-extrabold text-[#FF5A0A]"
            >
                이미 계정이 있어요
            </button>

            <p className="mt-3 text-center text-[12px] leading-5 text-[#777]">
                회원가입 후 바로 PickEat을 이용할 수 있어요.
            </p>
        </main>
    );
}

export default Signup;
