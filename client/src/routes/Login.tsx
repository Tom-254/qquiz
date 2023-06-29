import { Link, useNavigate } from "react-router-dom";
import {
  EmailIcon,
  GoogleGLogo,
  Logo,
  LogoIconSmall,
  LongRightArrow,
  PasswordIcon,
} from "../assets";
import { Button } from "../components";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginMutation } from "../api/api";
import { useAppDispatch } from "../app/hooks";
import {
  setEmailValue,
  setIdValue,
  setNameValue,
  setProfileImageValue,
} from "../features/userSlice";
import { useState } from "react";

type Inputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

// interface UserState {
//   app: {
//     full_name: string,
//     email: string,
//     id: string,
//     profile_image: null,
//   }
// }

type ErrorInputs = {
  status: number;
  data: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .required("This field is required")
    .email("Please enter a valid email address"),
  password: yup.string().required("This field is required"),
  rememberMe: yup.boolean(),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const [loginErrors, setLoginErrors] = useState("");

  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const dispatch: any = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    const response = await login({
      email,
      password,
    });

    if ("error" in response) {
      const { status, data } = response.error as ErrorInputs;
      setLoginErrors(data)
      return;
    }
    dispatch(setIdValue(response.data.id));
    dispatch(setNameValue(response.data.full_name));
    dispatch(setEmailValue(response.data.email));
    dispatch(setProfileImageValue(response.data.profile_image));
    setLoginErrors("")
    navigate("/dashboard");
  };

  const OnClickRedirect = (path: string) => {
    navigate(path);
  };

  return (
    <main className="bg-white flex flex-col justify-center">
      <section className="max-w-[1280px] flex-1 px-[10px] w-full h-full mx-auto flex items-center justify-content">
        <div className="max-w-[564px] mx-auto my-[128px] py-[52px] px-[24px] md:px-[48px] flex flex-col gap-[32px] border-radius rounded-[24px] w-full shadow-custom-white ">
          <Link to="/" className="">
            <Logo className="hidden lg:block" />
            <LogoIconSmall className="lg:hidden" />
          </Link>
          <div className="flex flex-col gap-[8px]">
            <p className="text-primarytext-1000 font-bold text-[length:var(--h4-title-32-sb)]">
              Welcome Back to <span className="text-primary">Qquizz!</span>
            </p>
            <p className="text-secondarytext-600 font-semibold text-[length:var(--body-text-sb-14)]">
              Join us and enjoy creating custom quizzes on any topic quickly and
              inviting others to take part in the quizzes.
            </p>
          </div>
          <div className="flex flex-col gap-[20px]">
            <Button
              size="large"
              full={true}
              type="tertiary"
              buttonIconLeft={<GoogleGLogo />}
            >
              Sign in with Google
            </Button>
            <div className="flex items-center gap-[16px] ">
              <div className="w-full shrink border-t-[1px] border-border rounded-full" />
              <p className="w-full whitespace-nowrap text-secondarytext-600 font-semibold text-[length:var(--body-text-sb-14)]">
                or Sign in with Email
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
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                        "Email address must be a valid address",
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[8px]">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="w-[20px] h-[20px] rounded-[5px] border-2 border-primary form-checkbox"
                  {...register("rememberMe")}
                />
                <label
                  htmlFor="rememberMe"
                  className="text-primarytext-900 font-bold text-[length:var(--button-text-15-b)] cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <Button type="link" which="button">
                Forgot Password
              </Button>
            </div>
            {loginErrors && (
              <p className=" p-[8px] px-[20px] text-center w-fit rounded-full max-w-sm font-bold bg-red-100 text-primaryred text-[length:var(--button-text-15-b)">
                {loginErrors}
              </p>
            )}
            <Button
              which="submit"
              size="large"
              buttonIconRight={<LongRightArrow />}
            >
              Login
            </Button>
            <div className="flex items-center gap-[8px]">
              <p className="text-secondarytext-500 font-semibold text-[length:var(--body-text-16-sb)]">
                Not registered yet?
              </p>
              <Button
                which="button"
                type="linkunderlined"
                onClick={() => OnClickRedirect("/register")}
              >
                Create an Account
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
