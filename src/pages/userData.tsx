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
  const height = userData?.height;
  const weight = userData?.weight;
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
