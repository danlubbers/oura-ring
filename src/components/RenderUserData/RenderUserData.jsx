import { useContext } from "react";
import * as styles from "./RenderUserData.module.scss";
import { GlobalContext } from "../../context/Provider";
import Container from "../Container/Container";

const RenderUserData = () => {
  const { ouraData } = useContext(GlobalContext);
  // console.log(`RENDER ouraData`, ouraData?.ouraUserData?.data);
  const userData = ouraData?.ouraUserData?.data;
  return (
    <Container>
      <div className={styles.renderUserDataContainer}>
        <p>AGE: {userData?.age}</p>
        <p>HEIGHT: {userData?.height}</p>
        <p>WEIGHT: {userData?.weight}</p>
        <p>GENDER: {userData?.gender}</p>
        <p>EMAIL: {userData?.email}</p>
      </div>
    </Container>
  );
};

export default RenderUserData;
