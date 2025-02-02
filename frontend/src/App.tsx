import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import {AuthProvider} from './pages/AuthContext';
import RedirectPage from './pages/RedirectPage';
import MyUrls from "./pages/MyUrls.tsx";
import EditUrl from "./pages/EditUrl.tsx";
import Header from "./components/Header.tsx";
import Stats from "./pages/Stats.tsx";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/:slug" element={<RedirectPage />} />
                    <Route path="/my-urls" element={<MyUrls />} />
                    <Route path="/stats/:slug" element={<Stats />} />
                    <Route path="/edit/:slug" element={<EditUrl />} />
                </Routes>

            </Router>
        </AuthProvider>
    );
}

export default App;