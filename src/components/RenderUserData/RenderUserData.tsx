import styles from "./RenderUserData.module.scss";
import Container from "../Container/Container";
import HamburgerIcon from "../HamburgerIcon/HamburgerIcon";
import SideMenu from "../SideMenu/SideMenu";
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
  isMobileDisplay,
  handleClickMobileDisplay,
}: {
  age: number;
  height: number;
  weight: number;
  gender: string;
  email: string;
  isImperial: boolean;
  setUnits: (unit: string) => void;
  isMobileDisplay: boolean;
  handleClickMobileDisplay: () => void;
}) => {
  if (!age) return <Loading />;

  return (
    <>
      <Container isFooter={true}>
        <HamburgerIcon
          handleClickMobileDisplay={handleClickMobileDisplay}
          isMobileDisplay={isMobileDisplay}
        />
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
            type="button"
            onClick={() => setUnits("imperial")}
          />

          <Button
            btnAction="Metric"
            type="button"
            onClick={() => setUnits("metric")}
          />
        </div>
      </Container>
      <SideMenu
        handleClickMobileDisplay={handleClickMobileDisplay}
        isMobileDisplay={isMobileDisplay}
      />
    </>
  );
};

export default RenderUserData;
