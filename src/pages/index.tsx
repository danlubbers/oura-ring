import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/Provider";
import useToken from "../hooks/useToken";
import HamburgerIcon from "../components/HamburgerIcon/HamburgerIcon";
import DateRenderer from "../components/DateRenderer/DateRenderer";
import RenderTagData from "../components/RenderTagData/RenderTagData";
import RenderSessionsData from "../components/RenderSessionsData/RenderSessionsData";
import NavigationFooter from "../components/NavigationFooter/NavigationFooter";
import SideMenu from "../components/SideMenu/SideMenu";

function Index() {
  const { logout } = useToken();
  const { isMobileDisplay, setIsMobileDisplay } = useContext(GlobalContext);

  useEffect(() => {
    setIsMobileDisplay(false);
  }, [setIsMobileDisplay]);

  const handleClickMobileDisplay = () => {
    setIsMobileDisplay(!isMobileDisplay);
  };

  return (
    <>
      <div style={{ margin: "2rem 0 0 2rem" }}>
        <HamburgerIcon
          handleClickMobileDisplay={handleClickMobileDisplay}
          isMobileDisplay={isMobileDisplay}
        />
      </div>
      <DateRenderer />

      <RenderTagData />
      <RenderSessionsData />

      <NavigationFooter />
      <SideMenu
        handleClickMobileDisplay={handleClickMobileDisplay}
        isMobileDisplay={isMobileDisplay}
        logout={logout}
      />
    </>
  );
}

export default Index;
