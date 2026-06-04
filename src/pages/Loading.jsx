import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Loading() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/result');
        }, 1500);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <main className="page">
            <h1>추천 중...</h1>
            <p>언니 취향 분석하는 중.</p>
        </main>
    );
}

export default Loading;
