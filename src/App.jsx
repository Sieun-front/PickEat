import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Home from './pages/Home';
import ReactGA from 'react-ga4';
ReactGA.initialize('G-PFXDZ4GXRX'); // 실제 GA4 측정 ID로 교체
function GAListener() {
    const location = useLocation();

    useEffect(() => {
        ReactGA.send({
            hitType: 'pageview',
            page: location.pathname,
        });
    }, [location]);

    return null;
}
function App() {
    return (
        <BrowserRouter>
            <div className="mx-auto min-h-screen w-full max-w-[430px] bg-[#FFFCF8]">
                <Routes>
                    <Route path="/" element={<Onboarding />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
