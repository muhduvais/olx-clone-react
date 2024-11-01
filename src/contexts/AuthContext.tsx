import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, provider } from '../services/firebaseConfig';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';

type AuthContextType = {
    user: User | null;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    isLoginModalOpen: boolean;
    openLoginModal: () => void;
    closeLoginModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
        console.log('isLoginModalOpen: ', isLoginModalOpen);
    }
    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
        console.log('isLoginModalOpen: ', isLoginModalOpen);
    }

    const login = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            console.log('User: ', user)
            closeLoginModal();
        } catch (error) {
            console.log('Error during login: ', error);
        }
    }

    console.log('User: ', user)

    const logout = async () => {
        await signOut(auth);
        setUser(null);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoginModalOpen, openLoginModal, closeLoginModal }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}