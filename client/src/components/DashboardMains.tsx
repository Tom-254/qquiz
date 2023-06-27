import { useEffect, useReducer, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  DashboardHomeIcon,
  InvitationsIcon,
  SearchIcon,
  AddChoices,
  AddIcon,
  EditIcon,
  LongLeftArrow,
  UpIcon,
  QuizzesIcon,
  AvatarIcon,
  DeleteIcon,
  NotificationIcon,
  CloseIcon,
} from "../assets";
import CustomDialog from "./CustomDialog";
import { Disclosure, Popover } from "@headlessui/react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from ".";

type BottomNavLinkType = {
  active: boolean;
  path: string;
  title: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

const BottomNavLink = ({
  active,
  path,
  title,
  children,
  onClick,
}: BottomNavLinkType) => {
  return (
    <Link
      to={path}
      className={
        active
          ? "w-fit lg:w-auto bg-primary hover:bg-primarydark font-bold text-white flex items-center justify-center lg:justify-start gap-[16px] rounded-[12px] px-[10px] py-[10px]"
          : "w-fit lg:w-auto bg-transparent text-secondarytext-600 font-bold hover:text-primary flex items-center justify-center lg:justify-start gap-[16px] rounded-[12px] px-[10px] py-[5px]"
      }
      onClick={onClick}
      title={title}
    >
      {children}
    </Link>
  );
};

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
  choice: string;
};

const schemaTwo = yup.object().shape({
  question: yup.string().required("This field is required"),
  type: yup.string().required("This field is required"),
  choice: yup.string(),
});

type ChoiceArray = Array<string>;

type QuestionsObject = {
  title: string;
  category: string;
  description: string;
};
type QuestionObject = {
  question: string;
  type: string;
  choices: Array<string>;
};

