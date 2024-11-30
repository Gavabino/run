import React, {createContext, useContext, useEffect, useState} from 'react';
import {auth} from '../utils/firebase';
import {onAuthStateChanged} from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return onAuthStateChanged(auth, initializeUser);
    }, [])

    async function initializeUser(user) {
        if (user) {
            setCurrentUser({...user})
            setUserLoggedIn(true);
        } else {
            setCurrentUser(null)
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}