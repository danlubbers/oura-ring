import { useContext, useEffect, useState } from "react";
// import axios from "axios";
import { GlobalContext } from "../../context/Provider";
import Container from "../Container/Container";
import HamburgerIcon from "../HamburgerIcon/HamburgerIcon";
import SideMenu from "../SideMenu/SideMenu";
import { HomeProps } from "../../types/dataTypes";

const Home: React.FC<HomeProps> = ({ logout }) => {
  const { isMobileDisplay, setIsMobileDisplay } = useContext(GlobalContext);
  const [tags, setTags] = useState<any>([]);

  useEffect(() => {
    fetch(`http://localhost:8080/tags`)
      .then((res) => res.json())
      .then((data) => setTags(data.tagData.data));

    setIsMobileDisplay(false);
  }, [setIsMobileDisplay]);

  console.log("tags", tags);

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
};

export default Home;
