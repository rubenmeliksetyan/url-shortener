import {useEffect, useState} from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';
import '../styles/Home.css';
import axiosInstance from "../axiosConfig.ts";

function Home() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [originalUrl, setOriginalUrl] = useState('');
    const [customSlug, setCustomSlug] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [error, setError] = useState('');
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setShortenedUrl('');

        try {
            const { data } = await axiosInstance.post(`${API_BASE_URL}/urls`, {
                originalUrl,
                slug: customSlug || undefined,
            });

            setShortenedUrl(`${window.location.origin}/${data.slug}`);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create short URL');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortenedUrl);
        alert('Short URL copied to clipboard!');
    };

    return (
        <div className="home-container">
            <div className="home-box">
                <h2 className="form-title">Shorten a URL</h2>
                <form onSubmit={handleSubmit} className="shorten-form">
                    <input
                        type="url"
                        placeholder="Enter original URL"
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        className="form-input"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Custom slug (optional)"
                        value={customSlug}
                        onChange={(e) => setCustomSlug(e.target.value)}
                        className="form-input"
                    />
                    <button type="submit" className="submit-btn">Shorten</button>
                </form>

                {error && <p className="error-message">{error}</p>}

                {shortenedUrl && (
                    <div className="result-container">
                        <p className="short-url">{shortenedUrl}</p>
                        <button className="copy-btn" onClick={copyToClipboard}>Copy</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;