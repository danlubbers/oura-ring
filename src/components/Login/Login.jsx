import React from "react";
import * as styles from "./Login.module.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/default_seo_image.png";
import Input from "../Input/Input";
import Button from "../Button/Button";

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <img className={styles.logo} src={logo} alt="logo" />
      <div className={styles.loginWrapper}>
        <p className={styles.usernameText}>Enter Username</p>
        <Input placeholder="username" />
        <p className={styles.passwordText}>Enter Password </p>
        <Input placeholder="password" />
        <Button btnAction={"Submit"} />
      </div>
      <div className={styles.linkWrapper}>
        <Link className={styles.link} to="user-data">
          User Profile
        </Link>
        <Link className={styles.link} to="sleep-data">
          User Sleep
        </Link>
      </div>
    </div>
  );
};

export default Login;
