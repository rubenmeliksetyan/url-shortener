import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: any) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/auth/register', {
                email,
                password,
                name
            });
            navigate('/login');
        } catch (err: any) {
            console.error(err.response?.data || 'Error registering');
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleRegister} className="register-form">
                <h2 className="form-title">Register</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    required
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    required
                />
                <button type="submit" className="submit-btn">Register</button>
            </form>
        </div>
    );
}

export default Register;