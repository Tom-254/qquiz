import { AcceptInvitation, DeleteIcon, MoreMenuIcon, SeeIcon } from "../assets";
import { Button } from "../components";
import { MyQuizzes, NewQuizzes, OverviewData, QuizInvitations } from "../data";

const DashboardHome = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-[24px] px-[10px] sm:px-[24px] pb-[70px] overflow-y-auto max-h-[80vh]">
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
              <div className="flex items-center justify-center rounded-full w-[50px] h-[50px] p-[12px] bg-background">
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
      <div className="flex flex-col  gap-[16px] bg-white rounded-[24px] w-full py-[24px] h-full">
        <div className="flex flex-row items-center justify-between px-[24px] pb-[20px] border-b-[1px] border-light mb-auto">
          <p className="text-primarytext-900 font-bold text-[length:var(--h6-title-16)]">
            My Quizzes
          </p>
          <Button type="link" buttonIconRight={<MoreMenuIcon />} />
        </div>
        <div className="flex-1 flex flex-col  gap-[20px] bg-white rounded-[24px] w-full px-[24px] pb-[20px]">
          {MyQuizzes.map(({ id, data }) => (
            <div
              key={id}
              className="flex flex-col xl:flex-row  gap-[16px] px-[24px] py-[12px] rounded-[12px] shadow-custom-white w-full justify-between"
            >
              <div className="flex flex-col  md:flex-row  gap-[16px]">
                {data.map(({ id, name, value }) => (
                  <div key={id} className="">
                    <p className="text-secondarytext-600 font-bold text-[14px]">
                      {value}
                    </p>
                    <p className="text-secondarytext-600 font text-[12px]">
                      {name}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex gap-[16px] border-t-[1px] xl:border-0 pt-[12px] xl:p-0 pb-[5px]">
                <Button type="link" buttonIconRight={<SeeIcon />} />
                <Button type="link" buttonIconRight={<DeleteIcon />} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col  gap-[16px] bg-white rounded-[24px] w-full py-[24px] h-full">
        <div className="flex flex-row items-center justify-between px-[24px] pb-[20px] border-b-[1px] border-light mb-auto">
          <p className="text-primarytext-900 font-bold text-[length:var(--h6-title-16)]">
            New Quizzes
          </p>
          <Button type="link" buttonIconRight={<MoreMenuIcon />} />
        </div>
        <div className="flex-1 flex flex-col  gap-[20px] bg-white rounded-[24px] w-full px-[24px] pb-[20px]">
          {NewQuizzes.map(({ id, image, data }) => (
            <div
              key={id}
              className="flex flex-col xl:flex-row xl:items-center  gap-[16px] w-full justify-between"
            >
              <div className="flex flex-col  md:flex-row md:items-center  gap-[16px]">
                <div className="rounded-full jutify-center items-center w-[51px] h-[51px]">
                  <img src={image} alt="Person Name" className="w-full" />
                </div>
                <div className="flex flex-col  md:flex-row md:items-center  gap-[16px]">
                  {data.map(({ id, name, value }) => (
                    <div key={id} className="">
                      <p className="text-secondarytext-600 font-bold text-[14px]">
                        {value}
                      </p>
                      <p className="text-secondarytext-600 font text-[12px]">
                        {name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-[16px] border-t-[1px] xl:border-0 pt-[12px] xl:p-0 pb-[5px]">
                <Button size="icon" type="tertiary">Take Quiz</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col  gap-[16px] bg-white rounded-[24px] w-full py-[24px] h-full">
        <div className="flex flex-row items-center justify-between px-[24px] pb-[20px] border-b-[1px] border-light mb-auto">
          <p className="text-primarytext-900 font-bold text-[length:var(--h6-title-16)]">
            Quiz Invitations
          </p>
          <Button type="link" buttonIconRight={<MoreMenuIcon />} />
        </div>
        <div className="flex-1 flex flex-col  gap-[20px] bg-white rounded-[24px] w-full px-[24px] pb-[20px]">
          {QuizInvitations.map(({ id, image, data }) => (
            <div
              key={id}
              className="flex flex-col xl:flex-row xl:items-center  gap-[16px] w-full justify-between"
            >
              <div className="flex flex-col  md:flex-row md:items-center  gap-[16px]">
                <div className="rounded-full jutify-center items-center w-[51px] h-[51px]">
                  <img src={image} alt="Person Name" className="w-full" />
                </div>
                <div className="flex flex-col  md:flex-row md:items-center  gap-[16px]">
                  {data.map(({ id, name, value }) => (
                    <div key={id} className="">
                      <p className="text-secondarytext-600 font-bold text-[14px]">
                        {value}
                      </p>
                      <p className="text-secondarytext-600 font text-[12px]">
                        {name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-[16px] border-t-[1px] xl:border-0 pt-[12px] xl:p-0 pb-[5px]">
                <Button type="link" buttonIconRight={<SeeIcon />} />
                <Button type="link" buttonIconRight={<DeleteIcon />} />
                <Button type="link" buttonIconRight={<AcceptInvitation />} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardHome;
