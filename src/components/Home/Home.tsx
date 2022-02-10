import { useContext, useEffect } from "react";
// import styles from "./Home.module.scss";
import { GlobalContext } from "../../context/Provider";
import Container from "../Container/Container";
import HamburgerIcon from "../HamburgerIcon/HamburgerIcon";
import SideMenu from "../SideMenu/SideMenu";

function Home({ logout }: { logout: () => void }) {
  console.log("logout", logout);
  const { isMobileDisplay, setIsMobileDisplay } = useContext(GlobalContext);

  useEffect(() => {
    setIsMobileDisplay(false);
  }, [setIsMobileDisplay]);

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

      <SideMenu
        handleClickMobileDisplay={handleClickMobileDisplay}
        isMobileDisplay={isMobileDisplay}
        logout={logout}
      />
    </>
  );
}

export default Home;
