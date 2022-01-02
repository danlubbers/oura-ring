import * as styles from "./RenderUserData.module.scss";
import Container from "../Container/Container";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";

const RenderUserData = ({
  age,
  height,
  weight,
  gender,
  email,
  isImperial,
  setUnits,
}) => {
  if (!age) return <Loading />;

  return (
    <Container>
      <p className={styles.userProfileText}>User Profile</p>
      <div className={styles.renderUserDataContainer}>
        <div>
          <span>AGE:</span>
          <span>{age}</span>
        </div>
        <div>
          <span>HEIGHT:</span>
          <span>{height}</span>
          {isImperial ? <span></span> : <span>cm</span>}
        </div>
        <div>
          <span>WEIGHT:</span>
          <span>{weight}</span>
          {isImperial ? <span>lbs</span> : <span>kg</span>}
        </div>
        <div>
          <span>GENDER:</span>
          <span>{gender}</span>
        </div>
        <div>
          <span>EMAIL:</span>
          <span>{email}</span>
        </div>
      </div>
      <div className={styles.unitsBtnWrapper}>
        <Button
          btnAction="Imperial"
          type="text"
          onClick={() => setUnits("imperial")}
        />

        <Button
          btnAction="Metric"
          type="text"
          onClick={() => setUnits("metric")}
        />
      </div>
    </Container>
  );
};

export default RenderUserData;
