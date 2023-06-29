import { useNavigate } from "react-router-dom";
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

const DashboardRoot = () => {
  const { isLoading, isError, error, isSuccess, data } =
    useGetProfileQuery("argument");

  const navigate = useNavigate();

  const dispatch: any = useAppDispatch();

  useEffect(() => {
    dispatch(setIdValue(data?.id));
    dispatch(setNameValue(data?.full_name));
    dispatch(setEmailValue(data?.email));
    dispatch(setProfileImageValue(data?.profile_image));
  }, [data, dispatch]);

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
