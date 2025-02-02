import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/AuthContext';
import '../styles/Header.css';

function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <nav className="nav">
                <Link to="/" className="nav-logo">ShortURL</Link>
                <div className="nav-links">
                    <Link to="/my-urls" className="nav-link">My URLs</Link>
                    {user ? (
                        <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
                    ) : (
                        <Link to="/login" className="nav-link">Login</Link>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;