import { Link, useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  AvatarIcon,
  DashboardHomeIcon,
  ImagePlaceHolder,
  InvitationsIcon,
  Logo,
  LogoIcon,
  LogoutIcon,
  QuizzesIcon,
} from "../assets";
import { Button } from ".";
import { useEffect, useState } from "react";
import CustomDialog from "./CustomDialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLogoutMutation } from "../api/api";

type Inputs = {
  fullName: string;
  email: string;
};

const schema = yup.object().shape({
  fullName: yup.string().required("This field is required"),
  email: yup
    .string()
    .required("This field is required")
    .email("Please enter a valid email address"),
});

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
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);


  const { pathname } = useLocation();

  const [logout, { isLoading, isSuccess }] = useLogoutMutation();

  const navigate = useNavigate()


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

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

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeProfileModal = () => {
    setIsOpenProfile(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const openProfileModal = () => {
    setIsOpenProfile(true);
  };

  const AsideNavLinkClicked = (id: number) => {
    setActive(id);
  };

  const onSubmit: SubmitHandler<Inputs> = (data: object) => {
    console.log(data);
  };

  const logoutUser = async() => {
    await logout("none");
    if (isSuccess) navigate("/login");
  };

  const location = pathname.split("/").pop();

  useEffect(() => {
    if (location === "dashboard") {
      setActive(1);
    } else if (location === "quizzes") {
      setActive(2);
    } else if (location === "invitations") {
      setActive(3);
    }
  }, [location]);

  return (
    <>
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
            onClick={openProfileModal}
          />

          <p className="hidden lg:block text-primarytext-1000 font-bold text-[length:var(--h6-title-16)] ">
            Louis Carter
          </p>
          <div className="hidden lg:block">
            <Button type="tertiary" size="small" onClick={openModal}>
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
              to={"#"}
              className={
                "w-fit lg:w-auto bg-transparent px-[24px] py-[16px] text-secondarytext-600 font-bold hover:text-primary flex items-center justify-center lg:justify-start gap-[16px] rounded-[12px]"
              }
              title="Logout"
              onClick={() => logoutUser()}
            >
              <LogoutIcon /> <span className="hidden lg:block">Logout</span>
            </Link>
          </div>
        </div>
      </aside>
      <CustomDialog
        isOpen={isOpen}
        title={"Edit Profile Details"}
        closeModal={closeModal}
      >
        <form
          className="flex flex-col py-[24px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-[24px] px-[24px] sm:flex-row sm:justify-between sm:items-center sm:w-[70%] sm:mx-auto">
            <div className="w-[88px] h-[80px]">
              <img src={ImagePlaceHolder} alt="Person Image" />
            </div>
            <div className="flex flex-row items-center gap-[16px]">
              <Button which="button" type="green" size="small">
                Update
              </Button>
              <Button which="button" type="red" size="small">
                Delete
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-[24px] p-[24px] sm:w-[70%] mx-auto">
            <div className="flex flex-col gap-[8px]">
              <label
                htmlFor="fullName"
                className="text-primarytext-900 font-bold text-[length:var(--button-text-15-b)]"
              >
                Full name*
              </label>
              <div className="group flex items-center gap-[12px] border-[1px] rounded-[12px] focus-within:border-primary text-secondarytext-500">
                <input
                  className=" outline-none w-full text-primarytext-900 rounded-[8px] form-input focus:border-primary focus:border-[1px] focus:outline-none focus:shadow-none h-full"
                  placeholder="Enter your full name here e.g Joh Doe"
                  type="text"
                  id="fullName"
                  {...register("fullName")}
                />
              </div>
              {errors.fullName && (
                <p
                  role="alert"
                  className="text-primaryred font-bold text-[length:var(--body-text-13-r)]"
                >
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-[8px]">
              <label
                htmlFor="fullName"
                className="text-primarytext-900 font-bold text-[length:var(--button-text-15-b)]"
              >
                Email Address*
              </label>
              <div className="group flex items-center gap-[12px] border-[1px] rounded-[12px] focus-within:border-primary text-secondarytext-500">
                <input
                  className=" outline-none w-full text-primarytext-900 rounded-[8px] form-input focus:border-primary focus:border-[1px] focus:outline-none focus:shadow-none h-full"
                  placeholder="Enter your full name here e.g Joh Doe"
                  id="email"
                  type="email"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p
                  role="alert"
                  className="text-primaryred font-bold text-[length:var(--body-text-13-r)]"
                >
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="px-[24px] pt-[16px] pb-[20px] w-full flex gap-[24px] flex-col-reverse sm:flex-row sm:items-center md:justify-between border-t-[1px] border-light">
            <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-[12px] sm:gap-[24px] sm:ml-auto">
              <Button which="button" type="tertiary" onClick={closeModal}>
                Cancel
              </Button>
              <Button which="submit">Save changes</Button>
            </div>
          </div>
        </form>
      </CustomDialog>
      <CustomDialog
        isOpen={isOpenProfile}
        title={"Profile Details"}
        closeModal={closeProfileModal}
      >
        <div className="flex flex-col justify-center items-center sm:mx-auto my-[100px] sm:w-[70%] text-center gap-[20px]">
          <div className="flex items-center justify-center w-[100px] h-[100px] rounded-full">
            <img
              className="rounded-full w-full"
              src={AvatarIcon}
              alt="Profile Image"
            />
          </div>
          <div className="flex flex-col gap-[5px]">
          <p className="text-primarytext-1000 font-extrabold text-[length:var(--h6-title-16)] ">
            Louis Carter
          </p>
            <p  className=" text-secondarytext-600 font-medium text-[length:var(--button-text-15-b)] ">
              louiscarte@gmail.com
            </p>
          </div>
        </div>
      </CustomDialog>
    </>
  );
};

export default DashboardAsideNav;
