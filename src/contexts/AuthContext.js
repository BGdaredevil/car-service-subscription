import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { auth } from "../firebase/base.js";
import { get, post } from "../services/apiService.js";
import { endpoints } from "../config/apiConfig.js";
import { MessageContext } from "./MessageContext.js";

export const AuthContext = createContext();

const blankUser = {
  uid: "",
};

const token = process.env.REACT_APP_TOKEN_LOCAL_STORAGE || "car-service-token";

function AuthContextProvider(props) {
  const [user, setUserState] = useState(blankUser);

  const { addMessage } = useContext(MessageContext);

  const setUser = useCallback(
    (data) => {
      if (data) {
        get(`${endpoints.userApi}/${data?.uid}`)
          .then((res) => {
            localStorage.setItem(token, JSON.stringify({ ...data, ...res }));
            setUserState({ ...data, ...res });
          })
          .catch((e) => {
            addMessage("Pesho is lost back there... please excuse him");
            localStorage.setItem(token, null);
            setUserState(blankUser);
          });
      } else {
        localStorage.setItem(token, null);
        setUserState(blankUser);
      }
    },
    [addMessage]
  );

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, [setUser]);

  const register = async ({ email, password, username, accountType }) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: username,
    });
    const rest = await post(endpoints.userApi, {
      username: username,
      accountType: accountType,
      uid: user.uid,
    });
    setUser({ ...user, ...rest });
  };

  const login = ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    auth.signOut();
  };

  const isAuth = Boolean(
    localStorage.getItem(token) !== "null" && localStorage.getItem(token) !== null
  );

  // console.log("isAuth -- ", isAuth);
  // console.log(typeof localStorage.getItem(token), localStorage.getItem(token));

  return (
    <AuthContext.Provider value={{ user, isAuth, login, register, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
