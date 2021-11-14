import * as styles from "./Input.module.scss";

const Input = ({ placeholder }) => {
  return (
    <div className={styles.inputWrapper}>
      <input className={styles.input} placeholder={placeholder} />
    </div>
  );
};

export default Input;
