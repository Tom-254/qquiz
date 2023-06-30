import { Link, useNavigate } from "react-router-dom";
import {
  EmailIcon,
  FullNameIcon,
  GoogleGLogo,
  Logo,
  LogoIconSmall,
  LongRightArrow,
  PasswordIcon,
} from "../assets";
import { Button, Loader } from "../components";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignupMutation } from "../api/api";
import { useAppDispatch } from "../app/hooks";
import {
  setEmailValue,
  setIdValue,
  setNameValue,
  setProfileImageValue,
} from "../features/userSlice";
import { useState } from "react";

type Inputs = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type DataInputs = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type ErrorInputs = {
  status: number;
  data: string;
};

const schema = yup.object().shape({
  fullName: yup.string().required("This field is required"),
  email: yup
    .string()
    .required("This field is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .defined()
    .test(
      "password",
      "Password must not contain at least one uppercase letter, one lowercase letter, and one number",
      (value) => {
        return !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value);
      }
    )
    .required("This field is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("This field is required"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const [signupErrors, setSignupErrors] = useState("");

  const navigate = useNavigate();

  const [signup, { isLoading }] = useSignupMutation();

  const dispatch: any = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = async (data: object) => {
    setSignupErrors("");
    const { fullName, email, password } = data as DataInputs;
    console.log(fullName, email, password);
    const response = await signup({
      full_name: fullName,
      email: email,
      password,
    });
    if ("error" in response) {
      const { status, data } = response.error as ErrorInputs;
      setSignupErrors(data);
      return;
    }
    setSignupErrors("");
    navigate("/login", {replace: true});
  };

  const OnClickRedirect = (path: string) => {
    navigate(path);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main className="bg-white flex flex-col justify-center">
          <section className="max-w-[1280px] flex-1 px-[10px] w-full h-full mx-auto flex items-center justify-content">
            <div className="max-w-[564px] mx-auto my-[128px] py-[52px] px-[24px] md:px-[48px] flex flex-col gap-[32px] border-radius rounded-[24px] w-full shadow-custom-white ">
              <Link to="/" className="">
                <Logo className="hidden lg:block" />
                <LogoIconSmall className="lg:hidden" />
              </Link>
              <div className="flex flex-col gap-[8px]">
                <p className="text-primarytext-1000 font-bold text-[length:var(--h4-title-32-sb)]">
                  Hi Welcome to <span className="text-primary">Qquizz!</span>
                </p>
                <p className="text-secondarytext-600 font-semibold text-[length:var(--body-text-sb-14)]">
                  Join us and enjoy creating custom quizzes on any topic quickly
                  and inviting others to take part in the quizzes.
                </p>
              </div>
              <div className="flex flex-col gap-[20px]">
                <Button
                  size="large"
                  full={true}
                  type="tertiary"
                  buttonIconLeft={<GoogleGLogo />}
                >
                  Sign up with Google
                </Button>
                <div className="flex items-center gap-[16px] ">
                  <div className="w-full shrink border-t-[1px] border-border rounded-full" />
                  <p className="w-full whitespace-nowrap text-secondarytext-600 font-semibold text-[length:var(--body-text-sb-14)]">
                    or Sign up with Email
                  </p>
                  <div className="w-full shrink border-t-[1px] border-border rounded-full" />
                </div>
              </div>
              <form
                className="flex flex-col gap-[24px]"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-[8px]">
                  <label
                    htmlFor="fullName"
                    className="text-primarytext-900 font-bold text-[length:var(--button-text-15-b)]"
                  >
                    Full Name*
                  </label>
                  <div className="group flex items-center gap-[12px] h-[52px] border-[1px] rounded-[12px] px-[20px] focus-within:border-primary text-secondarytext-500">
                    <FullNameIcon className="w-fit shrink group-focus-within:text-primary" />
                    <input
                      className="h-[90%] outline-none w-[90%] text-primarytext-900 rounded-[8px] "
                      type="text"
                      placeholder="Full name e.g. John Doe"
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
                    htmlFor="email"
                    className="text-primarytext-900 font-bold text-[length:var(--button-text-15-b)]"
                  >
                    Email Address*
                  </label>
                  <div className="group flex items-center gap-[12px] h-[52px] border-[1px] rounded-[12px] px-[20px] focus-within:border-primary text-secondarytext-500">
                    <EmailIcon className="w-fit shrink group-focus-within:text-primary" />
                    <input
                      className="h-[90%] outline-none w-[90%] text-primarytext-900 rounded-[8px]"
                      type="email"
                      placeholder="Email e.g. john@gmail.com"
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        validate: {
                          maxLength: (v) =>
                            v.length <= 50 ||
                            "The email should have at most 50 characters",
                          matchPattern: (v) =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                              v
                            ) || "Email address must be a valid address",
                        },
                      })}
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
                <div className="flex flex-col gap-[8px]">
                  <label
                    htmlFor="password"
                    className="text-primarytext-900 font-bold text-[length:var(--button-text-15-b)]"
                  >
                    Password*
                  </label>
                  <div className="group flex items-center gap-[12px] h-[52px] border-[1px] rounded-[12px] px-[20px] focus-within:border-primary text-secondarytext-500">
                    <PasswordIcon className="w-fit shrink group-focus-within:text-primary" />
                    <input
                      className="h-[90%] outline-none w-[90%] text-primarytext-900 rounded-[8px]"
                      type="password"
                      placeholder="Enter password"
                      id="password"
                      {...register("password")}
                    />
                  </div>
                  {errors.password && (
                    <p
                      role="alert"
                      className="text-primaryred font-bold text-[length:var(--body-text-13-r)]"
                    >
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-[8px] mb-[8px]">
                  <label
                    htmlFor="confirmPassword"
                    className="text-primarytext-900 font-bold text-[length:var(--button-text-15-b)]"
                  >
                    Confirm Password*
                  </label>
                  <div className="group flex items-center gap-[12px] h-[52px] border-[1px] rounded-[12px] px-[20px] focus-within:border-primary text-secondarytext-500">
                    <PasswordIcon className="w-fit shrink group-focus-within:text-primary" />
                    <input
                      className="h-[90%] outline-none w-[90%] text-primarytext-900 rounded-[8px]"
                      type="password"
                      placeholder="Enter confirm password"
                      id="confirmPassword"
                      {...register("confirmPassword")}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p
                      role="alert"
                      className="text-primaryred font-bold text-[length:var(--body-text-13-r)]"
                    >
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                {signupErrors && (
                  <p className="lowercase p-[8px] px-[20px] text-center rounded-full max-w-full font-bold bg-red-100 text-primaryred text-[length:var(--button-text-15-b) first-letter:uppercase">
                    {signupErrors}
                  </p>
                )}
                <Button
                  which="submit"
                  size="large"
                  buttonIconRight={<LongRightArrow />}
                >
                  Create your account
                </Button>
                <div className="flex items-center gap-[8px]">
                  <p className="text-secondarytext-500 font-semibold text-[length:var(--body-text-16-sb)]">
                    Already registered?
                  </p>
                  <Button
                    which="button"
                    type="linkunderlined"
                    onClick={() => OnClickRedirect("/login")}
                  >
                    Login to your account
                  </Button>
                </div>
              </form>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Register;
