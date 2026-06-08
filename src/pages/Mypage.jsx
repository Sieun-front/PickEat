import BottomNav from '../components/BottomNav';
import { useNavigate } from 'react-router-dom';

function Mypage() {
    const navigate = useNavigate();
    const userMode = localStorage.getItem('userMode');
    const user = JSON.parse(localStorage.getItem('user'));

    const nickname = user?.nickname;

    const displayName = userMode === 'guest' ? '배고픈 픽잇러' : nickname || '픽잇러';
    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user');
        localStorage.removeItem('recommendations');
        localStorage.removeItem('selectedRestaurant');
        localStorage.removeItem('hasRecommendationResult');
        localStorage.removeItem('hasRetried');

        localStorage.setItem('userMode', 'guest');

        navigate('/');
    };
    return (
        <main className="min-h-screen bg-white px-6 pb-24 pt-10">
            <h1 className="text-center text-[28px] font-black text-[#FF5A0A]">마이페이지</h1>

            <section className="mt-8 rounded-[28px] bg-[#FFF6EF] p-6">
                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF5A0A] text-3xl text-white">
                        👤
                    </div>

                    <div>
                        <h2 className="text-[22px] font-black text-[#222]">{displayName}님</h2>

                        <p className="mt-1 text-[14px] font-semibold text-[#777]">
                            {userMode === 'guest' ? '비회원으로 이용 중' : '로그인 회원'}
                        </p>
                    </div>
                </div>
            </section>

            <section className="mt-6 flex flex-col gap-3">
                <MenuCard title="저장한 맛집" emoji="🔖" />
                <MenuCard title="최근 추천 기록" emoji="🕒" />
                <MenuCard title="계정 설정" emoji="⚙️" />
            </section>
            <button
                onClick={handleLogout}
                className="mt-6 h-[50px] w-full rounded-2xl bg-[#F1F1F1] text-[16px] font-black text-[#555]"
            >
                로그아웃
            </button>

            {userMode === 'guest' && (
                <section className="mt-8 rounded-[24px] border border-[#FFE0C7] bg-[#FFF9F4] p-5">
                    <h3 className="text-[18px] font-black text-[#FF5A0A]">회원가입하고 저장 기능 이용하기</h3>

                    <p className="mt-2 text-[14px] font-semibold leading-6 text-[#777]">
                        비회원은 브라우저에만 임시 저장돼요.
                        <br />
                        회원가입하면 언제든 저장한 맛집을 확인할 수 있어요.
                    </p>

                    <button className="mt-4 h-[48px] w-full rounded-2xl bg-gradient-to-b from-[#FF761A] to-[#FF4F00] text-[16px] font-black text-white">
                        회원가입 하기
                    </button>
                </section>
            )}

            <BottomNav />
        </main>
    );
}

function MenuCard({ title, emoji }) {
    return (
        <button className="flex items-center gap-4 rounded-[20px] border border-[#EEE] bg-white p-5 text-left shadow-sm">
            <span className="text-2xl">{emoji}</span>
            <span className="text-[16px] font-black text-[#222]">{title}</span>
        </button>
    );
}

export default Mypage;
