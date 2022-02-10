import styles from "./Input.module.scss";

const Input = ({ type, placeholder, onChange }) => {
  // console.log(`onChange`, onChange);
  return (
    <div className={styles.inputWrapper}>
      <input
        type={type}
        className={styles.input}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default Input;
