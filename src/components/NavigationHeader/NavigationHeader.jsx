import React from "react";
import * as styles from "./NavigationHeader.module.scss";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { GiNightSleep } from "react-icons/gi";
import { RiHealthBookFill } from "react-icons/ri";

const NavigationHeader = () => {
  return (
    <div className={styles.navigationContainer}>
      <Link className={styles.link} to="/">
        <AiFillHome size={35} />
      </Link>
      <Link className={styles.link} to="/user-data">
        <FaUser size={35} />
      </Link>
      <Link className={styles.link} to="/readiness-data">
        <RiHealthBookFill size={35} />
      </Link>
      <Link className={styles.link} to="/sleep-data">
        <GiNightSleep size={35} />
      </Link>
    </div>
  );
};

export default NavigationHeader;
