import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import UserData from "./pages/userData";
import SleepData from "./pages/sleepData";

export default (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/user-data" element={<UserData />} />
    <Route path="/sleep-data" element={<SleepData />} />
  </Routes>
);
