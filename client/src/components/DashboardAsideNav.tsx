import { Link } from "react-router-dom";
import {
  AvatarIcon,
  DashboardHomeIcon,
  InvitationsIcon,
  Logo,
  LogoIconSmall,
  LogoutIcon,
  QuizzesIcon,
} from "../assets";
import { Button } from ".";
import { useState } from "react";

type AsideNavLinkType = {
  active: boolean;
  path: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

const AsideNavLink = ({
  active,
  path,
  children,
  onClick,
}: AsideNavLinkType) => {
  return (
    <Link
      to={path}
      className={
        active
          ? "bg-primary hover:bg-primarydark px-[24px] py-[16px] font-bold text-white flex items-center gap-[16px] rounded-[12px]"
          : "bg-transparent px-[24px] py-[16px] text-secondarytext-600 font-bold hover:text-primary flex items-center gap-[16px] rounded-[12px]"
      }
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const DashboardAsideNav = () => {
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
    <aside className="bg-white flex flex-col gap-[30px] h-full max-h-[1000px] max-w-[254px] px-[24px] ">
        <Link to="/" className="px-[24px] mt-[20px]">
          <Logo className="hidden lg:block" />
          <LogoIconSmall className="lg:hidden" />
        </Link>
      <div className="flex flex-col items-center gap-[8px] px-[24px]">
        <div className="flex items-center justify-center w-[70px] h-[70px] rounded-full">
          <img
            className="rounded-full w-full"
            src={AvatarIcon}
            alt="Profile Image"
          />
        </div>
        <p className="text-primarytext-1000 font-bold text-[length:var(--h6-title-16)]">
          Louis Carter
        </p>
        <Button type="tertiary" size="small">
          Edit
        </Button>
      </div>
      <div className="flex flex-col h-full">
        <div>
          {navItems.map(({ id, path, icon, name }) => (
            <AsideNavLink
              key={id}
              active={active === id}
              path={path}
              onClick={() => AsideNavLinkClicked(id)}
            >
              {icon}
              {name}
            </AsideNavLink>
          ))}
        </div>
        <div className="mt-[65%] mb-[20px]">
          <Link
            to={"/register"}
            className={
              "bg-transparent px-[24px] py-[16px] text-secondarytext-600 font-bold hover:text-primary flex items-center gap-[16px] rounded-[12px]"
            }
          >
            <LogoutIcon /> Logout
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default DashboardAsideNav;
