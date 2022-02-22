import { useState } from "react";

export default function useToken() {
  const getToken: () => string = () => {
    const tokenString = localStorage.getItem("token");
    if (tokenString) {
      const userToken = JSON.parse(tokenString);
      return userToken?.token;
    }
  };

  const [token, setToken] = useState<string | (() => string)>(getToken());

  const saveToken = (userToken: { token: string }) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  return {
    setToken: saveToken,
    token,
    logout,
  };
}
