import React from "react";
import * as styles from "./Login.module.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/default_seo_image.png";
import Input from "../Input/Input";

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <img className={styles.logo} src={logo} />
      <div className={styles.loginWrapper}>
        <p className={styles.usernameText}>Enter Username</p>
        <Input placeholder="username" />
        <p className={styles.passwordText}>Enter Password </p>
        <Input placeholder="password" />
      </div>
      <Link to="user-data">User Profile</Link>
      <Link to="sleep-data">User Sleep</Link>
    </div>
  );
};

export default Login;
