import { Outlet } from "react-router-dom";
import { DashboardAsideNav, DashboardTopNav } from "../components";

const DashboardRoot = () => {
  return (
    <main className="flex bg-background h-screen">
      <div className="flex gap-[35px] w-full max-w-[1280px] mx-auto">
        <DashboardAsideNav />
        <div className=" flex w-full flex-col max-h-[1000px]">
          <DashboardTopNav />
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default DashboardRoot;
