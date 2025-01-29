import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login'); // Redirect if not logged in
        }
    }, []);

    return <h1>Welcome! Shorten your URLs here.</h1>;
}

export default Home;