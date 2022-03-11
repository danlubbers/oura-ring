import styles from "./SideMenu.module.scss";
import Container from "../Container/Container";
import HamburgerIcon from "../HamburgerIcon/HamburgerIcon";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { SideMenuProps } from "../../types/dataTypes";

const SideMenu: React.FC<SideMenuProps> = ({
  handleClickMobileDisplay,
  isMobileDisplay,
  logout,
}) => {
  return (
    <div
      className={
        !isMobileDisplay
          ? `${styles.sidebarContainer}`
          : `${styles.sidebarContainer} ${styles.active}`
      }
    >
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
          type="button"
          onClick={logout}
          style={{ marginTop: "2rem" }}
        />
      </Container>
    </div>
  );
};

export default SideMenu;
