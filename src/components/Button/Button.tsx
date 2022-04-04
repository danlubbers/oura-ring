import { forwardRef, Ref } from "react";
import styles from "./Button.module.scss";

const Button = forwardRef(
  (
    {
      btnAction,
      type,
      onClick,
      style,
    }: {
      btnAction: string;
      type: "button" | "submit" | "reset" | undefined;
      onClick?: (e: React.SyntheticEvent<Element, Event>) => void;
      style?: {};
    },
    ref: Ref<HTMLDivElement>
  ) => {
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
