import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../slices/userSlice';
import Card from './Card';
const Profile = () => {
  console.log('Rendering Profile component');
  const [user, setUser] = React.useState({
    _id:'',
    firstName: "",
    lastName: "",
    email:'',
    gender: "",
    age:'',
    skills:"",
    photourl:""
  });
  const [loaded, setLoaded] = React.useState(false);
  const Navigate=useNavigate();
  const [disabled, setDisabled] = React.useState(true);
  const [message, setMessage] = React.useState({error:false,message:''});
  const profileuser = useSelector((state:any) => state.user.user);
  const dispatch=useDispatch()
if(!profileuser) {
  Navigate('/login');
}
  React.useEffect(()=>{
    setLoaded(false);
    console.log('Profile user from Redux store:', profileuser);
    setUser({...user,firstName:profileuser?.firstName,lastName:profileuser?.lastName,email:profileuser?.email,_id:profileuser?._id,
      gender:profileuser?.gender,skills:profileuser?.skills?.join(',') || '',photourl:profileuser?.photourl,age:profileuser?.age});
    setLoaded(true);
  },[profileuser]);

  const handleUpdate = async() => {
    // perform update logic here, such as sending a request to the server
    const profileuser={firstName:user.firstName,lastName:user.lastName,
      gender:user.gender,skills:user.skills.split(',').map((s:string) => s.trim()),photourl:user.photourl,age:user.age};
    try {
      const response = await axios.post('http://localhost:1616/updateuser', profileuser,{
        withCredentials: true
      });
      setMessage({error:false,message:response.data.message});
      setDisabled(true);
      dispatch(addUser(response.data.user));
    }
    catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if(loaded) return (
    <div className="flex items-center justify-center h-screen">
      <div className="card card-border bg-base-100 w-[50%]">
        <div className="card-body">
          <h2 className="card-title">Profile</h2>
          <button className="btn btn-secondary" onClick={() => setDisabled(!disabled)}>{disabled ? 'Edit' : 'Cancel'}</button>
          <div className='flex flex-row gap-4 justify-between w-full flex-wrap'>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input type="text" disabled={disabled} className="input" placeholder="Type here" value={user?.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input type="text" disabled={disabled} className="input" placeholder="Type here" value={user?.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input type="text" className="input" placeholder="Type here" value={user?.email} disabled={true} />
            </fieldset>
          </div>
          <div className='flex flex-row gap-4 justify-between w-full flex-wrap'>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Age</legend>
            <input type="text" disabled={disabled} className="input" placeholder="Type here" value={user?.age} onChange={(e) => setUser({...user, age: e.target.value})}    />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <input type="text" disabled={disabled} className="input" placeholder="Type here" value={user?.gender} onChange={(e) => setUser({...user, gender: e.target.value})} />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Photourl</legend>
            <input type="text" disabled={disabled} className="input" placeholder="Type here" value={user?.photourl} onChange={(e) => setUser({...user, photourl: e.target.value})} />
          </fieldset>
            <fieldset className="fieldset">
            <legend className="fieldset-legend">Skills</legend>
            <input type="text" disabled={disabled} className="input" placeholder="Type here" value={user?.skills} onChange={(e) => setUser({...user, skills: e.target.value})} />
          </fieldset>
          </div>
         {!disabled && (
            <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
          </div>)}
        </div>
      </div>
      <Card post={user} />
    </div>
  )
}

export default Profile