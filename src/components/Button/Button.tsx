import { forwardRef } from "react";
import * as styles from "./Button.module.scss";

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
      onClick: () => void;
      style: {};
    },
    ref
  ) => {
    return (
      // @ts-ignore
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
