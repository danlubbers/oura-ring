import Container from "../Container/Container";
import Button from "../Button/Button";

function Home({ logout }) {
  return (
    <Container>
      <Button btnAction="Logout" onClick={logout} />
    </Container>
  );
}

export default Home;
