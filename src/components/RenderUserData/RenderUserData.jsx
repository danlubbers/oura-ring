import React, { useEffect } from "react";
import * as styles from "./RenderUserData.module.scss";
import getOuraData from "../../utilities/getOuraData";

const RenderUserData = ({ ouraUserData, setOuraUserData }) => {
  useEffect(() => {
    const fetchData = async () => {
      const data = await getOuraData();
      setOuraUserData(data?.ouraUserData.data);
    };
    fetchData();
  }, [setOuraUserData]);
  return (
    <div className={styles.renderUserDataContainer}>
      <p>AGE: {ouraUserData?.age}</p>
      <p>HEIGHT: {ouraUserData?.height}</p>
      <p>WEIGHT: {ouraUserData?.weight}</p>
      <p>GENDER: {ouraUserData?.gender}</p>
      <p>EMAIL: {ouraUserData?.email}</p>
    </div>
  );
};

export default RenderUserData;
