import { Outlet } from "react-router-dom";
import { DashboardAsideNav, DashboardTopNav } from "../components";

const DashboardRoot = () => {
  return (
    <main>
      <DashboardTopNav />
      <Outlet />
      <DashboardAsideNav />
    </main>
  );
};

export default DashboardRoot;
