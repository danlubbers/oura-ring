import React from "react";
import * as styles from "./Home.module.scss";
import { Link } from "react-router-dom";
import Container from "../Container/Container";
import Button from "../Button/Button";

function Home({ logout }) {
  return (
    <Container>
      <div className={styles.linkWrapper}>
        <Link className={styles.link} to="user-data">
          User Profile
        </Link>
        <Link className={styles.link} to="readiness-data">
          User Readiness
        </Link>
        <Link className={styles.link} to="sleep-data">
          User Sleep
        </Link>
      </div>
      <Button btnAction="Logout" onClick={logout} />
    </Container>
  );
}

export default Home;
