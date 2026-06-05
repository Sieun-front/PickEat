import { Home, Bookmark, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { label: '홈', path: '/home', icon: Home },
        { label: '저장', path: '/saved', icon: Bookmark },
        { label: '마이', path: '/mypage', icon: User },
    ];

    const handleTabClick = (path) => {
        if (path === '/home') {
            const hasResult = localStorage.getItem('hasRecommendationResult');

            if (hasResult === 'true') {
                navigate('/result');
                return;
            }
        }

        navigate(path);
    };

    return (
        <nav className="fixed bottom-0 left-1/2 z-20 grid h-[72px] w-full max-w-[430px] -translate-x-1/2 grid-cols-3 border-t border-[#eee] bg-white">
            {tabs.map((tab) => {
                const isActive =
                    tab.path === '/home'
                        ? location.pathname === '/home' || location.pathname === '/result'
                        : location.pathname === tab.path;

                const Icon = tab.icon;

                return (
                    <button
                        key={tab.path}
                        onClick={() => handleTabClick(tab.path)}
                        className="flex flex-col items-center justify-center gap-1"
                    >
                        <Icon size={24} strokeWidth={2.5} className={isActive ? 'text-[#FF5A0A]' : 'text-[#B8B8B8]'} />

                        <span
                            className={
                                isActive
                                    ? 'text-[12px] font-black text-[#FF5A0A]'
                                    : 'text-[12px] font-black text-[#B8B8B8]'
                            }
                        >
                            {tab.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
}

export default BottomNav;
