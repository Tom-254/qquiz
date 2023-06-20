import { Button } from ".";
import { AddIcon, AvatarIcon, NotificationIcon, SearchIcon } from "../assets";

const DashboardTopNav = () => {
  return (
    <nav className="sticky top-0 h-fit left-0 right-0 py-[16px] z-20 flex items-center justify-between px-[10px] sm:px-[24px] bg-background">
      <div className="flex items-center gap-[8px]">
        <div className="md:hidden">
          <Button
            type="link"
            buttonIconRight={
              <div className="flex items-center justify-center w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] rounded-full">
                <img
                  className="rounded-full w-full"
                  src={AvatarIcon}
                  alt="Profile Image"
                />
              </div>
            }
          />
        </div>
        <div className="flex flex-col">
          <p className="text-primarytext-1000 font-bold text-[14px] md:text-[length:var(--body-text-16-sb)]">
            Hi Louis Carter,
          </p>
          <p className="text-primarytext-1000 font-bold text-[18px] md:text-[length:var(--h5-title-24)]">
            Welcome back 👋
          </p>
        </div>
      </div>
      <div className="flex items-center gap-[32px]">
        <div className="hidden md:block"><Button buttonIconLeft={<AddIcon />}>Create quiz</Button></div>
        <div className="flex items-center gap-[16px]">
          <div className="hidden bg-white group md:flex items-center gap-[12px] h-[48px] border-[1px] rounded-[12px] border-white px-[20px] focus-within:border-primary text-secondarytext-500">
            <Button
              type="link"
              buttonIconLeft={
                <SearchIcon className="w-fit text-secondarytext-500 shrink group-focus-within:text-primary" />
              }
            />
            <input
              className="hidden lg:block h-[90%] outline-none w-[90%] text-primarytext-900 rounded-[8px]"
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="flex items-center justify-center bg-white shadow-custom-main rounded-full h-[48px] w-[48px] p-[11px]">
            <Button type="link">
              <NotificationIcon />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardTopNav;
