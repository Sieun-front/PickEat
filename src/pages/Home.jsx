import { useState } from 'react';
import { Utensils, Heart, MapPin, Users } from 'lucide-react';
import ReactGA from 'react-ga4';

function Home() {
    const [foodType, setFoodType] = useState('한식');
    const [mood, setMood] = useState('리뷰 좋은');
    const [distance, setDistance] = useState('도보 5분');
    const [diningType, setDiningType] = useState('갈밥');

    const handleRecommendClick = () => {
        const userMode = localStorage.getItem('userMode') || 'unknown';

        ReactGA.event('recommendation_request', {
            page: 'home',
            user_mode: userMode,
            food_type: foodType,
            mood,
            distance,
            dining_type: diningType,
        });

        console.log({
            foodType,
            mood,
            distance,
            diningType,
            userMode,
        });
    };

    return (
        <main className="min-h-screen overflow-y-auto bg-white px-6 pb-10 pt-8 text-left">
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
                icon={<Utensils size={18} />}
                title="음식 종류"
                options={['한식', '양식', '일식', '중식', '분식', '카페/디저트', '아무거나']}
                selectedValue={foodType}
                onSelect={setFoodType}
            />

            <OptionSection
                icon={<Heart size={18} />}
                title="분위기"
                options={['조용한', '트렌디한', '데이트', '가성비', '인테리어 맛집', '특별한 날', '술 한 잔']}
                selectedValue={mood}
                onSelect={setMood}
            />

            <OptionSection
                icon={<MapPin size={18} />}
                title="거리"
                options={['도보 5분', '10분', '15분', '상관없음']}
                selectedValue={distance}
                onSelect={setDistance}
            />

            <OptionSection
                icon={<Users size={19} />}
                title="식사 상황"
                options={['혼밥', '갈밥']}
                selectedValue={diningType}
                onSelect={setDiningType}
                twoColumns
            />

            <button
                onClick={handleRecommendClick}
                className="mt-5 h-[58px] w-full rounded-[24px] bg-gradient-to-b from-[#FF761A] to-[#FF4F00] text-[20px] font-black text-white shadow-[0_12px_24px_rgba(255,96,0,0.22)]"
            >
                ✨ AI 추천받기
            </button>
        </main>
    );
}

function OptionSection({ icon, title, options, selectedValue, onSelect, twoColumns = false }) {
    return (
        <section className="border-b border-[#eee] py-3">
            <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#FF6A13] text-[#FF6A13]">
                    {icon}
                </div>
                <h3 className="text-[19px] font-black text-[#222]">{title}</h3>
            </div>

            <div className={twoColumns ? 'grid grid-cols-2 gap-2' : 'flex flex-wrap gap-2'}>
                {options.map((option) => {
                    const isSelected = selectedValue === option;

                    return (
                        <button
                            key={option}
                            type="button"
                            onClick={() => onSelect(option)}
                            className={
                                isSelected
                                    ? 'h-[42px] rounded-2xl bg-gradient-to-b from-[#FF761A] to-[#FF4F00] px-6 text-[15px] font-black text-white shadow-[0_8px_16px_rgba(255,96,0,0.2)]'
                                    : 'h-[42px] rounded-2xl bg-[#F7F7F7] px-6 text-[15px] font-extrabold text-[#444] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]'
                            }
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}

export default Home;
