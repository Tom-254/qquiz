import { useState } from "react";
import {
  AcceptInvitation,
  DeleteIcon,
  ErrorIcon,
  MoreMenuIcon,
  SeeIcon,
  SuccessIcon,
} from "../assets";
import { Button, MessageModal } from "../components";
import { MyQuizzes, NewQuizzes, OverviewData, QuizInvitations } from "../data";
import { title } from "process";
import CustomDialog from "../components/CustomDialog";

const DashboardHome = () => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [deleteDialogTitle, setDeleteDialogTitle] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");

  const [openTakeQuizDialog, setOpenTakeQuizDialog] = useState(false);
  const [openAcceptInvitationDialog, setOpenAcceptInvitationDialog] =
    useState(false);
  const [openSeeQuizDetailsDialog, setOpenSeeQuizDetailsDialog] =
    useState(false);

  const openTakeQuizModal = () => {
    setOpenTakeQuizDialog(true);
    setDialogTitle("Take Quiz");
  };
  const closeTakeQuizModal = () => {
    setOpenTakeQuizDialog(false);
  };
  const openAcceptInvitationModal = () => {
    setOpenAcceptInvitationDialog(true);
    setDialogTitle("Accept Quiz Invitation");
    setDialogMessage(
      "Do you want to accept this take quiz invitation? By Accepting you will be able to take the Quiz"
    );
  };
  const closeAcceptInvitationModal = () => {
    setOpenAcceptInvitationDialog(false);
  };
  const openSeeQuizModal = () => {
    setOpenSeeQuizDetailsDialog(true);
    setDialogTitle("View Quiz Details");
  };
  const closeSeeQuizModal = () => {
    setOpenSeeQuizDetailsDialog(false);
  };

  const closeDeleteModal = () => {
    setIsOpenDelete(false);
  };

  const openDeleteModal = (title: string, message: string) => {
    setDeleteDialogTitle(title);
    setDialogMessage(message);
    setIsOpenDelete(true);
  };
  return (
    <>
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
                  <Button
                    type="link"
                    buttonIconRight={<SeeIcon />}
                    onClick={() => openSeeQuizModal()}
                  />
                  <Button
                    type="link"
                    buttonIconRight={<DeleteIcon />}
                    onClick={() =>
                      openDeleteModal(
                        "Delete my quiz",
                        `Are you sure you want to delete this quiz group? This action cannot be undone.`
                      )
                    }
                  />
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
                  <Button
                    size="icon"
                    type="tertiary"
                    onClick={() => openTakeQuizModal()}
                  >
                    Take Quiz
                  </Button>
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
                  <Button
                    type="link"
                    buttonIconRight={<SeeIcon />}
                    onClick={() => openSeeQuizModal()}
                  />
                  <Button
                    type="link"
                    buttonIconRight={<DeleteIcon />}
                    onClick={() =>
                      openDeleteModal(
                        "Delete invitation",
                        `Are you sure you want to delete this quiz invitation? This action cannot be undone.`
                      )
                    }
                  />
                  <Button
                    type="link"
                    buttonIconRight={<AcceptInvitation />}
                    onClick={() => openAcceptInvitationModal()}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <MessageModal
        isOpen={isOpenDelete}
        title={
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-col sm:flex-row gap-[16px]">
              <ErrorIcon />
              <div>
                <p className="text-[18px]">{deleteDialogTitle}</p>
                <p className="text-secondarytext-600 font-normal text-[14px] mt-[5px]">
                  {dialogMessage}
                </p>
              </div>
            </div>
            <div></div>
          </div>
        }
        closeModal={closeDeleteModal}
      >
        <div className="flex w-full">
          <div className="w-full sm:w-auto pb-[16px] ml-auto flex flex-col-reverse sm:flex-row sm:items-center gap-[12px] px-[24px]">
            <Button which="button" type="tertiary" onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button type="primaryred">Yes, Delete</Button>
          </div>
        </div>
      </MessageModal>
      <MessageModal
        isOpen={openAcceptInvitationDialog}
        title={
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-col sm:flex-row gap-[16px]">
              <SuccessIcon />
              <div>
                <p className="text-[18px]">{dialogTitle}</p>
                <p className="text-secondarytext-600 font-normal text-[14px] mt-[5px]">
                  {dialogMessage}
                </p>
              </div>
            </div>
            <div></div>
          </div>
        }
        closeModal={closeAcceptInvitationModal}
      >
        <div className="flex w-full">
          <div className="w-full sm:w-auto pb-[16px] ml-auto flex flex-col-reverse sm:flex-row sm:items-center gap-[12px] px-[24px]">
            <Button
              which="button"
              type="tertiary"
              onClick={closeAcceptInvitationModal}
            >
              Cancel
            </Button>
            <Button>Yes, Accept</Button>
          </div>
        </div>
      </MessageModal>
      <CustomDialog
        isOpen={openTakeQuizDialog}
        title={dialogTitle}
        closeModal={closeTakeQuizModal}
      >
        <div className="px-[24px] pt-[16px] pb-[20px] w-full flex gap-[24px] flex-col-reverse sm:flex-row sm:items-center md:justify-between border-t-[1px] border-light">
          <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-[12px] sm:gap-[24px] sm:ml-auto">
            <Button which="button" type="tertiary" onClick={closeSeeQuizModal}>
              Cancel
            </Button>
            <Button>Submit Answers</Button>
          </div>
        </div>
      </CustomDialog>
      <CustomDialog
        isOpen={openSeeQuizDetailsDialog}
        title={dialogTitle}
        closeModal={closeSeeQuizModal}
      >
        <div className="px-[24px] pt-[16px] pb-[20px] w-full flex gap-[24px] flex-col-reverse sm:flex-row sm:items-center md:justify-between border-t-[1px] border-light">
          <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-[12px] sm:gap-[24px] sm:ml-auto">
            <Button which="button" type="tertiary" onClick={closeSeeQuizModal}>
              Cancel
            </Button>
            <Button>Confirm</Button>
          </div>
        </div>
      </CustomDialog>
    </>
  );
};

export default DashboardHome;
