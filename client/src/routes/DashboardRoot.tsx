import { Outlet } from "react-router-dom";
import { DashboardAsideNav, DashboardFooter, DashboardTopNav } from "../components";

const DashboardRoot = () => {
  return (
    <main className="relative bg-background h-screen">
      <div className="flex w-full bg-background max-w-[1400px] mx-auto">
        <DashboardAsideNav />
        <div className="bg-background flex w-full h-full flex-col gap-[5px]">
          <DashboardTopNav />
          <Outlet />
          <DashboardFooter />
        </div>
      </div>
    </main>
  );
};

export default DashboardRoot;
