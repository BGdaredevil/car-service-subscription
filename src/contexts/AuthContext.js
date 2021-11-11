import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/base.js";

export const AuthContext = createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, []);

  const register = async (userData) => {
    let response = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    return updateProfile(auth.currentUser, {
      displayName: userData.username,
    });
  };
  const login = async (userData) => {
    const response = await signInWithEmailAndPassword(auth, userData.email, userData.password);
  };
  const logout = async () => {
    await auth.signOut();
  };

  const contextData = { user, isLoggedIn, login, register, logout };

  return <AuthContext.Provider value={contextData}>{props.children}</AuthContext.Provider>;
}

export default AuthContextProvider;
