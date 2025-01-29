import * as jwtDecode from 'jwt-decode';

export const getUserFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        return jwtDecode(token); // Decode token to get user data
    } catch {
        return null;
    }
};

export const isLoggedIn = () => !!getUserFromToken();