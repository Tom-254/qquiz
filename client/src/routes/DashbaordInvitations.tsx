import { AcceptInvitation, DeleteIcon, EditIcon, InvitationsIcon, PrivateIcon, PublicIcon, SeeIcon } from "../assets";
import { Button } from "../components";
import { Invitations } from "../data";

const DashbaordInvitations = () => {
  return (
    <section className="flex flex-col gap-[16px] px-[10px] sm:px-[24px] pb-[70px] pt-[16px] overflow-y-auto h-full max-h-[80vh]">
      <p className="text-primarytext-1000 font-bold text-[length:var(--lead-text-b)]">
        Invitations
      </p>
      <div className="flex flex-col gap-[16px] bg-white rounded-[24px] w-full flex-1 p-[24px]">
        <div className="flex flex-col gap-[16px] w-full">
          {Invitations.map(({ id, image, data }) => (
            <div
              key={id}
              className="flex flex-col xl:flex-row  gap-[16px] w-full justify-between"
            >
              <div className="flex flex-col  md:flex-row md:items-center  gap-[16px] md:justify-between  border-l-[2px] border-secondarytext-500 pl-[8px]">
              <div className="flex flex-col  md:flex-row md:items-center  gap-[16px]">
                <div className="rounded-full jutify-center items-center w-[51px] h-[51px]">
                  <img src={image} alt="Person Name" className="w-full" />
                </div>
              </div>
                {data.map(({ id, name, value }) => (
                  <div key={id}>{id !== 7 ? (<div className="">
                  <p className="text-secondarytext-600 font-bold text-[14px]">
                    {value}
                  </p>
                  <p className="text-secondarytext-600 font text-[12px]">
                    {name}
                  </p>
                </div>): (<>
                { value === "Public" ? <p key={id} className="flex gap-[8px] items-center text-primaryred font-bold text-[14px]">
                    <PublicIcon />
                    {value}
                  </p> : <p key={id} className="flex gap-[8px] items-center text-primarygreen font-bold text-[14px]">
                    <PrivateIcon />
                    {value}
                  </p> }
                  </>)

                }</div>
                ))}
              </div>
              <div className="flex gap-[16px] border-t-[1px] xl:border-0 pt-[12px] xl:p-0 pb-[5px]">
                <Button type="tertiary" size="icon" buttonIconRight={<EditIcon />} />
                <Button type="tertiary" size="icon" buttonIconRight={<SeeIcon />} />
                <Button type="tertiary" size="icon" buttonIconRight={<AcceptInvitation />} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-[15px] sm:flex-row sm:items-center justify-between mt-[50px]">
          <Button size="icon" type="tertiary">
            Previous
          </Button>
          <p className="text-secondarytext-600 mx-auto sm:mx-0 font-bold text-[length:var(--body-text-13)]">
            Page 1 of 10
          </p>
          <Button size="icon" type="tertiary">
            Next
          </Button>
        </div>
      </div>
    </section>
  );
}

export default DashbaordInvitations