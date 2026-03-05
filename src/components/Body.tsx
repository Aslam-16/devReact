import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './footer'
import axios from 'axios'
import { addUser } from '../slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const Body = () => {
  const dispatch=useDispatch();
  const user=useSelector((state)=>state.user.user);
  const navigate=useNavigate();

  const getprofile=async()=>{
    try{
      const response=await axios.get('http://localhost:1616/getprofile',{withCredentials:true});
      console.log('Profile response:', response);
      if(response.status===200){
        dispatch(addUser(response.data.profile));
        console.log('User added to store:', response.data.profile);
      }
    }
    catch(err){
      if(err.response?.status===401 || err.response?.status===500){
        navigate('/login');
      }
      console.error('Profile error:', err.response?.data || err);
    }
  }
  useEffect(()=>{
    
    if(!user){
      console.log('Checking user in body component', user);
      getprofile();
    }},[]);

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