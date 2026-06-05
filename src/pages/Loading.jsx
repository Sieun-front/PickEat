import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Loading() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/result');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <main className="flex h-screen flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_32%,#FFF4E8_0%,#FFFCF8_45%,#FFFFFF_100%)] px-7 text-center">
            <div className="text-[96px] drop-shadow-[0_18px_16px_rgba(161,80,23,0.18)] animate-bounce">🍔</div>

            <h1 className="mt-8 text-[28px] font-black leading-tight tracking-[-1px] text-[#222]">
                AI가 딱 맞는 맛집을
                <br />
                찾고 있어요
            </h1>

            <p className="mt-4 text-[15px] font-semibold leading-6 text-[#777]">
                선택한 조건을 바탕으로
                <br />
                가장 어울리는 맛집을 추천해드릴게요.
            </p>

            <div className="mt-10 flex gap-2">
                <span className="h-3 w-3 animate-bounce rounded-full bg-[#FF5A0A]" />
                <span className="h-3 w-3 animate-bounce rounded-full bg-[#FF8A2A] [animation-delay:0.15s]" />
                <span className="h-3 w-3 animate-bounce rounded-full bg-[#FFB15C] [animation-delay:0.3s]" />
            </div>
        </main>
    );
}

export default Loading;
