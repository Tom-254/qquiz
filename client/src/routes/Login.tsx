import { Link } from "react-router-dom"
import { Logo, LogoIconSmall } from "../assets"
import { Button } from "../components"

const Login = () => {
  return (
    <main className="bg-white flex flex-col justify-center">
    <section className="max-w-[1280px] flex-1 px-[20px] w-full h-full mx-auto flex items-center justify-content">
      <div className="max-w-[564px] mx-auto my-[128px] py-[52px] px-[30px] md:px-[52px] border-radius rounded-[24px] w-full shadow-custom-white ">
        <Link to="/" className="">
          <Logo className="hidden lg:block" />
          <LogoIconSmall className="lg:hidden" />
        </Link>
        <div>
          <p>
          Hi Welcome to <span>Qquizz!</span>
          </p>
          <p>
            Join us and enjoy creating custom quizzes on any topic quickly and inviting others to take part in the quizzes.
          </p>
        </div>
        <div>
          <Button full={true}>

          </Button>
        </div>
      </div>
    </section>
  </main>
  )
}

export default Login