import React from "react";
import * as styles from "./Login.module.scss";
import logo from "../../assets/logo/default_seo_image.png";

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <img className={styles.logo} src={logo} />
      <p>Login </p>
    </div>
  );
};

export default Login;
