import Home from "../components/Home/Home";
import useToken from "../hooks/useToken";
import NavigationHeader from "../components/NavigationHeader/NavigationHeader";

function Index() {
  const { logout } = useToken();

  return (
    <div>
      <NavigationHeader />
      <Home logout={logout} />
    </div>
  );
}

export default Index;
