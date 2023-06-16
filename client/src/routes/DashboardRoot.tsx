import { Outlet } from 'react-router-dom'
import { DashboardAsideNav, DashboardTopNav} from '../components'

const DashboardRoot = () => {
  return (
    <>
    <DashboardTopNav />
    <Outlet />
    <DashboardAsideNav />
    </>
  )
}

export default DashboardRoot