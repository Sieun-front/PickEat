import { Home, Bookmark, User, Sparkles } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { label: '홈', path: '/home', icon: Home },
        { label: 'AI 추천', path: '/recommend', icon: Sparkles },
        { label: '저장', path: '/saved', icon: Bookmark },
        { label: 'My', path: '/mypage', icon: User },
    ];

    const handleTabClick = (path) => {
        navigate(path);
    };

    return (
        <nav className="fixed bottom-0 left-1/2 z-20 grid h-[72px] w-full max-w-[430px] -translate-x-1/2 grid-cols-4 border-t border-[#eee] bg-white">
            {tabs.map((tab) => {
                const isActive = location.pathname === tab.path;
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
