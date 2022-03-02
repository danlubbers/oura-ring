import { useState } from "react";
import LoginComponent from "../components/Login/Login";
import { loginUser } from "../utilities/loginUser";

// Fix setToken which is currently set to "any"
const Login = ({ setToken }: any) => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
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
      await setToken(credentials);
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
        error={error}
      />
    </>
  );
};

export default Login;
