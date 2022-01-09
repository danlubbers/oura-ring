import React, { useRef, useEffect } from "react";
import * as styles from "./Button.module.scss";

const Button = ({ btnAction, btnType, onClick, style }) => {
  const elementRef = useRef();

  useEffect(() => {
    const btnRef = elementRef.current;
    console.log(btnRef); // logs <div>I'm an element</div>
  }, []);
  return (
    <div className={styles.buttonWrapper} ref={elementRef}>
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
};

export default Button;
