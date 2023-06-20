import { Outlet } from "react-router-dom";
import { DashboardAsideNav, DashboardFooter, DashboardTopNav } from "../components";

const DashboardRoot = () => {
  return (
    <main className="flex bg-background h-screen">
      <div className="flex w-full max-w-[1400px] mx-auto">
        <DashboardAsideNav />
        <div className="relative flex w-full flex-col max-h-[1000px] h-full gap-[56px]">
          <DashboardTopNav />
          <Outlet />
          <DashboardFooter />
        </div>
      </div>
    </main>
  );
};

export default DashboardRoot;
