import { useState } from "react";
import LoginComponent from "../components/Login/Login";
import { loginUser } from "../utilities/loginUser";
import { SetTokenProps } from "../types/dataTypes";

const Login: React.FC<SetTokenProps> = ({ setToken }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<{
    usernameError: string | null;
    passwordError: string | null;
  }>({
    usernameError: null,
    passwordError: null,
  });

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (
      username === process.env.REACT_APP_USERNAME &&
      password === process.env.REACT_APP_PASSWORD
    ) {
      const credentials = await loginUser({
        username,
        password,
      });
      if (setToken) {
        await setToken(credentials);
      }
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
        passwordError: null,
      });
    } else if (password !== process.env.REACT_APP_PASSWORD) {
      setError({
        usernameError: null,
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
        username={username}
        password={password}
        error={error}
      />
    </>
  );
};

export default Login;
