import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import '../styles/editUrls.css';

function EditUrl() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [newSlug, setNewSlug] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setNewSlug(slug || '');
    }, [slug]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await axiosInstance.patch(`/urls/${slug}`, { slug: newSlug });
            navigate('/my-urls'); // Redirect back to My URLs page
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update slug');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2 className="title">Edit Shortened URL</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="edit-form">
                <input
                    type="text"
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value)}
                    placeholder="Enter new slug"
                    className="form-input"
                    required
                />
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}

export default EditUrl;