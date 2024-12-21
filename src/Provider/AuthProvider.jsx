import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const [userInformation, setUserInformation] = useState(null)
    const axiosPublic = useAxiosPublic()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'))
        if (storedUser) {
            setUserInformation(storedUser)
        }
    }, [])
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                try {
                    const userInfo = { email: currentUser.email };
                    const res = await axiosPublic.post('/jwt', userInfo);

                    if (res.data.token) {
                        const completeUserData = {
                            ...res.data,
                            displayName: currentUser.displayName,
                            photoURL: currentUser.photoURL,
                        };

                        // Store in localStorage and update state
                        localStorage.setItem('user', JSON.stringify(completeUserData));
                        setUserInformation(completeUserData);
                    }
                } catch (error) {
                    console.error("JWT request failed:", error);
                }
            } else {
                localStorage.removeItem('user');
                setUserInformation(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [axiosPublic]);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile,
        userInformation
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;