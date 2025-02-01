import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import API_BASE_URL from '../config/api'

function Login() {
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
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error logging in');
            console.error(err.response?.data || 'Error logging in');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                   required/>
            <button type="submit">Login</button>
            {error && <p className="error">{error}</p>}
        </form>
    );
}

export default Login;