import { useState } from 'react';
import { Utensils, Heart, MapPin, Users } from 'lucide-react';
import ReactGA from 'react-ga4';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

function Recommend() {
    const [diningType, setDiningType] = useState(null);
    const [foodType, setFoodType] = useState(null);
    const [mood, setMood] = useState(null);
    const [distance, setDistance] = useState(null);
    const navigate = useNavigate();
    const baseMoodOptions = ['조용한', '트렌디한', '데이트', '가성비', '인테리어 맛집', '특별한 날'];

    const moodOptions = baseMoodOptions.filter((option) => {
        if (diningType === '혼밥' && ['데이트', '특별한 날'].includes(option)) {
            return false;
        }

        return true;
    });

    const isComplete = diningType && foodType && mood && distance;

    const handleDiningTypeSelect = (value) => {
        setDiningType(value);
        setMood(null);
    };

    const handleFoodTypeSelect = (value) => {
        setFoodType(value);
        setMood(null);
    };

    const handleRecommendClick = () => {
        if (!isComplete) {
            alert('모든 조건을 선택해주세요!');
            return;
        }

        const userMode = localStorage.getItem('userMode') || 'unknown';

        ReactGA.event('recommendation_request', {
            page: 'home',
            user_mode: userMode,
            dining_type: diningType,
            food_type: foodType,
            mood,
            distance,
        });
        console.log({
            diningType,
            foodType,
            mood,
            distance,
            userMode,
        }); // ga 이벤트 전송

        navigate('/loading');
    };

    return (
        <main className="min-h-screen overflow-y-auto bg-white px-6 pb-10 pt-8 text-left">
            <button onClick={() => navigate('/home')} className="absolute left-5 top-10 text-[#111]">
                <ChevronLeft size={30} />
            </button>
            <header className="text-center">
                <h1 className="text-[28px] font-black tracking-[-1px] text-[#FF5A0A]">PickEat</h1>
            </header>

            <section className="mt-4 flex items-center justify-between border-b border-[#eee] pb-4">
                <div>
                    <h2 className="text-[27px] font-black leading-tight tracking-[-2px] text-[#111]">
                        오늘 뭐 먹을지
                        <br />
                        <span className="text-[#FF5A0A]">AI</span>가 골라드릴게요
                    </h2>

                    <p className="mt-3 text-[14px] font-semibold leading-6 text-[#999]">
                        원하는 조건을 고르면 PickEat이
                        <br />
                        주변 맛집을 추천해요.
                    </p>
                </div>

                <div className="text-[72px] drop-shadow-[0_12px_12px_rgba(161,80,23,0.15)]">🍔</div>
            </section>

            <OptionSection
                icon={<Users size={19} />}
                title="식사 상황"
                options={['혼밥', '같밥']}
                selectedValue={diningType}
                onSelect={handleDiningTypeSelect}
                twoColumns
            />

            <OptionSection
                icon={<Utensils size={18} />}
                title="음식 종류"
                options={['한식', '양식', '일식', '중식', '분식', '카페/디저트', '주류', '아무거나']}
                selectedValue={foodType}
                onSelect={handleFoodTypeSelect}
                disabled={!diningType}
            />

            <OptionSection
                icon={<Heart size={18} />}
                title="분위기"
                options={moodOptions}
                selectedValue={mood}
                onSelect={setMood}
                disabled={!foodType}
            />

            <OptionSection
                icon={<MapPin size={18} />}
                title="거리"
                options={['도보 5분', '10분', '15분', '상관없음']}
                selectedValue={distance}
                onSelect={setDistance}
                fixedGrid
                disabled={!mood}
            />

            <button
                onClick={handleRecommendClick}
                disabled={!isComplete}
                className={
                    isComplete
                        ? 'mt-5 h-[58px] w-full rounded-[24px] bg-gradient-to-b from-[#FF761A] to-[#FF4F00] text-[20px] font-black text-white shadow-[0_12px_24px_rgba(255,96,0,0.22)]'
                        : 'mt-5 h-[58px] w-full rounded-[24px] bg-[#D9D9D9] text-[20px] font-black text-white'
                }
            >
                ✨ AI 추천받기
            </button>
        </main>
    );
}
function OptionSection({
    icon,
    title,
    options,
    selectedValue,
    onSelect,
    twoColumns = false,
    fixedGrid = false,
    disabled = false,
}) {
    const layoutClass = fixedGrid
        ? 'grid grid-cols-4 gap-2'
        : twoColumns
        ? 'grid grid-cols-2 gap-2'
        : 'flex flex-wrap gap-2';

    const buttonClass = (isSelected) => {
        const sizeClass = fixedGrid ? 'w-full px-1 text-[13px]' : 'px-6';

        if (disabled) {
            return `h-[42px] rounded-2xl bg-[#F1F1F1] ${sizeClass} text-[15px] font-extrabold text-[#B8B8B8]`;
        }

        return isSelected
            ? `h-[42px] rounded-2xl bg-gradient-to-b from-[#FF761A] to-[#FF4F00] ${sizeClass} text-[15px] font-black text-white shadow-[0_8px_16px_rgba(255,96,0,0.2)]`
            : `h-[42px] rounded-2xl bg-[#F7F7F7] ${sizeClass} text-[15px] font-extrabold text-[#444] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]`;
    };

    return (
        <section className="border-b border-[#eee] py-3">
            <div className="mb-3 flex items-center gap-2">
                <div
                    className={
                        disabled
                            ? 'flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#DDD] text-[#BBB]'
                            : 'flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#FF6A13] text-[#FF6A13]'
                    }
                >
                    {icon}
                </div>

                <h3 className={disabled ? 'text-[19px] font-black text-[#BBB]' : 'text-[19px] font-black text-[#222]'}>
                    {title}
                </h3>
            </div>

            <div className={layoutClass}>
                {options.map((option) => {
                    const isSelected = selectedValue === option;

                    return (
                        <button
                            key={option}
                            type="button"
                            disabled={disabled}
                            onClick={() => onSelect(option)}
                            className={buttonClass(isSelected)}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
export default Recommend;
