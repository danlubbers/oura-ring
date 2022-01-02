import { useState, useEffect } from "react";
import * as styles from "./Home.module.scss";
import Container from "../Container/Container";
import HamburgerIcon from "../HamburgerIcon/HamburgerIcon";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

function Home({ logout }) {
  const [isMobileDisplay, setIsMobileDisplay] = useState(false);

  useEffect(() => {
    setIsMobileDisplay(false);
  }, []);

  const handleClickMobileDisplay = () => {
    setIsMobileDisplay(!isMobileDisplay);
  };

  return (
    <>
      <Container>
        <HamburgerIcon
          handleClickMobileDisplay={handleClickMobileDisplay}
          isMobileDisplay={isMobileDisplay}
        />
        <h1>HOME</h1>
      </Container>
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

          <Button
            btnAction="Logout"
            onClick={logout}
            style={{ marginTop: "2rem" }}
          />
        </Container>
      </div>
    </>
  );
}

export default Home;
