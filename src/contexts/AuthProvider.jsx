import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;

      if (!user.photoURL && user.providerData && user.providerData[0]?.photoURL) {
        await updateProfile(user, {
          photoURL: user.providerData[0].photoURL
        });
      }

      return result;
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    }
  };

  const emailLogin = (email, pass) =>
    signInWithEmailAndPassword(auth, email, pass);

  const register = async (name, photo, email, pass) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(cred.user, { displayName: name, photoURL: photo });
  };

  const logOut = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        if (!currentUser.photoURL &&
            currentUser.providerData &&
            currentUser.providerData.length > 0 &&
            currentUser.providerData[0].providerId === 'google.com') {

          const googlePhotoURL = currentUser.providerData[0].photoURL;
          if (googlePhotoURL) {
            updateProfile(currentUser, {
              photoURL: googlePhotoURL
            }).then(() => {
              setUser({...currentUser});
            }).catch(err => {
              console.error("Error updating profile with Google photo:", err);
              setUser(currentUser);
            });
          } else {
            setUser(currentUser);
          }
        } else {
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    googleLogin,
    emailLogin,
    register,
    logOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
