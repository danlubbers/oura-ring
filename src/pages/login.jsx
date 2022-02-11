import { useState } from "react";
import LoginComponent from "../components/Login/Login";
import { loginUser } from "../utilities/loginUser";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState({
    usernameError: null,
    passwordError: null,
  });

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
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
    if (
      username !== process.env.REACT_APP_USERNAME &&
      password !== process.env.REACT_APP_PASSWORD
    ) {
      setError({
        usernameError: "The username you have submitted is incorrect!",
        passwordError: "The password you have submitted is incorrect!",
      });
    } else if (username !== process.env.REACT_APP_USERNAME) {
      setError({
        usernameError: "The username you have submitted is incorrect!",
      });
    } else if (password !== process.env.REACT_APP_PASSWORD) {
      setError({
        passwordError: "The password you have submitted is incorrect!",
      });
    }
  };

  return (
    <>
      <LoginComponent
        handleUsername={handleUsername}
        handlePassword={handlePassword}
        handleSubmit={handleSubmit}
        error={error}
      />
    </>
  );
};

export default Login;
