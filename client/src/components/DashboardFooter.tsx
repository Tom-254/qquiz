import { useState } from "react";
import { Button } from ".";
import { AddIcon, AvatarIcon, DashboardHomeIcon, InvitationsIcon, NotificationIcon, QuizzesIcon, SearchIcon } from "../assets";
import { Link } from "react-router-dom";

type BottomNavLinkType = {
  active: boolean;
  path: string;
  title: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

const BottomNavLink = ({
  active,
  path,
  title,
  children,
  onClick,
}: BottomNavLinkType) => {
  return (
    <Link
      to={path}
      className={
        active
          ? "w-fit lg:w-auto bg-primary hover:bg-primarydark font-bold text-white flex items-center justify-center lg:justify-start gap-[16px] rounded-[12px] px-[10px] py-[10px]"
          : "w-fit lg:w-auto bg-transparent text-secondarytext-600 font-bold hover:text-primary flex items-center justify-center lg:justify-start gap-[16px] rounded-[12px] px-[10px] py-[5px]"
      }
      onClick={onClick}
      title={title}
    >
      {children}
    </Link>
  );
};


const DashboardFooter = () => {
  const [active, setActive] = useState(1);


  const navItems = [
    {
      id: 1,
      path: "/dashboard",
      icon: <DashboardHomeIcon />,
      name: "Dashboard",
    },
    {
      id: 2,
      path: "/dashboard/quizzes",
      icon: <QuizzesIcon />,
      name: "Quizzes",
    },
    {
      id: 3,
      path: "/dashboard/invitations",
      icon: <InvitationsIcon />,
      name: "Invitations",
    },
  ];

  const AsideNavLinkClicked = (id: number) => {
    setActive(id);
  };


  return (
    <footer className="md:hidden absolute bottom-0 h-fit left-0 right-0 py-[16px] z-20 flex items-center justify-between px-[10px] md:px-[24px]">
      <div className="flex items-center justify-between gap-[4px] bg-white max-[300px]:w-[100%] w-[90%] sm:w-[50%] mx-auto rounded-[15px] max-[300px]:px-[10px] px-[20px] py-[10px] relative">
        <BottomNavLink path="/dashboard" title={"Dashboard"} active={active === 1} onClick={() => AsideNavLinkClicked(1)}>
          <DashboardHomeIcon className={"w-[22px] h-[22px]"} />
        </BottomNavLink>
        <BottomNavLink  path="/dashboard/quizzes" title={"Dashboard"} active={active === 2} onClick={() => AsideNavLinkClicked(2)}>
          <QuizzesIcon className={"w-[22px] h-[22px]"} />
        </BottomNavLink>
        <a className={"bg-primarydark  w-[55px] h-[55px] rounded-full p-[10px] flex items-center justify-center text-white "}>
          <AddIcon />
        </a>
        <BottomNavLink path="/dashboard/invitations" title={"Dashboard"} active={active === 3} onClick={() => AsideNavLinkClicked(3)}>
          <InvitationsIcon className={"w-[22px] h-[22px]"} />
        </BottomNavLink>
        <BottomNavLink path="#" title={"Dashboard"} active={active === 4} onClick={() => AsideNavLinkClicked(4)}>
          <SearchIcon className={"w-[22px] h-[22px]"} />
        </BottomNavLink>
      </div>
    </footer>
  );
};

export default DashboardFooter;