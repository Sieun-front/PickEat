import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <main className="page">
            <h1>PickEat</h1>
            <p>오늘 뭐 먹을지 대신 골라줄게요.</p>

            <button onClick={() => navigate('/loading')}>시작하기</button>
        </main>
    );
}

export default Home;
