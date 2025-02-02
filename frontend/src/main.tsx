import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import {AuthProvider} from "./pages/AuthContext.tsx";

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error("Root element not found");
}
ReactDOM.createRoot(rootElement as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);