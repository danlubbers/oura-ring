import Home from "../components/Home/Home";
import useToken from "../hooks/useToken";
import NavigationHeader from "../components/NavigationFooter/NavigationFooter";

function Index() {
  const { logout } = useToken();

  return (
    <div>
      <Home logout={logout} />
      <NavigationHeader />
    </div>
  );
}

export default Index;
