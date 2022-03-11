import styles from "./RenderUserData.module.scss";
import Container from "../Container/Container";
import HamburgerIcon from "../HamburgerIcon/HamburgerIcon";
import SideMenu from "../SideMenu/SideMenu";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";
import { RenderUserDataProps, UserProps } from "../../types/dataTypes";

const RenderUserData: React.FC<RenderUserDataProps & UserProps> = ({
  age,
  height,
  weight,
  gender,
  email,
  isImperial,
  setUnits,
  isMobileDisplay,
  handleClickMobileDisplay,
}) => {
  if (!age) return <Loading />;

  const conversionHeight = isImperial
    ? `${String(Math.round((height + Number.EPSILON) * 0.0328084 * 100) / 100)
        .replace(".", "ft ")
        .slice(0, 4)}${String(
        Math.round((height + Number.EPSILON) * 0.0328084 * 100) / 100
      ).slice(-2, -1)}in`
    : height;

  const conversionWeight = isImperial ? Math.round(weight * 2.2046) : weight;

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
            <span>{conversionHeight}</span>
            {isImperial ? <span></span> : <span>cm</span>}
          </div>
          <div>
            <span>WEIGHT:</span>
            <span>{conversionWeight}</span>
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
