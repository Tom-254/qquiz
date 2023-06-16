import { Outlet } from 'react-router-dom'
import { Footer, Navbar } from '../components'

const Root = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}

export default Root