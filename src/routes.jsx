import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Index from "./pages/index";
import UserData from "./pages/userData";
import SleepData from "./pages/sleepData";

export default (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />
    <Route path="/user-data" element={<UserData />} />
    <Route path="/sleep-data" element={<SleepData />} />
  </Routes>
);
