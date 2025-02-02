import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import '../styles/myUrls.css';

function MyUrls() {
    const [urls, setUrls] = useState<any[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const { data } = await axiosInstance.get('/urls');
                setUrls(data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch URLs');
            }
        };
        fetchUrls();
    }, []);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    return (
        <div className="container">
            <h2 className="title">My Shortened URLs</h2>
            {error && <p className="error-message">{error}</p>}
            <table className="url-table">
                <thead>
                <tr>
                    <th>Shortened URL</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {urls.map((url) => (
                    <tr key={url.id}>
                        <td>
                            <a
                                href={`${window.location.origin}/${url.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="url-link"
                                title={url.originalUrl}
                            >
                                {window.location.origin}/{url.slug}
                            </a>
                        </td>
                        <td className="button-group">
                            <button
                                className="copy-btn"
                                onClick={() => copyToClipboard(`${window.location.origin}/${url.slug}`)}
                            >
                                Copy
                            </button>
                            <Link to={`/edit/${url.slug}`} className="edit-btn">
                                Edit
                            </Link>
                            <Link to={`/stats/${url.slug}`} className="stats-btn">
                                Show Stats
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default MyUrls;