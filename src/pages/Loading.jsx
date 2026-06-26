import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecommendations } from '../api/restaurantApi';
import ReactGA from 'react-ga4';

const LAYER_INTERVAL = 1500; // 재료 쌓이는 속도
const MESSAGE_INTERVAL = 7000; // 멘트 바뀌는 속도

const messages = ['조금만 기다려주세요.', '열심히 찾아보는 중이에요.', '거의 다 됐어요!', '먹을 준비 됐나요?'];

const layers = ['bottomBun', 'lettuce', 'patty', 'cheese', 'tomato', 'topBun'];

function Loading() {
    const navigate = useNavigate();
    const hasFetched = useRef(false);
    const [visibleCount, setVisibleCount] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const layerTimer = setInterval(() => {
            setVisibleCount((prev) => (prev >= layers.length ? 0 : prev + 1));
        }, LAYER_INTERVAL);

        const messageTimer = setInterval(() => {
            setMessageIndex((prev) => Math.min(prev + 1, messages.length - 1));
        }, MESSAGE_INTERVAL);

        return () => {
            clearInterval(layerTimer);
            clearInterval(messageTimer);
        };
    }, []);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchRecommendation = async () => {
            try {
                const savedConditions = localStorage.getItem('recommendationConditions');

                if (!savedConditions) {
                    alert('추천 조건이 없습니다. 다시 선택해주세요.');
                    navigate('/recommend', { replace: true });
                    return;
                }

                const conditions = JSON.parse(savedConditions);
                const excludedNaverIds = JSON.parse(localStorage.getItem('excludedNaverIds') || '[]');

                const payload = {
                    food_types: [conditions.foodType],
                    moods: [conditions.mood],
                    distance: conditions.distance,
                    meal_situation: conditions.diningType,
                    excluded_naver_ids: excludedNaverIds,
                };

                const data = await getRecommendations(payload);

                ReactGA.event('recommendation_success', {
                    page: 'loading',
                    result_count: data.recommendations?.length || 0,
                    user_mode: conditions.userMode || 'unknown',
                });

                localStorage.setItem('recommendations', JSON.stringify(data.recommendations || []));
                localStorage.setItem('hasRecommendationResult', 'true');

                navigate('/result', { replace: true });
            } catch (error) {
                ReactGA.event('recommendation_fail', {
                    page: 'loading',
                    status_code: error.response?.status || 'unknown',
                    error_message: error.response?.data?.error || 'unknown',
                });

                alert(error.response?.data?.error || '추천을 불러오지 못했습니다. 다른 조건으로 다시 선택해주세요.');
                navigate('/recommend', { replace: true });
            }
        };

        fetchRecommendation();
    }, [navigate]);

    return (
        <main className="flex h-screen flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_32%,#FFF4E8_0%,#FFFCF8_45%,#FFFFFF_100%)] px-7 text-center">
            <div className="burger-stage">
                {visibleCount >= 1 && <div className="ingredient bottom-bun" />}
                {visibleCount >= 2 && <div className="ingredient lettuce" />}
                {visibleCount >= 3 && <div className="ingredient patty" />}
                {visibleCount >= 4 && <div className="ingredient cheese" />}
                {visibleCount >= 5 && <div className="ingredient tomato" />}
                {visibleCount >= 6 && (
                    <div className="ingredient top-bun">
                        <span className="sesame s1" />
                        <span className="sesame s2" />
                        <span className="sesame s3" />
                        <span className="sesame s4" />
                        <span className="sesame s5" />
                        <span className="sesame s6" />
                    </div>
                )}
            </div>

            <h1 className="mt-8 text-[25px] font-black leading-tight tracking-[-1px] text-[#222]">
                맛잘알 AI가 딱 맞는 맛집을
                <br />
                찾고 있어요
            </h1>
            <p className="mt-4 min-h-[28px] text-[20px] font-bold text-[#FF5A0A]">{messages[messageIndex]}</p>

            <div className="mt-10 flex gap-2">
                <span className="h-3 w-3 animate-bounce rounded-full bg-[#FF5A0A]" />
                <span className="h-3 w-3 animate-bounce rounded-full bg-[#FF8A2A] [animation-delay:0.15s]" />
                <span className="h-3 w-3 animate-bounce rounded-full bg-[#FFB15C] [animation-delay:0.3s]" />
            </div>

            <style>{`
              .burger-stage {
    position: relative;
    width: 210px;
    height: 190px;

    transform: scale(0.8);   /* 80% 크기 */
    transform-origin: center bottom;

    filter: drop-shadow(0 18px 16px rgba(161, 80, 23, 0.18));
}

            .bottom-bun {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);

    width: 164px;
    height: 48px;

    background: linear-gradient(180deg,#f6bf72 0%,#e79238 65%,#c86a20 100%);
    border-radius: 24px 24px 56px 56px;

    box-shadow:
        inset 0 8px 10px rgba(255,255,255,.35),
        0 8px 15px rgba(0,0,0,.12);
}
                .ingredient {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    animation: dropLayer 0.45s ease-out both;
                }

                .lettuce {
                    bottom: 38px;
                    width: 178px;
                    height: 28px;
                    background: linear-gradient(180deg, #b7ff4f 0%, #62cf1f 70%, #43a914 100%);
                    border-radius: 999px;
                    clip-path: polygon(
                        0 45%, 8% 20%, 17% 55%, 27% 18%, 38% 58%,
                        50% 16%, 62% 58%, 73% 18%, 83% 55%, 92% 20%,
                        100% 45%, 96% 100%, 4% 100%
                    );
                }

                .patty {
                    bottom: 58px;
                    width: 170px;
                    height: 42px;
                    background:
                        radial-gradient(circle at 25% 35%, rgba(255,255,255,0.18), transparent 16%),
                        radial-gradient(circle at 70% 60%, rgba(255,255,255,0.12), transparent 14%),
                        linear-gradient(180deg, #8a4a1e 0%, #5a2b10 65%, #3e1a08 100%);
                    border-radius: 999px;
                    box-shadow: inset 0 -7px 8px rgba(0,0,0,0.22);
                }

                .cheese {
                    bottom: 91px;
                    width: 160px;
                    height: 32px;
                    background: linear-gradient(180deg, #ffd84d 0%, #f3b51f 100%);
                    clip-path: polygon(0 0, 100% 0, 100% 58%, 72% 58%, 55% 100%, 38% 58%, 0 58%);
                    border-radius: 8px 8px 12px 12px;
                }

                .tomato {
                    bottom: 116px;
                    width: 176px;
                    height: 20px;
                    background: linear-gradient(180deg, #ff756a 0%, #e8332c 100%);
                    border-radius: 999px;
                    box-shadow: inset 0 4px 5px rgba(255,255,255,0.25);
                }

                .top-bun {
                    bottom: 126px;
                    width: 170px;
                    height: 70px;
                    background: linear-gradient(180deg, #efa64d 0%, #e58b2d 55%, #d36d1d 100%);
                    border-radius: 90px 90px 26px 26px;
                    box-shadow: inset 0 10px 12px rgba(255,255,255,0.25);
                }

                .sesame {
                    position: absolute;
                    width: 8px;
                    height: 14px;
                    background: #ffe0a3;
                    border-radius: 999px;
                    transform: rotate(25deg);
                }

                .s1 { top: 17px; left: 38px; }
                .s2 { top: 10px; left: 66px; transform: rotate(-20deg); }
                .s3 { top: 20px; left: 92px; }
                .s4 { top: 13px; left: 122px; transform: rotate(-25deg); }
                .s5 { top: 34px; left: 58px; transform: rotate(35deg); }
                .s6 { top: 32px; left: 112px; transform: rotate(18deg); }

                @keyframes dropLayer {
                    0% {
                        opacity: 0;
                        transform: translateX(-50%) translateY(-42px) scale(0.96);
                    }
                    75% {
                        transform: translateX(-50%) translateY(4px) scale(1.02);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0) scale(1);
                    }
                }
            `}</style>
        </main>
    );
}

export default Loading;
