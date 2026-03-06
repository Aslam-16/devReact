
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router";
import { removeUser } from "../slices/userSlice";
const NavBar = () => {
  console.log('Rendering NavBar component');
  const user=useSelector(state=>state.user.user)
  const dispatch=useDispatch();
  const Navigate=useNavigate();
  console.log('user in navbar',user);
  const onLogout=async ()=>{
    await axios.post('http://localhost:1616/logout',{},{withCredentials:true});
    dispatch(removeUser());
    Navigate('/login');
  }
  if(!user) return null;
  return (
      <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/feed" className="btn btn-ghost text-xl">👨‍💻DevTinder</Link>
  </div>
 {user && <div className="flex gap-2 items-center">
    <div className="text-sm">{user?.firstName} {user?.lastName}</div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user?.photourl || 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'} />
        </div>
      </div>
      <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={onLogout}>Logout</a></li>
      </ul>
    </div>
  </div>}
</div>
  )
}

export default NavBar