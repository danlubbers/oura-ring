import { useContext, useState, useEffect } from "react";
import NavigationFooter from "../components/NavigationFooter/NavigationFooter";
import RenderUserData from "../components/RenderUserData/RenderUserData";
import { GlobalContext } from "../context/Provider";

function UserData() {
  const [isImperial, setIsImperial] = useState(false);
  const { userData, isMobileDisplay, setIsMobileDisplay } =
    useContext(GlobalContext);

  useEffect(() => {
    setIsMobileDisplay(false);
  }, [setIsMobileDisplay]);

  const handleClickMobileDisplay = () => {
    setIsMobileDisplay(!isMobileDisplay);
  };

  const age = userData?.age;
  const height = isImperial
    ? `${String(
        Math.round((userData?.height + Number.EPSILON) * 0.0328084 * 100) / 100
      )
        .replace(".", "ft ")
        .slice(0, 4)}${String(
        Math.round((userData?.height + Number.EPSILON) * 0.0328084 * 100) / 100
      ).slice(-2, -1)}in`
    : userData?.height;
  const weight = isImperial
    ? Math.round(userData?.weight * 2.2046)
    : userData?.weight;
  const gender = userData?.gender;
  const email = userData?.email;

  const setUnits = (unit: string) => {
    if (unit === "imperial") {
      setIsImperial(true);
    } else {
      setIsImperial(false);
    }
  };

  return (
    <div>
      <RenderUserData
        age={age}
        height={height}
        weight={weight}
        gender={gender}
        email={email}
        isImperial={isImperial}
        setUnits={setUnits}
        isMobileDisplay={isMobileDisplay}
        handleClickMobileDisplay={handleClickMobileDisplay}
      />
      <NavigationFooter />
    </div>
  );
}

export default UserData;
