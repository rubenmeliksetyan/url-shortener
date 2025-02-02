import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import RedirectPage from './pages/RedirectPage';
import MyUrls from "./pages/MyUrls.tsx";
import EditUrl from "./pages/EditUrl.tsx";
import Header from "./components/Header.tsx";
import Stats from "./pages/Stats.tsx";
import {useAuth} from "./pages/AuthContext.tsx";

function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" replace />;
}
function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>

                <Route path="/:slug" element={<ProtectedRoute><RedirectPage /></ProtectedRoute>}/>
                <Route path="/stats/:slug" element={<ProtectedRoute><Stats /></ProtectedRoute>}/>
                <Route path="/edit/:slug" element={<ProtectedRoute><EditUrl /></ProtectedRoute>}/>
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/my-urls" element={<ProtectedRoute><MyUrls /></ProtectedRoute>} />
            </Routes>

        </Router>
    );
}

export default App;