const DashboardMains = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [createQuizTitle, setCreateQuizTitle] = useState(
    "Create Quiz - General Details "
  );
  const [mainButtonTitle, setMainButtonTitle] = useState("Continue");

  const [choices, setChoices] = useState<ChoiceArray>([]);

  const [formData, setFormData] = useState<QuestionsObject>({
    title: "",
    category: "",
    description: "",
  });

  const [questions, setQuestions] = useState<QuestionObject[]>([]);

  const [generalError, setGeneralError] = useState("");
  const [generalSuccess, setGeneralSuccess] = useState("");

  const [next, setNext] = useState(1);

  const [isEditing, setIsEditing] = useState(false);
  const [indexEditing, setIndexingEditing] = useState(0);
  const [createButtonText, setCreateButtonText] = useState("Create question");

  const [active, setActive] = useState(1);

  const { pathname } = useLocation();


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
    watch: formTwoWatch,
    reset: formTwoReset,
    setError: formTwoSetError,
    setValue: formTwoSetValue,
    getValues: getFormTwoValues,
    resetField: formTwoResetField,
    formState: { errors: formTwoErrors },
  } = useForm<InputsTwo>({
    resolver: yupResolver(schemaTwo),
  });

  // const watchShowQuestion = formTwoWatch("question");
  const watchShowType = formTwoWatch("type");

  const onSubmit: SubmitHandler<Inputs | InputsTwo> = (
    data: object,
    _event
  ) => {
    // event?.preventDefault();

    if (next + 1 === 3) {
      if (watchShowType === "multiple" && choices.length < 2) {
        formTwoSetError(
          "choice",
          {
            type: "custom",
            message: "Please add atleast two choices ",
          },
          { shouldFocus: true }
        );
        return;
      }

      if (watchShowType === "description") {
        if (isEditing) {
          const newQuestions = questions;
          newQuestions[indexEditing] = {
            ...data,
            choices: [],
          } as unknown as QuestionObject;
          setQuestions(newQuestions);
        } else {
          setQuestions((prev) => [
            ...prev,
            { ...data, choices: [] } as unknown as QuestionObject,
          ]);
        }
      } else {
        if (isEditing) {
          const newQuestions = questions;
          newQuestions[indexEditing] = {
            ...data,
            choices,
          } as unknown as QuestionObject;
          setQuestions(newQuestions);
        } else {
          setQuestions((prev) => [
            ...prev,
            { ...data, choices } as unknown as QuestionObject,
          ]);
        }
      }
      if (isEditing) {
        setGeneralSuccess("Successfully saved question");
        setIsEditing(false);
      } else {
        setGeneralSuccess("Question created Successfully");
      }
      return;
    }
    setFormData((prev) => ({ ...prev, ...data }));
    setCreateQuizTitle("Create Quiz - Add a question ");
    setNext((prev) => prev + 1);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeModalAndClearForm = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setNext(1);
    reset();
    formTwoReset();
    setChoices([]);
    setFormData({
      title: "",
      category: "",
      description: "",
    });
    setQuestions([]);
    setIsEditing(false);
    setCreateQuizTitle("Create Quiz - General Details");
    setMainButtonTitle("Continue");
    setCreateButtonText("Create question");
    setIsOpen(true);
  };

  const goBack = () => {
    setNext((prev) => prev - 1);
    setMainButtonTitle("Continue");
    setCreateButtonText("Create question");
    setIsEditing(false);
  };

  const addChoice = () => {
    const choiceValue = getFormTwoValues("choice");
    if (!choiceValue) {
      formTwoSetError(
        "choice",
        {
          type: "custom",
          message: `Please add a choice`,
        },
        { shouldFocus: true }
      );
      return;
    }
    if (choices.includes(choiceValue)) {
      formTwoSetError(
        "choice",
        {
          type: "custom",
          message: `Choice "${choiceValue}" already added`,
        },
        { shouldFocus: true }
      );
      formTwoResetField("choice", { keepError: true });
      return;
    }
    if (choiceValue !== undefined) setChoices((prev) => [...prev, choiceValue]);
    formTwoResetField("choice", { keepError: true });
    return;
  };

  const continueForward = () => {
    if (next + 1 === 3 && questions.length === 0) {
      setGeneralError("Create atleast one question to proceed");
      return;
    }

    if (isEditing) {
      setGeneralError("Save edited question to proceed");
      return;
    }
    setGeneralError("");
    setNext((prev) => prev + 1);
    setCreateQuizTitle("Create Quiz - Preview details ");
    setMainButtonTitle("Save & Continue");
    setCreateButtonText("Create question");
  };

  const saveAndContinue = () => {
    console.log(formData);
    console.log(questions);
  };

  const deleteChoice = (index: number) => {
    const newChoices = choices.filter((_choice, i) => i !== index);
    setChoices(newChoices);
  };

  const deleteQuiz = (index: number) => {
    const newQuestions = questions.filter((_choice, i) => i !== index);
    setQuestions(newQuestions);
    if (questions.length === 1) {
      setNext((prev) => prev - 1);
      formTwoReset();
      setChoices([]);
      setIsEditing(false);
      setCreateQuizTitle("Create Quiz - Add a question");
      setMainButtonTitle("Continue");
      setCreateButtonText("Create question");
    }

    return;
  };

  const editQuiz = (index: number) => {
    formTwoSetValue("question", questions[index]["question"]);
    formTwoSetValue("type", questions[index]["type"]);
    setChoices(questions[index]["choices"]);
    setIsEditing(true);
    setIndexingEditing(index);
    setCreateButtonText("Save question");
    setMainButtonTitle("Continue");
    setNext((prev) => prev - 1);
    return;
  };

  const AsideNavLinkClicked = (id: number) => {
    setActive(id);
  };

  const location = pathname.split("/").pop();

  useEffect(() => {
    if (location === "dashboard") {
      setActive(1);
    } else if (location === "quizzes") {
      setActive(2);
    } else if (location === "invitations") {
      setActive(3);
    }
  }, [location]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGeneralError("");
      setGeneralSuccess("");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [generalError, generalSuccess]);

  return (
    <>
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
            <Popover className="relative flex items-center justify-center bg-white shadow-custom-main rounded-full h-[48px] w-[48px] p-[11px]" >
              <Popover.Button className="focus:outline-none">
                <NotificationIcon />
              </Popover.Button>

              <Popover.Panel
                as="div"
                className="absolute shadow-lg top-[60px] right-0 z-40 bg-white flex flex-col rounded-[16px]"
              >
                <div className="px-[20px] pt-[15px] pb-[10px] w-full border-b-[1px] border-border/20 flex items-center justify-between">
                  <p className="text-primarytext-1000 font-extrabold text-[length:var(--h6-title-16)] ">
                    Notifications
                  </p>
                  <div className="text-secondarytext-500"><Popover.Button><CloseIcon className="text-secondarytext-600 h-[14px] w-[14px]" /></Popover.Button></div>
                </div>
                <ul className="flex flex-col w-[260px] sm:w-[350px] px-[20px] pt-[5px] pb-[12px] rounded-[24px]">
                  <li className="cursor-pointer flex items-center  gap-[16px] py-[12px] w-full text-[length:var(--h6-title-16)] text-secondarytext-600 font-medium"><div className="flex items-center justify-center bg-background w-[45px] h-[45px] p-[10px] rounded-full">
                    <InvitationsIcon />
                  </div> New invitation from Juma!!</li>
                </ul>
              </Popover.Panel>
            </Popover>
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
                    Quizes Title*
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
                    Quiz Category*
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
                    Quiz Description*
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
                      Question*
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
                      Answer Type*
                    </label>
                    <div className="group flex items-center gap-[12px] h-[48px] border-[1px] rounded-[12px] focus-within:border-primary text-secondarytext-500">
                      <select
                        className="outline-none h-full w-full text-primarytext-900 rounded-[8px] form-select focus:border-primary focus:border-[1px] focus:outline-none focus:shadow-none border-[1px] border-border"
                        placeholder="Select the Quiz Category e.g. Catering"
                        id="type"
                        {...formTwoRegister("type")}
                      >
                        <option value="">Select question type</option>
                        <option value="multiple">Multiple Choice</option>
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
                {watchShowType === "multiple" && (
                  <>
                    <div className="flex flex-col gap-[8px] w-full">
                      <label
                        htmlFor="choice"
                        className="text-primarytext-900 font-bold text-[length:var(--button-text-15-b)]"
                      >
                        Choice*
                      </label>
                      <div className="group flex items-center gap-[12px] h-[48px] border-[2px] rounded-[12px] focus-within:border-primary text-secondarytext-500 px-[12px]">
                        <input
                          className="outline-none h-full w-full text-primarytext-900 rounded-[8px] "
                          type="text"
                          placeholder="Add  as many choices as you can"
                          id="choice"
                          {...formTwoRegister("choice")}
                        />
                        <Button
                          onClick={addChoice}
                          which="button"
                          type="link"
                          buttonIconRight={<AddChoices />}
                        />
                      </div>
                      {formTwoErrors.choice && (
                        <p
                          role="alert"
                          className="text-primaryred font-bold text-[length:var(--body-text-13-r)]"
                        >
                          {formTwoErrors.choice.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-[8px] w-full">
                      <p className="text-primarytext-900 font-bold text-[length:var(--button-text-15-b)]">
                        Question choices
                      </p>
                      <div className="group flex flex-col gap-[12px] h-full border-[2px] rounded-[12px] focus-within:border-primary text-secondarytext-500 px-[12px] py-[12px]">
                        <ul className="bg-white h-full max-h-[300px] flex flex-col gap-[5px]">
                          {choices &&
                            choices.map((choice, index) => (
                              <li
                                key={index + 1}
                                className="flex items-center gap-[8px] justify-between"
                              >
                                <div className="flex items-center gap-[8px]">
                                  <div className=" max-h-[1px] rounded-full border-[3px] border-secondarytext-600"></div>
                                  <p className="first-letter:uppercase text-secondarytext-600 font-bold text-[length:var(--button-text-15-b)] normal-case">
                                    {choice}
                                  </p>
                                </div>
                                <Button
                                  which="button"
                                  type="link"
                                  buttonIconRight={<DeleteIcon />}
                                  onClick={() => deleteChoice(index)}
                                />
                              </li>
                            ))}
                          {choices.length === 0 && (
                            <>
                              <p>Choices you add will appear here</p>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
                {watchShowType === "description" && (
                  <>
                    <div className="flex flex-col gap-[8px] w-full">
                      <p className="text-primarytext-900 font-bold text-[length:var(--button-text-15-b)]">
                        What is a Description answer ?
                      </p>
                      <p className="text-secondarytext-600 font-semibold text-[length:var(--body-text16-sb)]">
                        A Description answer is one where a user describes what
                        there answer is. This ofcourse is subject to the rules
                        of a particular subject
                      </p>
                    </div>
                  </>
                )}

                <div className="flex flex-col gap-[15px]">
                  {generalError && (
                    <p className=" p-[8px] px-[20px] text-center w-fit rounded-full max-w-sm font-bold bg-red-100 text-primaryred text-[length:var(--button-text-15-b)">
                      {generalError}
                    </p>
                  )}
                  {generalSuccess && (
                    <p className=" p-[8px] px-[20px] text-center w-fit rounded-full max-w-sm font-bold bg-green-100 text-primarygreen text-[length:var(--button-text-15-b)">
                      {generalSuccess}
                    </p>
                  )}
                  <div>
                    <Button type="tertiary">{createButtonText}</Button>
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
                  <Button which="button" onClick={continueForward}>
                    {mainButtonTitle}
                  </Button>
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
                    Lorem ipsum dolor sit amet consectetur. Malesuada vitae est
                    amet enim ultrices semper. Odio convallis placerat velit
                    nunc.
                  </p>
                </div>
                <div className="flex flex-col gap-[8px] w-full">
                  <p className="text-primarytext-900 font-bold text-[length:var(--lead-text-b)]">
                    Questions
                  </p>
                  <div className="flex flex-col gap-[10px] mx-auto w-full">
                    {questions.map((question, index) => (
                      <Disclosure
                        key={index + 2}
                        as="div"
                        className="border-t-[1px] py-[10px]"
                      >
                        {({ open }) => (
                          <>
                            <div className="flex w-full flex-col sm:flex-row sm:items-center gap-[10px] md:justify-between text-secondarytext-600 font-semibold text-[length:var(--body-text16-sb) focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                              <div className="flex items-center w-full justify-between text-left">
                                <span className="flex items-center gap-[8px] first-letter:uppercase">
                                  {index + 1}.{" "}
                                  <p className="first-letter:uppercase">
                                    {question.question}?
                                  </p>
                                </span>
                                <Disclosure.Button>
                                  <UpIcon
                                    className={`${
                                      open ? "rotate-180 transform" : ""
                                    } h-[15px] w-[15px] text-purple-500`}
                                  />
                                </Disclosure.Button>
                              </div>

                              <div className="flex gap-[16px] w-full border-t-[1px] sm:border-0 pt-[12px] sm:p-0 pb-[5px] ml-auto sm:flex-1">
                                <Button
                                  which="button"
                                  type="tertiary"
                                  size="icon"
                                  buttonIconRight={<EditIcon />}
                                  onClick={() => editQuiz(index)}
                                />
                                <Button
                                  which="button"
                                  type="tertiary"
                                  size="icon"
                                  onClick={() => deleteQuiz(index)}
                                  buttonIconRight={<DeleteIcon />}
                                />
                              </div>
                            </div>

                            <Disclosure.Panel className="px-[8px] pt-4 pb-2 text-secondarytext-600 font-semibold text-[length:var(--body-text16-sb)">
                              <div className="flex items-center gap-[8px]">
                                <p className="text-secondarytext-600 font-bold text-[length:var(--body-text-13-r)]">
                                  Type:
                                </p>
                                <Button
                                  which="button"
                                  type="tertiary"
                                  size="small"
                                >
                                  {question.type === "multiple"
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
                                        {choice}
                                      </p>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {question.type === "description" && (
                                <div className="flex flex-col gap-[8px] w-full">
                                  <p className="text-primarytext-900 font-bold text-[length:var(--button-text-15-b)]">
                                    What is a Description answer ?
                                  </p>
                                  <p className="text-secondarytext-600 font-semibold text-[length:var(--body-text16-sb)]">
                                    A Description answer is one where a user
                                    describes what there answer is. This
                                    ofcourse is subject to the rules of a
                                    particular subject
                                  </p>
                                </div>
                              )}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
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
                  <Button which="button" onClick={saveAndContinue}>
                    {mainButtonTitle}
                  </Button>
                </div>
              </div>
            </>
          )}
        </CustomDialog>
      </nav>
      <Outlet />
      <footer className="md:hidden fixed bottom-0 h-fit left-0 right-0 py-[16px] z-20 flex items-center justify-between px-[10px] md:px-[24px]">
        <div className="flex items-center justify-between gap-[4px] bg-white  max-[300px]:w-[100%] w-[90%] sm:w-[50%] mx-auto rounded-[15px] max-[300px]:px-[10px] px-[20px] py-[10px] relative shadow-bottom-nav">
          <BottomNavLink
            path="/dashboard"
            title={"Dashboard"}
            active={active === 1}
            onClick={() => AsideNavLinkClicked(1)}
          >
            <DashboardHomeIcon className={"w-[22px] h-[22px]"} />
          </BottomNavLink>
          <BottomNavLink
            path="/dashboard/quizzes"
            title={"Dashboard"}
            active={active === 2}
            onClick={() => AsideNavLinkClicked(2)}
          >
            <QuizzesIcon className={"w-[22px] h-[22px]"} />
          </BottomNavLink>
          <button
            className={
              "bg-primarydark  w-[55px] h-[55px] rounded-full p-[10px] flex items-center justify-center text-white "
            }
            onClick={openModal}
          >
            <AddIcon />
          </button>
          <BottomNavLink
            path="/dashboard/invitations"
            title={"Dashboard"}
            active={active === 3}
            onClick={() => AsideNavLinkClicked(3)}
          >
            <InvitationsIcon className={"w-[22px] h-[22px]"} />
          </BottomNavLink>
          <BottomNavLink
            path="#"
            title={"Dashboard"}
            active={active === 4}
            onClick={() => AsideNavLinkClicked(4)}
          >
            <SearchIcon className={"w-[22px] h-[22px]"} />
          </BottomNavLink>
        </div>
      </footer>
    </>
  );
};

export default DashboardMains;
