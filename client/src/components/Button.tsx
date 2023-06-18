import React from "react";

interface Props {
  size?: "small"| "xsmall" | "xsmedium" | "medium" | "large" | "icon";
  type?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "link"
    | "linkunderlined"
    | "navlinkdashboard"
    | "navlink";
  full?: boolean;
  active?: boolean;
  which?: "button" | "reset" | "submit",
  buttonIconLeft?: React.ReactNode;
  buttonIconRight?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children?: React.ReactNode;
}

const Button = ({
  size = "medium",
  type = "primary",
  full = false,
  active = false,
  which,
  buttonIconLeft,
  buttonIconRight,
  onClick,
  children,
}: Props) => {
  type StringObject = Record<string, string>;

  const ButtonType: StringObject = {
    primary:
      "border-[1px] border-primary hover:border-primarydark bg-primary hover:bg-primarydark hover:text- text-white font-bold rounded-[--border-radius-large]",
    secondary:
      "border-[1px] border-primary  hover:bg-primary text-primary hover:text-white font-bold rounded-full",
    tertiary:
      "border-[1px] border-border hover:border-borderdark hover:bg-tertiaryhover hover:text-primarytext-800 text-secondarytext-600 font-bold rounded-[--border-radius-large]",
    dark: "border-[1px] border-primarydark hover:border-primarydark bg-primarydark hover:bg-transparent text-primaryBackgroundWhite hover:text-primarydark font-bold rounded-full",
    link: "text-primary hover:text-primarydark font-bold",
    linkunderlined: "text-primary hover:text-primarydark font-bold underline underline-offset-4",
    navlink: `hover:text-primary text-primarytext-900 font-bold ${active ? "text-primarytext-primary" : ""}`,
  };
  const ButtonSize: StringObject = {
    small: `flex flex-row items-center justify-center px-[12px] h-[27px] text-[length:var(--button-text-13-b)] normal-case ${
      full ? "w-full" : ""
    }`,
    icon: `flex flex-row items-center justify-center px-[12px] h-[40px] text-[length:var(--button-text-13-b)] normal-case ${
      full ? "w-full" : ""
    }`,
    xsmall: `flex flex-row items-center justify-center px-[12px] h-[24px] text-[length:var(--button-text-13-b)] normal-case ${
      full ? "w-full" : ""
    }`,
    xsmedium: type.toLowerCase().includes("link".toLowerCase())
    ? `group flex flex-col w-fit items-center p-0 text-[length:var(${
        type === "navlink" ? "--body-text-bold-16" : "--button-text-15-b"
      })] justify-center normal-case`
    : `flex flex-col items-center justify-center px-[24px] sm:px[32px]  h-[40px] sm:h-[48px] text-[length:var(--button-text-15-b)] normal-case ${
        full ? "w-full" : ""
      }`,
    medium: type.toLowerCase().includes("link".toLowerCase())
      ? `group flex flex-col w-fit items-center p-0 text-[length:var(${
          type === "navlink" ? "--body-text-bold-16" : "--button-text-15-b"
        })] justify-center normal-case`
      : `flex flex-col items-center justify-center px-[32px] h-[48px] text-[length:var(--button-text-15-b)] normal-case ${
          full ? "w-full" : ""
        }`,
    large: type.toLowerCase().includes("link".toLowerCase())
    ? `group flex flex-col w-fit items-center p-0 text-[length:var(${
        type === "navlink" ? "--body-text-bold-16" : "--button-text-15-b"
      })] justify-center normal-case`
    : `flex flex-col items-center justify-center px-[32px] h-[50px] text-[length:var(--button-text-15-b)] normal-case ${
        full ? "w-full" : ""
      }`,
  };
  const classNames = ButtonType[type] + " " + ButtonSize[size];
  return (
    <button type={which} className={classNames} onClick={onClick}>
      <div className="flex items-center gap-[8px]">
        {buttonIconLeft}
        {children}
        {buttonIconRight}
      </div>
      {type === "navlink" && (
        <div
          className={`${active ? "bg-current" : "bg-transparent"} h-[2px] group-hover:bg-current w-[60%] mr-auto lg:mx-auto rounded-full -mt-[2px]`}
        ></div>
      )}
    </button>
  );
};

export default Button;
