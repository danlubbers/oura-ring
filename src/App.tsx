import "./App.scss";
import routes from "./routes";
import Login from "./pages/login";
import useToken from "./hooks/useToken";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return <div className="App">{routes}</div>;
}

export default App;
