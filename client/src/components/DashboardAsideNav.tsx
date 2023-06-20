import { Link } from "react-router-dom";
import {
  AvatarIcon,
  DashboardHomeIcon,
  InvitationsIcon,
  Logo,
  LogoIcon,
  LogoutIcon,
  QuizzesIcon,
} from "../assets";
import { Button } from ".";
import { useState } from "react";

type AsideNavLinkType = {
  active: boolean;
  path: string;
  title: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

const AsideNavLink = ({
  active,
  path,
  title,
  children,
  onClick,
}: AsideNavLinkType) => {
  return (
    <Link
      to={path}
      className={
        active
          ? "w-fit lg:w-auto bg-primary hover:bg-primarydark px-[24px] py-[16px] font-bold text-white flex items-center justify-center lg:justify-start gap-[16px] rounded-[12px]"
          : "w-fit lg:w-auto bg-transparent px-[24px] py-[16px] text-secondarytext-600 font-bold hover:text-primary flex items-center justify-center lg:justify-start gap-[16px] rounded-[12px]"
      }
      onClick={onClick}
      title={title}
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
    <aside className="hidden md:flex bg-white md:flex-col gap-[30px] max-h-full h-[100vh]  max-w-[254px] lg:px-[24px] ">
      <Link to="/" className="px-[24px] mx-auto lg:mx-0 mt-[20px]">
        <Logo className="hidden lg:block" />
        <LogoIcon className="lg:hidden" />
      </Link>
      <div className="flex flex-col items-center gap-[8px] lg:px-[24px]">
        <Button
          type="link"
          buttonIconRight={
            <div className="flex items-center justify-center w-[60px] h-[60px] lg:w-[70px] lg:h-[70px] rounded-full">
              <img
                className="rounded-full w-full"
                src={AvatarIcon}
                alt="Profile Image"
              />
            </div>
          }
        />

        <p className="hidden lg:block text-primarytext-1000 font-bold text-[length:var(--h6-title-16)] ">
          Louis Carter
        </p>
        <div className="hidden lg:block">
          <Button type="tertiary" size="small">
            Edit
          </Button>
        </div>
      </div>
      <div className="flex-1 flex flex-col max-h-full">
        <div className="flex flex-col justify-center mx-auto lg:mx-0">
          {navItems.map(({ id, path, icon, name }) => (
            <AsideNavLink
              key={id}
              active={active === id}
              title={name}
              path={path}
              onClick={() => AsideNavLinkClicked(id)}
            >
              {icon}
              <span className="hidden lg:block">{name}</span>
            </AsideNavLink>
          ))}
        </div>
        <div className="mt-auto mb-[20px] mx-auto lg:mx-0">
          <Link
            to={"/register"}
            className={
              "w-fit lg:w-auto bg-transparent px-[24px] py-[16px] text-secondarytext-600 font-bold hover:text-primary flex items-center justify-center lg:justify-start gap-[16px] rounded-[12px]"
            }
            title="Logout"
          >
            <LogoutIcon /> <span className="hidden lg:block">Logout</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default DashboardAsideNav;
