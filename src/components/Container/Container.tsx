import styles from "./Container.module.scss";
import { ContainerProps } from "../../types/dataTypes";

const Container: React.FC<ContainerProps> = ({ children }, isFooter) => {
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
