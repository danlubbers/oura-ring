import React from "react";
import Container from "../Container/Container";
import Button from "../Button/Button";

function Home({ bedroomTemp, logout }) {
  return (
    <Container>
      <h1>
        <span>Temperature: </span>
        <span>{bedroomTemp}</span>
      </h1>
      <Button btnAction="Logout" onClick={logout} />
    </Container>
  );
}

export default Home;
