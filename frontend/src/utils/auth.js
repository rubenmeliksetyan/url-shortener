import * as jwtDecode from 'jwt-decode';

export const getUserFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        return jwtDecode(token);
    } catch {
        return null;
    }
};

export const isLoggedIn = () => !!getUserFromToken();