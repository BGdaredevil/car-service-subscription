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

function AuthContextProvider(props) {
  const [user, setUserState] = useState(blankUser);

  const { addMessage } = useContext(MessageContext);

  const setUser = useCallback(
    (data) => {
      if (data) {
        get(`${endpoints.userApi}/${data?.uid}`)
          .then((res) => {
            localStorage.setItem(
              process.env.REACT_APP_TOKEN_LOCAL_STORAGE,
              JSON.stringify({ ...data, ...res })
            );
            setUserState({ ...data, ...res });
          })
          .catch((e) => {
            addMessage("Pesho is lost back there... please excuse him");
            localStorage.setItem(process.env.REACT_APP_TOKEN_LOCAL_STORAGE, null);
            setUserState(blankUser);
          });
      } else {
        localStorage.setItem(process.env.REACT_APP_TOKEN_LOCAL_STORAGE, null);
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
    localStorage.getItem(process.env.REACT_APP_TOKEN_LOCAL_STORAGE) !== "null"
  );

  console.log("isAuth -- ", isAuth);

  return (
    <AuthContext.Provider value={{ user, isAuth, login, register, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
