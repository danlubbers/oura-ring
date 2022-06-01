import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/Provider";
import useToken from "../hooks/useToken";
import Container from "../components/Container/Container";
import HamburgerIcon from "../components/HamburgerIcon/HamburgerIcon";
import DateRenderer from "../components/DateRenderer/DateRenderer";
import Home from "../components/Home/Home";
import NavigationFooter from "../components/NavigationFooter/NavigationFooter";
import SideMenu from "../components/SideMenu/SideMenu";

function Index() {
  const { logout } = useToken();
  const {
    isMobileDisplay,
    setIsMobileDisplay,
    todaysData: {
      date,
      data: { heartRate, tags, sessions, workouts },
    },
  } = useContext(GlobalContext);

  console.log("Index data", heartRate);

  useEffect(() => {
    setIsMobileDisplay(false);
  }, [setIsMobileDisplay]);

  const handleClickMobileDisplay = () => {
    setIsMobileDisplay(!isMobileDisplay);
  };

  return (
    <>
      <div style={{ padding: "2rem 0 0 2rem" }}>
        <HamburgerIcon
          handleClickMobileDisplay={handleClickMobileDisplay}
          isMobileDisplay={isMobileDisplay}
        />
      </div>
      <DateRenderer />

      <Home date={date} heartRate={heartRate} tags={tags} />
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
