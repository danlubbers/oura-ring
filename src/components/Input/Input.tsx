import styles from "./Input.module.scss";
import { InputProps } from "../../types/dataTypes";

const Input: React.FC<InputProps> = ({
  type,
  id,
  name,
  placeholder,
  onChange,
}) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        type={type}
        id={id}
        name={name}
        className={styles.input}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default Input;
