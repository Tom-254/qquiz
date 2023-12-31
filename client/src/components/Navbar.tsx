import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { HyphenWhite, Logo, LogoIconSmall, MenuIcon } from "../assets";
import { Button } from "../components";

const Navbar = () => {
  const [toggleNavigation, setToggleNavigation] = useState(false);
  const [active, setActive] = useState(1);

  const navigate = useNavigate();

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

  const OnClickRedirect = (path: string) => {
    navigate(path);
  };

  const NavButtonClicked = (id: number, path: string) => {
    setToggleNavigation(false)
    setActive(id);
    navigate(path);
  };

  return (
    <nav className="sticky top-0 h-fit left-0 right-0 py-[16px] z-20 bg-white">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between z-20 bg-white">
        <Link to="/" className="ml-[20px] md:ml-[50px] lg:ml-[80px]">
          <Logo className="hidden lg:block" />
          <LogoIconSmall className="lg:hidden" />
        </Link>
        <div
          className={`bg-white absolute lg:static top-[65px] left-0 right-0 ${
            toggleNavigation ? "flex" : "hidden"
          }  flex-col lg:flex lg:flex-row gap-[20px] z-20 bg-white px-[20px] py-[10px] h-[calc(100vh-84px)] lg:px-0 lg:h-fit border-t-[1px] lg:border-0`}
        >
          <ul
            className={`flex flex-col lg:flex lg:flex-row gap-[20px] z-20 bg-white lg:px-0 lg:h-fit `}
          >
            {navItems.map(({ id, path, name }) => (
              <Button
                key={id}
                type="navlink"
                active={active === id ? true : false}
                onClick={() => NavButtonClicked(id, path)}
              >
                {name}
              </Button>
            ))}
          </ul>
          <div className="flex flex-col gap-[20px] lg:hidden mt-auto">
            <Link
              to={"/login"}
              className="hover:text-primary text-primarytext-900 font-bold"
            >
              Login
            </Link>
            <Button onClick={() => OnClickRedirect("/register")}>
              <p className="flex items-center gap-2">
                Get Started <HyphenWhite />{" "}
                <span className="font-medium"> It's free</span>{" "}
              </p>
            </Button>
          </div>
        </div>
        <div className="hidden lg:flex lg:items-center lg:gap-[20px] lg:mr-[80px]">
          <Link
            to={"/login"}
            className="hover:text-primary text-primarytext-900 font-bold"
          >
            Login
          </Link>
          <Button onClick={() => OnClickRedirect("/register")}>
            <p className="flex items-center gap-2">
              Get Started <HyphenWhite />{" "}
              <span className="font-medium"> It's free</span>{" "}
            </p>
          </Button>
        </div>
        <div className="flex items-center mr-[20px] md:mr-[50px] lg:hidden">
          <Button
            type="link"
            buttonIconRight={<MenuIcon />}
            onClick={MobileNavClicked}
          ></Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
