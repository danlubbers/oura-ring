import { forwardRef } from "react";
import * as styles from "./Button.module.scss";

const Button = forwardRef(({ btnAction, btnType, onClick, style }, ref) => {
  // console.log(`ref`, ref);
  return (
    <div className={styles.buttonWrapper} ref={ref}>
      <button
        type={btnType}
        style={style}
        className={styles.button}
        onClick={onClick}
      >
        {btnAction}
      </button>
    </div>
  );
});

export default Button;
