import { FC } from "react";
import styles from "./Container.module.scss";

interface ContainerProps {
  isFooter?: boolean;
}
const Container: FC<ContainerProps> = ({ children }, isFooter) => {
  return (
    <div
      className={
        isFooter
          ? `${styles.container}`
          : `${styles.container} ${styles.noFooter}`
      }
    >
      {children}
    </div>
  );
};

export default Container;
