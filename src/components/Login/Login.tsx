import styles from "./Login.module.scss";
import logo from "../../assets/logo/default_seo_image.png";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { LoginProps } from "../../types/dataTypes";

const Login: React.FC<LoginProps> = ({
  handleUsername,
  handlePassword,
  handleSubmit,
  error,
}) => {
  const { usernameError, passwordError } = error;

  return (
    <div className={styles.loginContainer}>
      <img className={styles.logo} src={logo} alt="logo" />
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <label className={styles.usernameText} htmlFor="username">
          Enter Username
        </label>

        <Input
          type="text"
          id="username"
          name="username"
          placeholder="username"
          onChange={handleUsername}
        />

        <label className={styles.passwordText} htmlFor="password">
          Enter Password
        </label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          onChange={handlePassword}
        />
        {usernameError && (
          <p className={styles.usernameErrorText}>{usernameError}</p>
        )}
        {passwordError && (
          <p className={styles.passwordErrorText}>{passwordError}</p>
        )}
        <Button btnAction="Submit" type="submit" />
      </form>
    </div>
  );
};

export default Login;
