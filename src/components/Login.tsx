import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../slices/userSlice';
const Login = () => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('');
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [error, setError] = React.useState({error:false,message:''});

    const onLogin = async() => {
        // perform login logic here, such as sending a request to the server
        console.log('Logging in with email:', email, 'and password:', password);
        try{
       const response=await axios.post('http://localhost:1616/login',{email,password});
         console.log('Login response:', response);
       if(response.status===200){
        navigate('/profile');
        dispatch(addUser(response.data.user));
       }
    }
    catch(err){
       console.log('Login error:', err);
       setError({error:true,message:err.response?.data?.message || 'An error occurred during login'});
    }
}
    return (
        <>
            {error.error && (
                <div className="toast">
                    <div className="alert alert-error">
                        <span>{error.message}</span>
                    </div>
                </div>
            )}
        <div className="flex items-center justify-center h-screen">
            <div className="card card-border bg-base-100 w-96 ">
                <div className="card-body">
                    <h2 className="card-title">Login</h2>
                    <p>Enter your credentials to log in</p>
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
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={onLogin}>Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login