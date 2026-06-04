import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Loading from './pages/Loading';
import Result from './pages/Result';

function App() {
    return (
        <BrowserRouter>
            <div className="mobile-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/loading" element={<Loading />} />
                    <Route path="/result" element={<Result />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
