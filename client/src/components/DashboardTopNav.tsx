import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from ".";
import {
  AddChoices,
  AddIcon,
  AvatarIcon,
  DeleteIcon,
  LongLeftArrow,
  NotificationIcon,
  SearchIcon,
  UpIcon,
} from "../assets";
import CustomDialog from "./CustomDialog";
import { Disclosure } from "@headlessui/react";

type Inputs = {
  title: string;
  category: string;
  description: string;
};

const schema = yup.object().shape({
  title: yup.string().required("This field is required"),
  category: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
});

type InputsTwo = {
  question: string;
  type: string;
};

const schemaTwo = yup.object().shape({
  question: yup.string().required("This field is required"),
  type: yup.string().required("This field is required"),
});

const DashboardTopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [createQuizTitle, setCreateQuizTitle] = useState(
    "Create Quiz - General Details "
  );
  const [mainButtonTitle, setMainButtonTitle] = useState("Continue");

  const [next, setNext] = useState(1);

  const [openQuestion, setOpenQuestion] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register: formTwoRegister,
    handleSubmit: formTwoHandleSubmit,
    reset: formTwoReset,
    formState: { errors: formTwoErrors },
  } = useForm<InputsTwo>({
    resolver: yupResolver(schemaTwo),
  });

  const onSubmit: SubmitHandler<Inputs | InputsTwo> = (data: object, event) => {
    console.log(data);
    // event?.preventDefault();
    setNext((prev) => prev + 1);

    if (next + 1 === 3) {
      setMainButtonTitle("Save & Continue");
    }

    console.log(next);
  };

  const closeModal = () => {
    setIsOpen(false);
    reset();
  };

  const closeModalAndClearForm = () => {
    closeModal();
    formTwoReset();
  };

  const openModal = () => {
    setNext(1);
    setIsOpen(true);
  };

  const goBack = () => {
    setNext((prev) => prev - 1);
    setMainButtonTitle("Continue");
  };

  return (
    <nav className="sticky top-0 h-fit left-0 right-0 py-[16px] z-20 flex items-center justify-between px-[10px] sm:px-[24px] bg-background">
      <div className="flex items-center gap-[8px]">
        <div className="md:hidden">
          <Button
            type="link"
            buttonIconRight={
              <div className="flex items-center justify-center w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] rounded-full">
                <img
                  className="rounded-full w-full"
                  src={AvatarIcon}
                  alt="Profile Image"
                />
              </div>
            }
          />
        </div>
        <div className="flex flex-col">
          <p className="text-primarytext-1000 font-bold text-[14px] md:text-[length:var(--body-text-16-sb)]">
            Hi Louis Carter,
          </p>
          <p className="text-primarytext-1000 font-bold text-[18px] md:text-[length:var(--h5-title-24)]">
            Welcome back 👋
          </p>
        </div>
      </div>
      <div className="flex items-center gap-[32px]">
        <div className="hidden md:block">
          <Button buttonIconLeft={<AddIcon />} onClick={openModal}>
            Create quiz
          </Button>
        </div>
        <div className="flex items-center gap-[16px]">
          <div className="hidden bg-white group md:flex items-center gap-[12px] h-[48px] border-[1px] rounded-[12px] border-white px-[20px] focus-within:border-primary text-secondarytext-500">
            <Button
              type="link"
              buttonIconLeft={
                <SearchIcon className="w-fit text-secondarytext-500 shrink group-focus-within:text-primary" />
              }
            />
            <input
              className="hidden lg:block h-[90%] outline-none w-[90%] text-primarytext-900 rounded-[8px]"
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="flex items-center justify-center bg-white shadow-custom-main rounded-full h-[48px] w-[48px] p-[11px]">
            <Button type="link">
              <NotificationIcon />
            </Button>
          </div>
        </div>
      </div>
      <CustomDialog
        isOpen={isOpen}
        title={createQuizTitle}
        closeModal={closeModal}
      >
        {next === 1 && (
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-[24px] p-[24px]">
              <div className="flex flex-col gap-[8px]">
                <label
                  htmlFor="title"
                  className="text-primarytext-900 font-bold text-[length:var(--button-text-15-b)]"
                >
                  Title*
                </label>
                <div className="group flex items-center gap-[12px] h-[48px] border-[1px] rounded-[12px] focus-within:border-primary text-secondarytext-500">
                  <input
                    className="outline-none h-full w-full text-primarytext-900 rounded-[8px] form-input focus:border-primary focus:border-[1px] focus:outline-none focus:shadow-none border-[1px] border-border "
                    type="text"
                    placeholder="Add quiz topic e.g Cooking dinner"
                    id="title"
                    {...register("title")}
                  />
                </div>
                {errors.title && (
                  <p
                    role="alert"
                    className="text-primaryred font-bold text-[length:var(--body-text-13-r)]"
                  >
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-[8px]">
                <label
                  htmlFor="category"
                  className="text-primarytext-900 font-bold text-[length:var(--button-text-15-b)]"
                >
                  Category*
                </label>
                <div className="group flex items-center gap-[12px] h-[48px] border-[1px] rounded-[12px] focus-within:border-primary text-secondarytext-500">
                  <select
                    className="outline-none h-full w-full text-primarytext-900 rounded-[8px] form-select focus:border-primary focus:border-[1px] focus:outline-none focus:shadow-none border-[1px] border-border"
                    placeholder="Select the Quiz Category e.g. Catering"
                    id="category"
                    {...register("category")}
                  >
                    <option value="">
                      Select the Quiz Category e.g. Catering
                    </option>
                    <option value="Food">Food</option>
                    <option value="Finance">Finance</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>
                {errors.category && (
                  <p
                    role="alert"
                    className="text-primaryred font-bold text-[length:var(--body-text-13-r)]"
                  >
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-[8px]">
                <label
                  htmlFor="description"
                  className="text-primarytext-900 font-bold text-[length:var(--button-text-15-b)]"
                >
                  Description*
                </label>
                <div className="group flex items-center gap-[12px] border-[1px] rounded-[12px] focus-within:border-primary text-secondarytext-500">
                  <textarea
                    className=" outline-none w-full text-primarytext-900 rounded-[8px] form-textarea focus:border-primary focus:border-[1px] focus:outline-none focus:shadow-none h-full"
                    placeholder="Enter the questions description here"
                    id="description"
                    {...register("description")}
                  />
                </div>
                {errors.description && (
                  <p
                    role="alert"
                    className="text-primaryred font-bold text-[length:var(--body-text-13-r)]"
                  >
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
            <div className="px-[24px] pt-[16px] pb-[20px] w-full flex gap-[24px] flex-col-reverse sm:flex-row sm:items-center md:justify-between border-t-[1px] border-light">
              {next !== 1 && (
                <div className="mx-auto sm:mx-0">
                  <Button
                    which="button"
                    type="link"
                    buttonIconLeft={<LongLeftArrow />}
                    onClick={goBack}
                  >
                    Back
                  </Button>
                </div>
              )}
              <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-[12px] sm:gap-[24px] sm:ml-auto">
                <Button which="button" type="tertiary" onClick={closeModal}>
                  Cancel
                </Button>
                <Button>{mainButtonTitle}</Button>
              </div>
            </div>
          </form>
        )}
        {next === 2 && (
          <form
            className="flex flex-col"
            onSubmit={formTwoHandleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-[24px] p-[24px]">
              <div className="flex flex-col sm:flex-row gap-[24px] w-full">
                <div className="flex flex-col gap-[8px] w-full">
                  <label
                    htmlFor="question"
                    className="text-primarytext-900 font-bold text-[length:var(--button-text-15-b)]"
                  >
                    Title*
                  </label>
                  <div className="group flex items-center gap-[12px] h-[48px] border-[1px] rounded-[12px] focus-within:border-primary text-secondarytext-500">
                    <input
                      className="outline-none h-full w-full text-primarytext-900 rounded-[8px] form-input focus:border-primary focus:border-[1px] focus:outline-none focus:shadow-none border-[1px] border-border "
                      type="text"
                      placeholder="Add  a question."
                      id="question"
                      {...formTwoRegister("question")}
                    />
                  </div>
                  {formTwoErrors.question && (
                    <p
                      role="alert"
                      className="text-primaryred font-bold text-[length:var(--body-text-13-r)]"
                    >
                      {formTwoErrors.question.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-[8px] w-full">
                  <label
                    htmlFor="type"
                    className="text-primarytext-900 font-bold text-[length:var(--button-text-15-b)]"
                  >
                    Type*
                  </label>
                  <div className="group flex items-center gap-[12px] h-[48px] border-[1px] rounded-[12px] focus-within:border-primary text-secondarytext-500">
                    <select
                      className="outline-none h-full w-full text-primarytext-900 rounded-[8px] form-select focus:border-primary focus:border-[1px] focus:outline-none focus:shadow-none border-[1px] border-border"
                      placeholder="Select the Quiz Category e.g. Catering"
                      id="type"
                      {...formTwoRegister("type")}
                    >
                      <option value="">Select question type</option>
                      <option value="mutliple">Multiple Choice</option>
                      <option value="description">Description</option>
                    </select>
                  </div>
                  {formTwoErrors.type && (
                    <p
                      role="alert"
                      className="text-primaryred font-bold text-[length:var(--body-text-13-r)]"
                    >
                      {formTwoErrors.type.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-[8px] w-full">
                <label
                  htmlFor="choices"
                  className="text-primarytext-900 font-bold text-[length:var(--button-text-15-b)]"
                >
                  Choices*
                </label>
                <div className="group flex items-center gap-[12px] h-[48px] border-[2px] rounded-[12px] focus-within:border-primary text-secondarytext-500 px-[12px]">
                  <input
                    className="outline-none h-full w-full text-primarytext-900 rounded-[8px] "
                    type="text"
                    placeholder="Add  as many choices as you can"
                    id="choices"
                    // {...register("choices")}
                  />
                  <Button
                    which="button"
                    type="link"
                    buttonIconRight={<AddChoices />}
                  />
                </div>
                {/* {errors.choices && (
                <p
                  role="alert"
                  className="text-primaryred font-bold text-[length:var(--body-text-13-r)]"
                >
                  {errors.choices.message}
                </p>
              )} */}
              </div>
              <div className="flex flex-col gap-[8px] w-full">
                <p className="text-primarytext-900 font-bold text-[length:var(--button-text-15-b)]">
                  Question choices
                </p>
                <div className="group flex flex-col gap-[12px] h-[48px] border-[2px] rounded-[12px] focus-within:border-primary text-secondarytext-500 px-[12px] py-[12px]">
                  <ul className="bg-white h-full max-h-[300px]">
                    <li className="flex items-center gap-[8px] justify-between">
                      <div className="flex items-center gap-[8px]">
                        <div className=" max-h-[1px] rounded-full border-[3px] border-secondarytext-600"></div>
                        <p className="text-secondarytext-600 font-bold text-[length:var(--button-text-15-b)]">
                          Warm the water and soak.
                        </p>
                      </div>
                      <Button type="link" buttonIconRight={<DeleteIcon />} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="px-[24px] pt-[16px] pb-[20px] w-full flex gap-[24px] flex-col-reverse sm:flex-row sm:items-center md:justify-between border-t-[1px] border-light">
              <div className="mx-auto sm:mx-0">
                <Button
                  which="button"
                  type="link"
                  buttonIconLeft={<LongLeftArrow />}
                  onClick={goBack}
                >
                  Back
                </Button>
              </div>
              <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-[12px] sm:gap-[24px] sm:ml-auto">
                <Button
                  which="button"
                  type="tertiary"
                  onClick={closeModalAndClearForm}
                >
                  Cancel
                </Button>
                <Button>{mainButtonTitle}</Button>
              </div>
            </div>
          </form>
        )}

        {next === 3 && (
          <>
            <div className="flex flex-col gap-[24px] p-[24px]">
              <div className="flex flex-col gap-[8px] w-full">
                <p className="text-primarytext-900 font-bold text-[length:var(--lead-text-b)]">
                  Title
                </p>
                <p className="text-secondarytext-600 font-semibold text-[length:var(--body-text16-sb)]">
                  Cooking Dinner
                </p>
              </div>
              <div className="flex flex-col gap-[8px] w-full">
                <p className="text-primarytext-900 font-bold text-[length:var(--lead-text-b)]">
                  Category
                </p>
                <p className="text-secondarytext-600 font-semibold text-[length:var(--body-text16-sb)]">
                  Catering
                </p>
              </div>
              <div className="flex flex-col gap-[8px] w-full">
                <p className="text-primarytext-900 font-bold text-[length:var(--lead-text-b)]">
                  Description
                </p>
                <p className="text-secondarytext-600 font-semibold text-[length:var(--body-text16-sb)]">
                  Lorem ipsum dolor sit amet consectetur. Malesuada vitae est
                  amet enim ultrices semper. Odio convallis placerat velit nunc.
                </p>
              </div>
              <div className="flex flex-col gap-[8px] w-full">
                <p className="text-primarytext-900 font-bold text-[length:var(--lead-text-b)]">
                  Questions
                </p>
                <div>
                  <div className="w-full px-4 pt-16">
                    <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                              <span>What is your refund policy?</span>
                              <UpIcon
                                className={`${
                                  open ? "rotate-180 transform" : ""
                                } h-5 w-5 text-purple-500`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                              If you're unhappy with your purchase for any
                              reason, email us within 90 days and we'll refund
                              you in full, no questions asked.
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                      <Disclosure as="div" className="mt-2">
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                              <span>Do you offer technical support?</span>
                              <UpIcon
                                className={`${
                                  open ? "rotate-180 transform" : ""
                                } h-5 w-5 text-purple-500`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                              No.
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-[24px] pt-[16px] pb-[20px] w-full flex gap-[24px] flex-col-reverse sm:flex-row sm:items-center md:justify-between border-t-[1px] border-light">
              <div className="mx-auto sm:mx-0">
                <Button
                  which="button"
                  type="link"
                  buttonIconLeft={<LongLeftArrow />}
                  onClick={goBack}
                >
                  Back
                </Button>
              </div>
              <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-[12px] sm:gap-[24px] sm:ml-auto">
                <Button which="button" type="tertiary" onClick={closeModal}>
                  Cancel
                </Button>
                <Button>{mainButtonTitle}</Button>
              </div>
            </div>
          </>
        )}
      </CustomDialog>
    </nav>
  );
};

export default DashboardTopNav;
