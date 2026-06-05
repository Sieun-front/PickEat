import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Loading from './pages/Loading';
import Result from './pages/Result';
import Saved from './pages/Saved';
import Mypage from './pages/Mypage';

import ReactGA from 'react-ga4';
ReactGA.initialize('G-PFXDZ4GXRX');
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
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/loading" element={<Loading />} />
                    <Route path="/result" element={<Result />} />
                    <Route path="/saved" element={<Saved />} />
                    <Route path="/mypage" element={<Mypage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
