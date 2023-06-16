import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from ".";
import { BackToTopArrow, Logo, LogoIconSmall } from "../assets";

const Footer = () => {
  const [active, setActive] = useState(1);

  const navItems = [
    {
      id: 1,
      path: "/",
      name: "Home",
    },
    {
      id: 2,
      path: "/",
      name: "Features",
    },
    {
      id: 3,
      path: "/",
      name: "About us",
    },
    {
      id: 4,
      path: "/",
      name: "How it works",
    },
  ];

  const SetActiveNavLink = (id: number) => {
    setActive(id);
  };
  return (
    <footer className="flex flex-col gap-[20px] sticky top-0 h-fit left-0 right-0  py-[30px]">
      <div className="max-w-[1280px] w-full mx-auto flex flex-col md:flex-row md:items-center justify-between gap-[20px] md:gap-[15px] z-10">
        <Link
          to="/"
          className="flex justify-between ml-[20px] md:ml-[50px] lg:ml-[80px]"
        >
          <Logo className="hidden md:block" />
          <LogoIconSmall className="md:hidden" />
          <div className=" md:hidden lg:ml-[55px] mr-[20px] md:mr-[50px] lg:mr-[80px]">
            <Button size="xsmedium" buttonIconRight={<BackToTopArrow />}>
              <p className="hidden sm:block">Back to top</p>
            </Button>
          </div>
        </Link>

        <ul
          className={`flex flex-col md:flex md:flex-row gap-[20px] z-10 bg-white md:px-0 md:h-fit px-[20px] `}
        >
          {navItems.map(({ id, path, name }) => (
            <Button
              key={id}
              type="navlink"
              active={active === id ? true : false}
              onClick={() => SetActiveNavLink(id)}
            >
              <NavLink to={path}>{name}</NavLink>
            </Button>
          ))}
        </ul>
        <div className=" hidden md:block lg:ml-[55px] md:mr-[50px] lg:mr-[80px]">
          <Button buttonIconRight={<BackToTopArrow />}>Back to top</Button>
        </div>
      </div>
      <div className="max-w-[1280px] w-full flex mx-auto ">
        <div className="w-full border-t-[1px] mx-[20px] md:mx-[50px] lg:mx-[80px]"></div>
      </div>
      <div className="max-w-[1280px] w-full flex mx-auto ">
        <div className="flex flex-col gap-[8px] sm:justify-between w-full mx-[20px] md:mx-[50px] lg:mx-[80px]">
            <p><strong>&copy; {new Date().getFullYear()} - Qquiz </strong> all rights reserved</p>
            <div className="flex gap-[20px]">
              <p>Terms & Conditions</p>
              <p>Privacy</p>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
