import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import API_BASE_URL from '../config/api';
import { useAuth } from './AuthContext';

function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setError(null);

        try {
            const {data} = await axios.post(`${API_BASE_URL}/auth/login`, {
                email,
                password,
            });
            localStorage.setItem('token', data.token);
            login(data.token);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error logging in');
            console.error(err.response?.data || 'Error logging in');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2 className="form-title">Welcome Back! 👋</h2>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Sign In</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}

export default Login;