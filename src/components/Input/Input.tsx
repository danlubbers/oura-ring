import styles from "./Input.module.scss";

const Input = ({
  type,
  placeholder,
  onChange,
}: {
  type: string;
  placeholder: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}) => {
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
