import styles from "./HamburgerIcon.module.scss";

const HamburgerIcon = ({
  handleClickMobileDisplay,
  isMobileDisplay,
}: {
  handleClickMobileDisplay: () => void;
  isMobileDisplay: boolean;
}) => {
  return (
    <nav className={styles.menubarWrapper}>
      <div
        className={
          !isMobileDisplay
            ? `${styles.menuIcon}`
            : `${styles.menuIcon} ${styles.active}`
        }
        onClick={handleClickMobileDisplay}
      >
        <span className={styles.menubar1} />
        <span className={styles.menubar2} />
        <span />
      </div>
    </nav>
  );
};

export default HamburgerIcon;
