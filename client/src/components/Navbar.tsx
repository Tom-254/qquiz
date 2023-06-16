import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { HyphenWhite, Logo, LogoIconSmall, MenuIcon } from "../assets";
import { Button } from ".";

const Navbar = () => {
  const [toggleNavigation, setToggleNavigation] = useState(false);
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

  const MobileNavClicked = () => {
    setToggleNavigation((prev) => !prev);
  };

  const SetActiveNavLink = (id: number) => {
    setActive(id);
  };

  return (
    <nav className="sticky top-0 h-10 left-0 right-0 py-[30px]  flex items-center justify-between z-20">
      <Link to="/" className="ml-[20px] lg:ml-[80px]">
        <Logo className="hidden lg:block" />
        <LogoIconSmall className="lg:hidden" />
      </Link>
      <ul
        className={`absolute lg:static top-[62px] left-0 right-0 ${
          /** toggleNavigation ? "flex": "hidden" */ ""
        }  flex flex-col lg:flex-row gap-[20px] z-20 bg-white left-0 px-[20px] py-[10px] h-[calc(100vh - 86px)] lg:px-0 h-screen lg:h-fit border-t-[1px] lg:border-0`}
      >
        {navItems.map(({ id, path, name }) => (
          <Button key={id} type="navlink" active={active === id ? true : false} onClick={() => SetActiveNavLink(id)}>
            <NavLink to={path}>{name}</NavLink>
          </Button>
        ))}
      </ul>
      <div className="hidden lg:block lg:mr-[80px]">
        <Button>
          <p className="flex items-center gap-2">
            Get Started <HyphenWhite />{" "}
            <span className="font-medium"> It's free</span>{" "}
          </p>
        </Button>
      </div>
      <div className="flex items-center mr-[20px] lg:hidden">
        <Button
          type="link"
          buttonIconRight={<MenuIcon />}
          onClick={MobileNavClicked}
        ></Button>
      </div>
    </nav>
  );
};

export default Navbar;
