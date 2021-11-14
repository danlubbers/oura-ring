import "./App.scss";
import Login from "./pages/login";
import UserData from "./pages/userData";
import SleepData from "./pages/sleepData";

function App() {
  return (
    <div className="App">
      <Login />
      <UserData />

      <SleepData />
    </div>
  );
}

export default App;
