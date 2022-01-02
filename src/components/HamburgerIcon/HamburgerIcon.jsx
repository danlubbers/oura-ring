import React from "react";
import * as styles from "./HamburgerIcon.module.scss";

const HamburgerIcon = ({ handleClickMobileDisplay, isMobileDisplay }) => {
  return (
    <nav className={styles.menubarWrapper} onClick={handleClickMobileDisplay}>
      <div
        className={
          !isMobileDisplay
            ? `${styles.menuIcon}`
            : `${styles.menuIcon} ${styles.active}`
        }
      >
        <span className={styles.menubar1} />
        <span className={styles.menubar2} />
        <span />
      </div>
    </nav>
  );
};

export default HamburgerIcon;
