import styles from "./Container.module.scss";

// Figure out the fix for TS children so it's not set to "any"
const Container = ({ children }: any, isFooter: boolean) => {
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
