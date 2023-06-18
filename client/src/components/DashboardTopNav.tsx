import { Button } from ".";
import { AddIcon, NotificationIcon, SearchIcon } from "../assets";

const DashboardTopNav = () => {
  return (
    <nav className="sticky top-0 h-fit left-0 right-0 py-[16px] z-20 flex items-center justify-between pr-[24px]">
      <div className="flex flex-col">
        <p className="text-primarytext-1000 font-bold text-[length:var(--body-text-16-sb)]">
          Hi Louis Carter,
        </p>
        <p className="text-primarytext-1000 font-bold text-[length:var(--h5-title-24)]">
          Welcome back 👋
        </p>
      </div>
      <div className="flex items-center gap-[32px]">
        <Button buttonIconLeft={<AddIcon />}>Create quiz</Button>
        <div className="flex items-center gap-[16px]">
          <div className="bg-white group flex items-center gap-[12px] h-[48px] border-[1px] rounded-[12px] border-white px-[20px] focus-within:border-primary text-secondarytext-500">
            <Button
              type="link"
              buttonIconLeft={
                <SearchIcon className="w-fit text-secondarytext-500 shrink group-focus-within:text-primary" />
              }
            />
            <input
              className="h-[90%] outline-none w-[90%] text-primarytext-900 rounded-[8px]"
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="flex items-center justify-center bg-white shadow-custom-main rounded-full h-[48px] w-[48px] p-[11px]">
            <NotificationIcon />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardTopNav;
