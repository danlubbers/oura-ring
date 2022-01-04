import React from "react";
import * as styles from "./SideMenu.module.scss";
import Container from "../Container/Container";
import HamburgerIcon from "../HamburgerIcon/HamburgerIcon";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const SideMenu = ({ handleClickMobileDisplay, isMobileDisplay, logout }) => {
  return (
    <Container>
      <HamburgerIcon
        handleClickMobileDisplay={handleClickMobileDisplay}
        isMobileDisplay={isMobileDisplay}
      />
      <div className={styles.userProfileText}>
        <Link className={styles.link} to="/user-data">
          User Profile
        </Link>
      </div>
      <div className={styles.weeklyAverageText}>
        <Link className={styles.link} to="/weekly-average-data">
          Weekly Averages
        </Link>
      </div>

      <Button
        btnAction="Logout"
        onClick={logout}
        style={{ marginTop: "2rem" }}
      />
    </Container>
  );
};

export default SideMenu;
