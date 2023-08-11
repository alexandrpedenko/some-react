import { Outlet } from "react-router-dom"
import Navigation from "../components/navigation/Navigation"

const Main = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  )
}

export default Main