import { Navigate, useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "../api/api";
import { DashboardAsideNav, DashboardMains, Loader } from "../components";
import { useAppDispatch } from "../app/hooks";
import {
  setEmailValue,
  setIdValue,
  setNameValue,
  setProfileImageValue,
} from "../features/userSlice";
import { useEffect } from "react";

type ErrorInputs = {
  status: number;
  data: string;
};

const DashboardRoot = () => {
  const { isLoading, isError, error, isSuccess, data } =
    useGetProfileQuery("argument");

  const navigate = useNavigate();


  const dispatch: any = useAppDispatch();

  useEffect(() => {


    if (isError) {
      const { status, data } = error as ErrorInputs;
      console.log(data)
      return;
    }
    // console.log(isError);
    dispatch(setIdValue(data?.id));
    dispatch(setNameValue(data?.full_name));
    dispatch(setEmailValue(data?.email));
    dispatch(setProfileImageValue(data?.profile_image));
  }, [isError, error, data, dispatch, navigate]);

  // if (!data) return <Loader />;
  if (error) return <Navigate to="/login" replace />

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main className="relative bg-background h-screen">
          <div className="flex w-full bg-background max-w-[1400px] mx-auto">
            <DashboardAsideNav />
            <div className="bg-background flex w-full h-full flex-col gap-[5px]">
              <DashboardMains />
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default DashboardRoot;
