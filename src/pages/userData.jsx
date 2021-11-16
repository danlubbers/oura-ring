import React, { useContext } from "react";
import RenderUserData from "../components/RenderUserData/RenderUserData";
import { GlobalContext } from "../context/Provider";

function UserData() {
  const { ouraData } = useContext(GlobalContext);
  const userData = ouraData?.ouraUserData?.data;
  return (
    <div>
      <RenderUserData userData={userData} />
    </div>
  );
}

export default UserData;
