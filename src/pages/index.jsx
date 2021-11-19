import Home from "../components/Home/Home";
import useToken from "../hooks/useToken";

function Index() {
  const { logout } = useToken();

  return (
    <div>
      <Home logout={logout} />
    </div>
  );
}

export default Index;
