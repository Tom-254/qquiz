import { Link } from "react-router-dom";
import {
  AboutUsImage,
  ArrowRightUp,
  HeroImage,
  HyphenWhite,
  LongRightArrow,
  OurProcessImage,
} from "../assets";
import { Button } from "../components";

const Home = () => {
  return (
    <>
      <section className="my-[128px]">
        <div className="max-w-[1280px] xl:mx-auto flex flex-col gap-[70px] mx-[20px] md:mx-[50px] lg:mx-[80px] items-center justify-between bg-white">
          <div className="flex flex-col items-center text-center gap-[30px]">
            <div className="border-[1px] border-borderdarker rounded-full  border-dashed  flex flex-col sm:flex-row gap-[10px] sm:gap-[47px] px-[12px] sm:px-[15px] py-[8px] sm:py-[4px] items-center gap-[47]px">
              <p className="text-primarytext-900 font-bold text-[length:var(--button-text-15-b)]">
                Interested in us ? Explore our features.
              </p>
              <Button size="xsmall" buttonIconRight={<LongRightArrow />} />
            </div>
            <p className="text-primarytext-1000 font-bold text-[length:var(--h3-title-40)] leading-[70px] md:text-[length:var(--h1-title-56)] w-[90%] lg:w-[70%] capitalize -mt-[16px]">
              Introducing <span className="text-primary">Qquizz</span> - create
              and share quizzes with friends Quickly
            </p>
            <p className="text-primarytext-900 font-semibold text-[length:var(--lead-text-sb-16)] w-[90%] lg:w-[40%]">
              With Qquizz, you can easily create custom quizzes on any topic and
              invite your friends to take them
            </p>
            <Button buttonIconRight={<LongRightArrow />}>
              <Link to="/register">Create an account</Link>
            </Button>
          </div>

          <img
            className="rounded-[14px] border-[1px] border-borderlight"
            src={HeroImage}
            alt="Hero Section"
          />
        </div>
      </section>
      <section className="my-[128px]">
        <div className="max-w-[1280px] xl:mx-auto flex flex-col gap-[70px] mx-[20px] md:mx-[50px] lg:mx-[80px] items-center justify-between bg-white">
          <div className="flex flex-col items-center text-center gap-[30px]">
            <div className="rounded-full bg-primaryaccent flex items-center h-[36px] w-fit">
              <p className="text-primary font-bold text-[length:var(--button-text-15-b)] px-[24px]">
                Our Features
              </p>
            </div>
            <p className="text-primarytext-1000 font-bold leading-[50px] text-[length:var(--h4-title-32)] md:text-[length:var(--h3-title-40)] w-[90%] lg:w-[70%] capitalize -mt-[16px]">
              Discover the amazing features we offer! Much More Than you Need
            </p>
            <p className="text-primarytext-900 font-semibold text-[length:var(--lead-text-sb-16)] w-[90%] lg:w-[80%]">
              Create custom quizzes on any topic, share them with friends, take
              quizzes and submit your answers, keep track of quiz activity, and
              access your quiz history.
            </p>
          </div>
          <div className="flex flex-wrap gap-[20px] justify-center">
            <div className="w-[315px] border-[1px] border-border flex flex-col gap-[20px] p-[24px] bg-white rounded-[24px]">
              <p className="text-primarylight font-semibold text-[length:var(--body-text-13-r)] uppercase">
                CUSTOM
              </p>
              <p className="text-primarytext-1000 font-bold text-[length:var(--h5-title-24)]">
                Create Quizzes
              </p>
              <p className="text-primarytext-900 font-medium">
                Easily create custom quizzes on any topic with multiple choice
                questions.
              </p>
              <div className="flex items-center border-t-[1px] border-border pt-[24px] w-full">
                <div className="flex bg-green-100 ml-auto w-full"></div>
                <Button size="icon" buttonIconRight={<ArrowRightUp />} />
              </div>
            </div>
            <div className="w-[315px] border-[1px] border-border flex flex-col gap-[20px] p-[24px] bg-white rounded-[24px]">
              <p className="text-primarylight font-semibold text-[length:var(--body-text-13-r)] uppercase">
                SHARE
              </p>
              <p className="text-primarytext-1000 font-bold text-[length:var(--h5-title-24)]">
                Share Quizzes
              </p>
              <p className="text-primarytext-900 font-medium">
                Share your quizzes with friends by sending them an invitation to
                take the quiz.
              </p>
              <div className="flex items-center border-t-[1px] border-border pt-[24px] w-full">
                <div className="flex bg-green-100 ml-auto w-full"></div>
                <Button size="icon" buttonIconRight={<ArrowRightUp />} />
              </div>
            </div>
            <div className="w-[315px] border-[1px] border-border flex flex-col gap-[20px] p-[24px] bg-white rounded-[24px]">
              <p className="text-primarylight font-semibold text-[length:var(--body-text-13-r)] uppercase">
                TAKE
              </p>
              <p className="text-primarytext-1000 font-bold text-[length:var(--h5-title-24)]">
                Take Quizzes
              </p>
              <p className="text-primarytext-900 font-medium">
                Take quizzes created by your friends and submit your answers to
                see how well you know the topic.
              </p>
              <div className="flex items-center border-t-[1px] border-border pt-[24px] w-full">
                <div className="flex bg-green-100 ml-auto w-full"></div>
                <Button size="icon" buttonIconRight={<ArrowRightUp />} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="my-[128px]">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center lg:flex-row gap-[60px] lg:gap-[10px] bg-white">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left  gap-[30px] ml-[20px] md:ml-[50px] lg:ml-[80px] md:w-[80%] lg:w-[70%]">
            <div className="rounded-full bg-primaryaccent flex items-center h-[36px] w-fit">
              <p className="text-primary font-bold text-[length:var(--button-text-15-b)] px-[24px] capitalize">
                About us
              </p>
            </div>
            <p className="text-primarytext-1000 font-bold leading-[50px] text-[length:var(--h4-title-32)] md:text-[length:var(--h3-title-40)] w-[90%] lg:w-[70%] capitalize -mt-[16px] capitalize">
              passionate about Making Quizzing Fun for everyone
            </p>
            <p className="text-primarytext-900 font-semibold text-[length:var(--lead-text-sb-16)] w-[90%] lg:w-[80%]">
              Create custom quizzes on any topic, share them with friends, take
              quizzes and submit your answers, keep track of quiz activity, and
              access your quiz history.
            </p>
            <div className="flex gap-[32px] flex-col lg:flex-row items-center">
              <Button>
                <p className="flex items-center gap-2">
                  Get Started <HyphenWhite />{" "}
                  <span className="font-medium"> It's free</span>{" "}
                </p>
              </Button>
              <Button type="link" buttonIconRight={<LongRightArrow />}>
                See how it works
              </Button>
            </div>
          </div>
          <div className="flex w-[50%] mx-[20px]  lg:mr-[80px]">
            <img className="w-full" src={AboutUsImage} alt="About Us" />
          </div>
        </div>
      </section>
      <section className="my-[128px]">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center lg:flex-row-reverse gap-[60px] lg:gap-[10px] bg-white">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left  gap-[30px] ml-[20px] md:ml-[50px] lg:ml-[80px] md:w-[80%] lg:w-[70%]">
            <div className="rounded-full bg-primaryaccent flex items-center h-[36px] w-fit">
              <p className="text-primary font-bold text-[length:var(--button-text-15-b)] px-[24px] capitalize">
                Our Process
              </p>
            </div>
            <p className="text-primarytext-1000 font-bold leading-[50px] text-[length:var(--h4-title-32)] md:text-[length:var(--h3-title-40)] w-[90%] lg:w-[70%] capitalize -mt-[16px] capitalize">
              Steps to join us
            </p>
            <div className="flex flex-col items-center lg:items-start gap-[20px] w-fit">
                <p className="text-primarytext-900 font-semibold text-[length:var(--lead-text-sb-16)] w-[90%] text-left lg:w-[70%]">
                  Joining Qquiz is easy and only takes a few simple steps! Here’s
                  how to get started:
                </p>
                <div className="flex gap-[10px] flex-col justify-center w-[92%]">
                  <div className="flex gap-[10px] text-left">
                    <div className="flex justify-center items-center border-[1px] h-[24px] w-[24px] p-[20px] rounded-full border-border ">
                        <p className="text-primarytext-900 font-bold text-[length:var(--body-text-bold-16)] normal-case">01</p>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                      <p className="text-primarytext-900 font-semibold text-[length:var(--lead-text-sb-20)] normal-case">Create an Account</p>
                      <p className="text-primarytext-900 font-medium text-[length:var(--body-text-13-r)] w-[95%] normal-case  break-words">
                        To create an account you’ll need to provide some basic
                        information such as your username, email, and password.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-[10px] text-left">
                    <div className="flex justify-center items-center border-[1px] h-[24px] w-[24px] p-[20px] rounded-full border-border ">
                        <p className="text-primarytext-900 font-bold text-[length:var(--body-text-bold-16)] normal-case">02</p>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                      <p className="text-primarytext-900 font-semibold text-[length:var(--lead-text-sb-20)] normal-case">Verify Your Email</p>
                      <p className="text-primarytext-900 font-medium text-[length:var(--body-text-13-r)] w-[95%] normal-case  break-words">
                      Check your email for a verification message from QUIZZO and follow the instructions to verify your email address.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-[10px] text-left">
                    <div className="flex justify-center items-center border-[1px] h-[24px] w-[24px] p-[20px] rounded-full border-border ">
                        <p className="text-primarytext-900 font-bold text-[length:var(--body-text-bold-16)] normal-case">03</p>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                      <p className="text-primarytext-900 font-semibold text-[length:var(--lead-text-sb-20)] normal-case">Start Creating and Taking Quizzes</p>
                      <p className="text-primarytext-900 font-medium text-[length:var(--body-text-13-r)] w-[95%] normal-case  break-words">
                      Once your account is set up and verified, you can start creating and taking quizzes right away!
                      </p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div className="flex w-[50%] mx-[20px]  lg:ml-[80px]">
            <img className="w-full" src={OurProcessImage} alt="About Us" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
