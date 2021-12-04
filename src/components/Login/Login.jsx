import React from "react";
import * as styles from "./Login.module.scss";
import logo from "../../assets/logo/default_seo_image.png";
import Input from "../Input/Input";
import Button from "../Button/Button";

const Login = ({ handleUsername, handlePassword, handleSubmit }) => {
  return (
    <div className={styles.loginContainer}>
      <img className={styles.logo} src={logo} alt="logo" />
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <p className={styles.usernameText}>Enter Username</p>
        <Input type="text" placeholder="username" onChange={handleUsername} />
        <p className={styles.passwordText}>Enter Password </p>
        <Input
          type="password"
          placeholder="password"
          onChange={handlePassword}
        />
        <Button btnAction="Submit" type="submit" />
      </form>
    </div>
  );
};

export default Login;