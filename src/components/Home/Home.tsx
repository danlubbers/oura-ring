import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../../context/Provider";
import Container from "../Container/Container";
import HamburgerIcon from "../HamburgerIcon/HamburgerIcon";
import SideMenu from "../SideMenu/SideMenu";
import { HomeProps } from "../../types/dataTypes";

interface tagProps {
  day: String;
  tags: String[];
  text: String | null;
  timestamp: String;
}

const Home: React.FC<HomeProps> = ({ logout }) => {
  const { isMobileDisplay, setIsMobileDisplay } = useContext(GlobalContext);
  const [tags, setTags] = useState<tagProps>();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/tags`);
        setTags(data.tagData.data);
      } catch (error) {
        console.error(`Error`, error);
      }
    })();

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
