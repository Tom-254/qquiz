import React, { useState } from "react";
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
import CustomDialog from "../components/CustomDialog";
import { useForm } from "react-hook-form";

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData: any) => {
    // handle form submission
    const answers = Object.entries(formData).map(([question, answer]) => {
      if (typeof answer === "string") {
        return {
          question_id: question,
          choice_id: answer,
        };
      } else {
        return {
          question_id: question,
          description: answer,
        };
      }
    });

    console.log(answers);
  };

  const formData = {
    title: "",
    category: "",
    description: "",
  };

  const questions = [
    {
      id: "one",
      question: "Hello world",
      answer_type: "multiple",
      choices: [
        { id: 1, name: "Jumping home" },
        { id: 2, name: "Eating Sugar" },
        { id: 3, name: "Playing" },
      ],
    },
    {
      id: "two",
      question: "Hello world Kenya",
      answer_type: "multiple",
      choices: [
        { id: 4, name: "Jumping home" },
        { id: 5, name: "Eating Sugar" },
        { id: 6, name: "Playing" },
      ],
    },
    {
      id: "three",
      question: "Hello world Kenya",
      answer_type: "description",
      choices: [],
    },
  ];

  const openTakeQuizModal = () => {
    reset();
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
        <div className="flex flex-col gap-[24px] py-[24px]">
          <div className="px-[24px] flex flex-col gap-[8px] w-full">
            <p className="text-primarytext-900 font-bold text-[length:var(--lead-text-b)]">
              Title
            </p>
            <p className="text-secondarytext-600 font-semibold text-[length:var(--body-text16-sb)]">
              {formData.title}
            </p>
          </div>
          <div className="px-[24px] flex flex-col gap-[8px] w-full">
            <p className="text-primarytext-900 font-bold text-[length:var(--lead-text-b)]">
              Category
            </p>
            <p className="text-secondarytext-600 font-semibold text-[length:var(--body-text16-sb)]">
              {formData.category}
            </p>
          </div>
          <div className="px-[24px] flex flex-col gap-[8px] w-full">
            <p className="text-primarytext-900 font-bold text-[length:var(--lead-text-b)]">
              Description
            </p>
            <p className="text-secondarytext-600 font-semibold text-[length:var(--body-text16-sb)]">
              Lorem ipsum dolor sit amet consectetur. Malesuada vitae est amet
              enim ultrices semper. Odio convallis placerat velit nunc.
            </p>
          </div>
          <div className="flex flex-col gap-[8px] w-full">
            <p className="px-[24px] text-primarytext-900 font-bold text-[length:var(--lead-text-b)]">
              Questions
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-[10px] mx-auto w-full"
            >
              {questions.map((question, index) => (
                <div
                  key={index + 2}
                  className="border-t-[1px] py-[10px] mx-[24px]"
                >
                  <>
                    <div className="flex w-full flex-col sm:flex-row sm:items-center gap-[10px] md:justify-between text-secondarytext-600 font-semibold text-[length:var(--body-text16-sb) focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      <div className="flex items-center w-full justify-between text-left">
                        <span className="flex items-center gap-[8px] first-letter:uppercase">
                          {index + 1}.{" "}
                          <p className="first-letter:uppercase">
                            {question.question}?
                          </p>
                        </span>
                      </div>
                    </div>

                    <div className="px-[8px] pt-4 pb-2 text-secondarytext-600 font-semibold text-[length:var(--body-text16-sb)">
                      <div className="flex items-center gap-[8px]">
                        <p className="text-secondarytext-600 font-bold text-[length:var(--body-text-13-r)]">
                          Type:
                        </p>
                        <Button which="button" type="tertiary" size="small">
                          {question.answer_type === "multiple"
                            ? "Multiple Choices"
                            : "Description Answer"}
                        </Button>
                      </div>
                      {question.choices &&
                        question.answer_type === "multiple" && (
                          <ul
                            key={question.id}
                            className="flex flex-col gap-[4px] mt-[8px]"
                          >
                            {question.choices.map((choice) => (
                              <li
                                key={choice.name}
                                className="flex items-center gap-[8px]"
                              >
                                <input
                                  type="radio"
                                  className="rounded-full border-[1px] border-secondarytext-600 form-radio cursor-pointer"
                                  id={`${choice.id}`}
                                  value={`${choice.id}`}
                                  {...register(question.id, {
                                    required: true,
                                  })}
                                />
                                <label
                                  htmlFor={`${choice.id}`}
                                  className="text-secondarytext-600 font-bold text-[length:var(--button-text-15-b)] pointer-none"
                                >
                                  {choice.name}
                                </label>
                              </li>
                            ))}
                            {errors[question.id] && (
                              <p
                                role="alert"
                                className="text-primaryred font-bold text-[length:var(--body-text-13-r)]
                                    ]"
                              >
                                Answer is required
                              </p>
                            )}
                          </ul>
                        )}
                      {question.answer_type === "description" && (
                        <div className="flex flex-col gap-[8px] w-full mt-[15px]">
                          <textarea
                            className=" outline-none w-full text-primarytext-900 rounded-[8px] form-textarea focus:border-primary focus:border-[1px] focus:outline-none focus:shadow-none h-full"
                            placeholder="Enter the questions description here"
                            {...register(question.id, { required: true })}
                          />
                          {errors[question.id] && (
                            <p
                              role="alert"
                              className="text-primaryred font-bold text-[length:var(--body-text-13-r)]"
                            >
                              Answer is required
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                </div>
              ))}
              <div className="px-[24px] pt-[16px] pb-[20px] w-full flex gap-[24px] flex-col-reverse sm:flex-row sm:items-center md:justify-between border-t-[1px] border-light">
                <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-[12px] sm:gap-[24px] sm:ml-auto">
                  <Button
                    which="button"
                    type="tertiary"
                    onClick={() => closeTakeQuizModal()}
                  >
                    Cancel
                  </Button>
                  <Button>Submit Answers</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </CustomDialog>
      <CustomDialog
        isOpen={openSeeQuizDetailsDialog}
        title={dialogTitle}
        closeModal={closeSeeQuizModal}
      >
        <div className="flex flex-col gap-[24px] p-[24px]">
          <div className="flex flex-col gap-[8px] w-full">
            <p className="text-primarytext-900 font-bold text-[length:var(--lead-text-b)]">
              Title
            </p>
            <p className="text-secondarytext-600 font-semibold text-[length:var(--body-text16-sb)]">
              {formData.title}
            </p>
          </div>
          <div className="flex flex-col gap-[8px] w-full">
            <p className="text-primarytext-900 font-bold text-[length:var(--lead-text-b)]">
              Category
            </p>
            <p className="text-secondarytext-600 font-semibold text-[length:var(--body-text16-sb)]">
              {formData.category}
            </p>
          </div>
          <div className="flex flex-col gap-[8px] w-full">
            <p className="text-primarytext-900 font-bold text-[length:var(--lead-text-b)]">
              Description
            </p>
            <p className="text-secondarytext-600 font-semibold text-[length:var(--body-text16-sb)]">
              Lorem ipsum dolor sit amet consectetur. Malesuada vitae est amet
              enim ultrices semper. Odio convallis placerat velit nunc.
            </p>
          </div>
          <div className="flex flex-col gap-[8px] w-full">
            <p className="text-primarytext-900 font-bold text-[length:var(--lead-text-b)]">
              Questions
            </p>
            <div className="flex flex-col gap-[10px] mx-auto w-full">
              {questions.map((question, index) => (
                <div key={index + 2} className="border-t-[1px] py-[10px]">
                  <>
                    <div className="flex w-full flex-col sm:flex-row sm:items-center gap-[10px] md:justify-between text-secondarytext-600 font-semibold text-[length:var(--body-text16-sb) focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      <div className="flex items-center w-full justify-between text-left">
                        <span className="flex items-center gap-[8px] first-letter:uppercase">
                          {index + 1}.{" "}
                          <p className="first-letter:uppercase">
                            {question.question}?
                          </p>
                        </span>
                      </div>
                    </div>

                    <div className="px-[8px] pt-4 pb-2 text-secondarytext-600 font-semibold text-[length:var(--body-text16-sb)">
                      <div className="flex items-center gap-[8px]">
                        <p className="text-secondarytext-600 font-bold text-[length:var(--body-text-13-r)]">
                          Type:
                        </p>
                        <Button which="button" type="tertiary" size="small">
                          {question.answer_type === "multiple"
                            ? "Multiple Choices"
                            : "Description Answer"}
                        </Button>
                      </div>
                      {question.choices && (
                        <ul className="flex flex-col gap-[4px] mt-[8px]">
                          {question.choices.map((choice, index) => (
                            <li
                              key={index + 3}
                              className="flex items-center gap-[8px]"
                            >
                              <div className=" max-h-[1px] rounded-full border-[3px] border-secondarytext-600"></div>
                              <p className="text-secondarytext-600 font-bold text-[length:var(--button-text-15-b)]">
                                {choice.name}
                              </p>
                            </li>
                          ))}
                        </ul>
                      )}
                      {question.answer_type === "description" && (
                        <div className="flex flex-col gap-[8px] w-full">
                          <p className="text-primarytext-900 font-bold text-[length:var(--button-text-15-b)]">
                            What is a Description answer ?
                          </p>
                          <p className="text-secondarytext-600 font-semibold text-[length:var(--body-text16-sb)]">
                            A Description answer is one where a user describes
                            what there answer is. This ofcourse is subject to
                            the rules of a particular subject
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="px-[24px] pt-[16px] pb-[20px] w-full flex gap-[24px] flex-col-reverse sm:flex-row sm:items-center md:justify-between border-t-[1px] border-light">
          <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-[12px] sm:gap-[24px] sm:ml-auto">
            <Button
              which="button"
              type="tertiary"
              onClick={() => closeSeeQuizModal()}
            >
              Cancel
            </Button>
            <Button which="submit">Confirm</Button>
          </div>
        </div>
      </CustomDialog>
    </>
  );
};

export default DashboardHome;
