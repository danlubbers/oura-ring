import React, { useContext, useState } from "react";
import RenderUserData from "../components/RenderUserData/RenderUserData";
import { GlobalContext } from "../context/Provider";

function UserData() {
  const [isImperial, setIsImperial] = useState(false);
  const { ouraData } = useContext(GlobalContext);
  const userData = ouraData?.ouraUserData?.data;

  const age = userData?.age;
  const height = isImperial
    ? Math.round((userData?.height + Number.EPSILON) * 0.0328084 * 100) / 100
    : userData?.height;
  const weight = isImperial
    ? Math.round(userData?.weight * 2.2046)
    : userData?.weight;
  const gender = userData?.gender;
  const email = userData?.email;

  const setUnits = (unit) => {
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
      />
    </div>
  );
}

export default UserData;
