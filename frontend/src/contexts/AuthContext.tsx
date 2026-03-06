import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/services/api';
import { toast } from 'sonner';

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    isVerified: boolean;
    token: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (userData: any) => Promise<any>;
    register: (userData: any) => Promise<any>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in
    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    // Verify token by fetching user profile
                    const { data } = await api.get('/auth/me');
                    // Start with basic data from storage if API fails, but ideally we get it from API
                    // For now, let's just use the stored user data if available or rely on the API response if we had a full /me endpoint that returns everything.
                    // Since /me might only return profile without token, we reconstruct or just store 'user' in localstorage too.
                    const storedUser = localStorage.getItem('user');
                    if (storedUser) {
                        setUser(JSON.parse(storedUser));
                    } else {
                        // If we have token but no user data, we might need to rely on /me returning it all or re-login.
                        // For simplicity in this MERN setup, we'll assume /me returns the user object.
                        setUser({ ...data, token });
                    }
                } catch (error) {
                    console.error("Auth check failed", error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        checkLoggedIn();
    }, []);

    const login = async (userData: any) => {
        try {
            const { data } = await api.post('/auth/login', userData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
            toast.success('Login successful!');
            return data;
        } catch (error: any) {
            const message = error.response?.data?.message || 'Login failed';
            toast.error(message);
            throw error;
        }
    };

    const register = async (userData: any) => {
        try {
            const { data } = await api.post('/auth/register', userData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
            toast.success('Registration successful!');
            return data;
        } catch (error: any) {
            const message = error.response?.data?.message || 'Registration failed';
            toast.error(message);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        toast.success('Logged out successfully');
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
