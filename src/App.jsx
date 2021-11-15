import { useState } from "react";
import "./App.scss";
import routes from "./routes";
import Login from "./pages/login";

function App() {
  const [token, setToken] = useState(null);
  console.log(`token`, token);

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return <div className="App">{routes}</div>;
}

export default App;
