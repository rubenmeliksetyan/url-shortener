import {jwtDecode} from 'jwt-decode';

export const getUserFromToken = (): boolean | null => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        return jwtDecode(token);
    } catch {
        return null;
    }
};

export const isLoggedIn = () => getUserFromToken();