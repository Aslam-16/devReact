import React, { use, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../slices/userSlice';
const Login = () => {
    console.log('Rendering Login component');

    const [email, setEmail] = React.useState('johndoe@gmail.com')
    const [password, setPassword] = React.useState('1234567');
    const [islogin, setIsLogin] = React.useState(true);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [skills, setSkills] = React.useState('');
    const [photourl, setPhotourl] = React.useState('');
    const [about, setAbout] = React.useState('');
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [error, setError] = React.useState({error:false,message:''});

    const onLogin = async() => {
        setError({error:false,message:''});
        // perform login logic here, such as sending a request to the server
        console.log('Logging in with email:', email, 'and password:', password);
        try{
       const response=await axios.post('http://localhost:1616/login',{email,password},{withCredentials:true});
         console.log('Login response:', response);
       if(response.status===200){
        dispatch(addUser(response.data.user));
        navigate('/feed');
       }
    }
    catch(err){
       console.error('Login error:', err.response?.data || err);
       setError({error:!err.response?.data?.success,message:err.response?.data?.message || 'An error occurred during login'});
    }
}
const onRegister=async()=>{
    setError({error:false,message:''});
    try{

        const info={email,password,firstName,lastName,age,gender,skills:skills.split(',').map(skill=>skill.trim()),photourl,about};
        console.log('Registering with info:', info);
        const response=await axios.post('http://localhost:1616/signup',info,{withCredentials:true});
        console.log('Register response:', response);
        if(response.status===200){
            dispatch(addUser(response.data.user));
            navigate('/feed');
           }
    }
    catch(err){
        console.error('Register error:', err.response?.data || err);
        setError({error:!err.response?.data?.success,message:err.response?.data?.message || 'An error occurred during registration'});
    }
}
useEffect(()=>{
    const timer=setTimeout(()=>{
        setError({error:false,message:''});
    },5000);

    return ()=>clearTimeout(timer);
},[error.error])

    return (
        <>
        <div className="flex items-center justify-center h-screen">
            <div className="card card-border bg-base-100 w-96 ">
                <div className="card-body">
                    <h2 className="card-title">{islogin ? 'Login' : 'Register'}</h2>
                    <p>Enter your credentials to {islogin ? 'log in' : 'create an account'}</p>
                    {!islogin && (<>
                        <label className="input validator">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </g>
                                </svg>
                            <input type="text" placeholder="firstname" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </label>
                        <label className="input validator">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </g>
                                </svg>
                            <input type="text" placeholder="lastname" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </label>
                        <label className="input validator">
                                <svg
                                    className="h-[1em] opacity-50"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <rect x="3" y="5" width="18" height="16" rx="2"></rect>
                                        <line x1="16" y1="3" x2="16" y2="7"></line>
                                        <line x1="8" y1="3" x2="8" y2="7"></line>
                                        <circle cx="12" cy="14" r="3"></circle>
                                    </g>
                                </svg>
                            <input type="text" placeholder="age" required value={age} onChange={(e) => setAge(e.target.value)} />
                        </label>
                        <label className="input validator">
                                <svg
                                    className="h-[1em] opacity-50"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <rect x="3" y="5" width="18" height="16" rx="2"></rect>
                                        <line x1="16" y1="3" x2="16" y2="7"></line>
                                        <line x1="8" y1="3" x2="8" y2="7"></line>
                                        <circle cx="12" cy="14" r="3"></circle>
                                    </g>
                                </svg>
                            <input type="text" placeholder="gender" required value={gender} onChange={(e) => setGender(e.target.value)} />
                        </label>
                        <label className="input validator">
                                <svg
                                    className="h-[1em] opacity-50"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <rect x="4" y="3" width="16" height="18" rx="2"></rect>
                                        <line x1="8" y1="8" x2="16" y2="8"></line>
                                        <line x1="8" y1="12" x2="16" y2="12"></line>
                                        <line x1="8" y1="16" x2="13" y2="16"></line>
                                    </g>
                                </svg>
                            <input type="text" placeholder="about" required value={about} onChange={(e) => setAbout(e.target.value)} />
                        </label>
                            <label className="input validator">
                                <svg
                                    className="h-[1em] opacity-50"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <circle cx="6" cy="6" r="2"></circle>
                                        <path d="M8 8l8 8"></path>
                                        <path d="M14 6l4 4"></path>
                                        <path d="M13 7l4-4"></path>
                                        <path d="M18 10l-4 4"></path>
                                    </g>
                                </svg>
                                <input type="text" placeholder="skills" required value={skills} onChange={(e) => setSkills(e.target.value)} />
                            </label>
                        <label className="input validator">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                    </g>
                                </svg>
                            <input type="text" placeholder="photourl" required value={photourl} onChange={(e) => setPhotourl(e.target.value)} />
                        </label>
                        </> )}
                    <label className="input validator">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input type="email" placeholder="mail@site.com" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </label>
                    <div className="validator-hint hidden">Enter valid email address</div>
                    <label className="input validator">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                ></path>
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </g>
                        </svg>
                        <input
                            type="password"
                            required
                            placeholder="Password"
                            // minLength={8}
                            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            // title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                            value={password} onChange={(e)=>setPassword(e.target.value)}
                        />
                    </label>
                    <p className="validator-hint hidden">
                        Must be more than 8 characters, including
                        <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                    </p>
                    <p className='error'>{error.message}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={islogin ? onLogin : onRegister }>{islogin ? 'Login' : 'Register'}</button>
                    </div>
                <p className='text-center cursor-pointer' onClick={() => setIsLogin(!islogin)}>{!islogin ? 'Already have an account? Switch to Login' : 'New User? Switch to Register'}</p>

                </div>
            </div>
        </div>
            {error.error}
            {error.error && (
                <div className="toast fixed top-4 right-4">
                    <div className="alert alert-error">
                        <span>{error.message}</span>
                    </div>
                </div>
            )}
        </>
    )
}

export default Login