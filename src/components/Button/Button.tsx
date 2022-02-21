import { forwardRef } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  btnAction: string;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  style?: {};
}

// Change "any" here for forwardRef
const Button = forwardRef<any, ButtonProps>(
  ({ btnAction, type, onClick, style }, ref) => {
    return (
      <div className={styles.buttonWrapper} ref={ref}>
        <button
          type={type}
          style={style}
          className={styles.button}
          onClick={onClick}
        >
          {btnAction}
        </button>
      </div>
    );
  }
);

export default Button;
