import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecommendations } from '../api/restaurantApi';

function Loading() {
    const navigate = useNavigate();
    const hasFetched = useRef(false);

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

                console.log('추천 요청 payload:', payload);

                const data = await getRecommendations(payload);
                localStorage.setItem('recommendations', JSON.stringify(data.recommendations || []));
                localStorage.setItem('hasRecommendationResult', 'true');

                navigate('/result', { replace: true });
            } catch (error) {
                console.error('AI 추천 요청 실패:', error);
                console.error('상태 코드:', error.response?.status);
                console.error('서버 응답:', error.response?.data);

                const savedRecommendations = localStorage.getItem('recommendations');

                if (savedRecommendations) {
                    navigate('/result', { replace: true });
                    return;
                }

                alert('추천을 불러오지 못했습니다. 다른 조건으로 다시 선택해주세요.');
                navigate('/recommend', { replace: true });
            }
        };

        fetchRecommendation();
    }, [navigate]);

    return (
        <main className="flex h-screen flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_32%,#FFF4E8_0%,#FFFCF8_45%,#FFFFFF_100%)] px-7 text-center">
            <div className="animate-bounce text-[96px] drop-shadow-[0_18px_16px_rgba(161,80,23,0.18)]">🍔</div>

            <h1 className="mt-8 text-[28px] font-black leading-tight tracking-[-1px] text-[#222]">
                맛잘알 AI가 딱 맞는 맛집을
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
