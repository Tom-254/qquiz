import { MoreMenuIcon } from "../assets";
import { Button } from "../components";
import { OverviewData } from "../data";

const DashboardHome = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-[24px] px-[10px] sm:px-[24px] mb-[150px]">
      <div className="grid grid-cols-1  gap-[16px] bg-white rounded-[24px] w-full py-[24px]">
        <div className="flex flex-row items-center justify-between px-[24px] pb-[20px] border-b-[1px] border-light">
          <p className="text-primarytext-900 font-bold text-[length:var(--h6-title-16)]">
            Overview
          </p>
          <Button type="link" buttonIconRight={<MoreMenuIcon />} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2   gap-[20px] bg-white rounded-[24px] w-full px-[24px] py-[20px]">
          {OverviewData.map(({ id, icon, count, title }) => (
            <div key={id} className="flex gap-[16px] items-center">
              <div

                className="flex items-center justify-center rounded-full w-[50px] h-[50px] p-[12px] bg-background"
              >
                {icon}
              </div>
              <div className="flex flex-col">
                <p className="text-primarytext-900 font-bold text-[length:var(--h6-title-16)]">
                  {count}+
                </p>
                <p className="text-primarytext-900 text-[length:var(--body-text-16-r)]">
                  {title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1  gap-[16px] bg-white rounded-[24px] w-full py-[24px]">
        <div className="flex flex-row items-center justify-between px-[24px] pb-[20px] border-b-[1px] border-light">
          <p className="text-primarytext-900 font-bold text-[length:var(--h6-title-16)]">
            My Quizzes
          </p>
          <Button type="link" buttonIconRight={<MoreMenuIcon />} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2   gap-[20px] bg-white rounded-[24px] w-full px-[24px] py-[20px]">
          {OverviewData.map(({ id, icon, count, title }) => (
            <div key={id} className="flex gap-[16px] items-center">
              <div
                className="flex items-center justify-center rounded-full w-[50px] h-[50px] p-[12px] bg-background"
              >
                {icon}
              </div>
              <div className="flex flex-col">
                <p className="text-primarytext-900 font-bold text-[length:var(--h6-title-16)]">
                  {count}+
                </p>
                <p className="text-primarytext-900 text-[length:var(--body-text-16-r)]">
                  {title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default DashboardHome;
