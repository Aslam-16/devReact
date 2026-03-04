import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './footer'

const Body = () => {
  return (
    <>
        {/* navbar and footer will be my main route staic compoenents 
        and the outlet will be my dynamic component that will change based on the route */}
    <NavBar />
    {/* OUTLET component comes from the child routes of this body component */}
    <Outlet />
    <Footer/>
    </>
  )
}

export default Body