import { useState, useEffect } from "react";
import * as styles from "./Home.module.scss";
import Container from "../Container/Container";
import HamburgerIcon from "../HamburgerIcon/HamburgerIcon";
import SideMenu from "../SideMenu/SideMenu";

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
      <Container isFooter={true}>
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
        <SideMenu
          handleClickMobileDisplay={handleClickMobileDisplay}
          isMobileDisplay={isMobileDisplay}
          logout={logout}
        />
      </div>
    </>
  );
}

export default Home;
