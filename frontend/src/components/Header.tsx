import { Link } from 'react-router-dom';
import {useAuth} from "../pages/AuthContext.tsx";
import '../styles/header.css';

function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="header">
            <nav className="nav-container">
                <div className="nav-left">
                    <Link to="/">Home</Link>
                </div>
                <div className="nav-right">
                    {user ? (
                        <>
                            <Link to="/my-urls">My URLs</Link>
                            <button onClick={logout} className="logout-btn">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Login</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;