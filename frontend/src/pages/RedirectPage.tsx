import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

function RedirectPage() {
    const { slug } = useParams();
    const hasFetched = useRef(false);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const controller = new AbortController();
        setIsFetching(true);

        const fetchOriginalUrl = async () => {
            try {
                const { data } = await axiosInstance.get(`/urls/${slug}`, {
                    signal: controller.signal,
                });
                window.location.href = data.originalUrl;
            } catch (error: any) {
                if (error.name === 'AbortError') {
                    console.log('⚠️ Request aborted');
                } else {
                    console.error('❌ Failed to fetch original URL', error);
                    window.location.href = '/';
                }
            } finally {
                setIsFetching(false);
            }
        };

        fetchOriginalUrl();

        return () => {
            if (isFetching) {
                controller.abort();
            }
        };
    }, [slug, isFetching]);

    return <p>Redirecting...</p>;
}

export default RedirectPage;