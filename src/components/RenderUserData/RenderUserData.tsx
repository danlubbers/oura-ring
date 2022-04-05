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
        <ul className={styles.renderUserDataContainer}>
          <li>
            <span data-testid="age">AGE: </span>
            <span data-testid="age-value">{age}</span>
          </li>
          <li title="height">
            <span data-testid="height">HEIGHT: </span>
            <span data-testid="height-value">{conversionHeight}</span>
            {isImperial ? <span></span> : <span>cm</span>}
          </li>
          <li title="weight">
            <span data-testid="weight">WEIGHT: </span>
            <span data-testid="weight-value">{conversionWeight}</span>
            {isImperial ? <span>lbs</span> : <span>kg</span>}
          </li>
          <li title="gender">
            <span data-testid="gender">GENDER: </span>
            <span data-testid="gender-value">{gender}</span>
          </li>
          <li title="email">
            <span data-testid="email">EMAIL: </span>
            <span data-testid="email-value">{email}</span>
          </li>
        </ul>
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
