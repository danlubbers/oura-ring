import styles from "./NavigationFooter.module.scss";
import { Link, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaThermometerThreeQuarters } from "react-icons/fa";
import { RiHealthBookFill } from "react-icons/ri";
import { GiNightSleep } from "react-icons/gi";
import { GoFlame } from "react-icons/go";

const NavigationHeader = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.navigationContainer}>
      <Link className={styles.link} to="/">
        <AiFillHome size={35} color={pathname === "/" ? "#66becc" : ""} />
      </Link>
      <Link className={styles.link} to="/readiness-data">
        <RiHealthBookFill
          size={35}
          color={pathname === "/readiness-data" ? "#66becc" : ""}
        />
      </Link>
      <Link className={styles.link} to="/sleep-data">
        <GiNightSleep
          size={35}
          color={pathname === "/sleep-data" ? "#66becc" : ""}
        />
      </Link>
      <Link className={styles.link} to="/activity-data">
        <GoFlame
          size={35}
          color={pathname === "/activity-data" ? "#66becc" : ""}
        />
      </Link>
      <Link className={styles.link} to="/bedroom-data">
        <FaThermometerThreeQuarters
          size={35}
          color={pathname === "/bedroom-data" ? "#66becc" : ""}
        />
      </Link>
    </div>
  );
};

export default NavigationHeader;
