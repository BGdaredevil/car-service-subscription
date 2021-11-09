import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const register = async (userData) => {};
  const login = async (userData) => {};
  const logout = async () => {};

  const contextData = { user, isLoggedIn, login, register, logout };

  return <AuthContext.Provider value={contextData}>{props.children}</AuthContext.Provider>;
}

export default AuthContextProvider;
