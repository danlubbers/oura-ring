import * as styles from "./RenderUserData.module.scss";
import Container from "../Container/Container";

const RenderUserData = ({ userData }) => {
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
