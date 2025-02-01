import { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';

function Home() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [customSlug, setCustomSlug] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setShortenedUrl('');

        try {
            const { data } = await axios.post(`${API_BASE_URL}/urls`, {
                originalUrl,
                slug: customSlug || undefined, // Use custom slug if provided
            });

            setShortenedUrl(`${window.location.origin}/${data.slug}`);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create short URL');
        }
    };

    return (
        <div>
            <h2>Shorten a URL</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="url"
                    placeholder="Enter original URL"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Custom slug (optional)"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value)}
                />
                <button type="submit">Shorten</button>
            </form>

            {error && <p className="error">{error}</p>}

            {shortenedUrl && (
                <div>
                    <p>Shortened URL:</p>
                    <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
                        {shortenedUrl}
                    </a>
                </div>
            )}
        </div>
    );
}

export default Home;