import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import '../styles/stats.css';


interface StatsData {
    originalUrl: string;
    slug: string;
    visitCount: number;
}
function Stats() {
    const { slug } = useParams();
    const [stats, setStats] = useState<StatsData | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axiosInstance.get(`/urls/${slug}/stats`);
                setStats(data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch stats');
            }
        };
        fetchStats();
    }, [slug]);

    return (
        <div className="container">
            <h2>URL Statistics</h2>
            {error && <p className="error-message">{error}</p>}
            {stats ? (
                <div>
                    <p><strong>Original URL: </strong>
                        <span className="tooltip-container">
                            <span className="url-text" title={stats.originalUrl}>
                                {stats.originalUrl.length > 50
                                    ? `${stats.originalUrl.substring(0, 50)}...`
                                    : stats.originalUrl}
                            </span>
                        </span></p>
                    <p><strong>Slug:</strong> {stats.slug}</p>
                    <p><strong>Visit count:</strong> {stats.visitCount}</p>
                </div>
            ) : <p>Loading stats...</p>}
        </div>
    );
}

export default Stats;