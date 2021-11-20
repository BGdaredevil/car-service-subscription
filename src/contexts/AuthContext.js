import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/base.js";
import { get, post } from "../services/apiService.js";
import { endpoints } from "../config/apiConfig.js";

export const AuthContext = createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        get(`${endpoints.userApi}/${user.uid}`)
          .then((res) => {
            localStorage.setItem(process.env.REACT_APP_TOKEN_LOCAL_STORAGE, user.uid);
            setUser({ ...user, ...res });
          })
          .catch((e) => alert(e));
      } else {
        setUser(user);
        localStorage.removeItem(process.env.REACT_APP_TOKEN_LOCAL_STORAGE);
      }
    });
  }, []);

  const register = async ({ email, password, username, accountType }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      // localStorage.setItem(process.env.REACT_APP_TOKEN_LOCAL_STORAGE, user.uid);
      await post(endpoints.userApi, {
        username: username,
        accountType: accountType,
        uid: user.uid,
      });
    } catch (err) {
      alert(err);
    }
  };
  const login = async ({ email, password }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem(process.env.REACT_APP_TOKEN_LOCAL_STORAGE, user.uid);
    } catch (err) {
      alert(err);
    }
  };
  const logout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem(process.env.REACT_APP_TOKEN_LOCAL_STORAGE);
    } catch (err) {
      alert(err);
    }
  };

  const contextData = { user, login, register, logout };

  return <AuthContext.Provider value={contextData}>{props.children}</AuthContext.Provider>;
}

export default AuthContextProvider;
