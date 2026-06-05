import BottomNav from '../components/BottomNav';

function Saved() {
    return (
        <main className="min-h-screen bg-white px-6 pb-24 pt-10 text-center">
            <h1 className="text-[28px] font-black text-[#FF5A0A]">저장</h1>

            <section className="mt-28">
                <div className="text-[72px]">🔖</div>

                <h2 className="mt-5 text-[24px] font-black text-[#222]">아직 저장한 맛집이 없어요</h2>

                <p className="mt-3 text-[15px] font-semibold leading-6 text-[#777]">
                    마음에 드는 맛집을 저장하면
                    <br />
                    여기에서 다시 볼 수 있어요.
                </p>
            </section>

            <BottomNav />
        </main>
    );
}

export default Saved;
