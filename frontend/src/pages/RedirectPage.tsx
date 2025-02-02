import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosConfig.ts';

function RedirectPage() {
    const { slug } = useParams();

    useEffect(() => {
        const fetchOriginalUrl = async () => {
            try {
                const { data } = await axiosInstance.get(`/urls/${slug}`);
                window.location.href = data.originalUrl;
            } catch (error) {
                console.error('Failed to fetch original URL', error);
                window.location.href = '/';
            }
        };

        fetchOriginalUrl();
    }, [slug]);

    return <p>Redirecting...</p>;
}

export default RedirectPage;