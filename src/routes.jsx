import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Index from "./pages/index";
import UserData from "./pages/userData";
import Readiness from "./pages/readiness";
import SleepData from "./pages/sleepData";
import Activity from "./pages/activity";
import BedroomData from "./pages/bedroomData";

export default (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />
    <Route path="/user-data" element={<UserData />} />
    <Route path="/readiness-data" element={<Readiness />} />
    <Route path="/sleep-data" element={<SleepData />} />
    <Route path="/activity-data" element={<Activity />} />
    <Route path="/bedroom-data" element={<BedroomData />} />
  </Routes>
);
