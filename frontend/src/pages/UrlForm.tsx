import { useState } from 'react';
import { createShortUrl, updateShortUrl } from '../api/urlService';

interface UrlFormProps {
    userId: number;
}

const UrlForm: React.FC<UrlFormProps> = ({ userId }) => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [existingId, setExistingId] = useState<number | null>(null);
    const [message, setMessage] = useState('');

    const handleCreate = async () => {
        try {
            const response = await createShortUrl(originalUrl, userId);
            setShortenedUrl(response.shortenedUrl);
            setMessage('Short URL created successfully!');
        } catch (error) {
            setMessage('Error creating short URL.');
        }
    };

    const handleUpdate = async () => {
        if (!existingId) return;
        try {
            await updateShortUrl(existingId, shortenedUrl);
            setMessage('Short URL updated successfully!');
        } catch (error) {
            setMessage('Error updating short URL.');
        }
    };

    return (
        <div>
            <h2>Create a Short URL</h2>
            <input
                type="text"
                placeholder="Enter original URL"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
            />
            <button onClick={handleCreate}>Shorten</button>

            {shortenedUrl && <p>Short URL: {shortenedUrl}</p>}

            <h2>Update Short URL</h2>
            <input
                type="number"
                placeholder="Enter URL ID"
                value={existingId || ''}
                onChange={(e) => setExistingId(Number(e.target.value))}
            />
            <input
                type="text"
                placeholder="Enter new slug"
                value={shortenedUrl}
                onChange={(e) => setShortenedUrl(e.target.value)}
            />
            <button onClick={handleUpdate}>Update</button>

            {message && <p>{message}</p>}
        </div>
    );
};

export default UrlForm;