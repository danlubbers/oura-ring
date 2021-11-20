import React, { useState } from "react";
import LoginComponent from "../components/Login/Login";
import { loginUser } from "../utilities/loginUser";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    // console.log("submit");
    e.preventDefault();
    if (
      username === process.env.REACT_APP_USERNAME &&
      password === process.env.REACT_APP_PASSWORD
    ) {
      const token = await loginUser({
        username,
        password,
      });
      await setToken(token);
    }
  };

  console.log(`username`, username);
  console.log(`password`, password);
  return (
    <>
      <LoginComponent
        handleUsername={handleUsername}
        handlePassword={handlePassword}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Login;
