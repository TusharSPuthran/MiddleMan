import React, { useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const UserLogin = () => {
    const [isSignUpActive, setIsSignUpActive] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUpActive(true);
    };

    const handleSignInClick = () => {
        setIsSignUpActive(false);
    };
    let navigate = useNavigate()
    const [userInfo, setUserInfo] = useState("")
    const handleChange = (event) => {
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value })
    };

    const handleLogin = (event) => {
        console.log(userInfo)
        Axios.post('http://localhost:7000/user/login', userInfo)
            .then(async (Response) => {
                console.log(Response.data)
                if (Response.data.success) {
                    await localStorage.setItem("user", JSON.stringify(Response.data.loggedInUser))
                    await localStorage.setItem("Token", JSON.stringify(Response.data.authToken));
                    await navigate("/")
                }
                alert(Response.data.message)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleSignup = (event) => {
        console.log(userInfo)
        // console.log(userProfile)
        // const formData = new FormData()
        // formData.append("email", userInfo.email)
        // formData.append("password", userInfo.password)
        Axios.post('http://localhost:7000/user/Register', userInfo)
            // console.log("success")
            .then(async (Response) => {
                console.log(Response)
                if (Response.data.success) {
                    await localStorage.setItem("user", JSON.stringify(Response.data.loggedInUser))
                    // await localStorage.setItem("token", JSON.stringify(Response.data.authToken))
                    alert(Response.data.message)
                    await navigate("/login")
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="body">
            <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}`}>
                <div className="sign-up">
                    <div className='form'>
                        <h1 className='h1'>Create Account</h1>
                        <p className='p'>or use your email for registration</p>
                        <input className='input' type="text" name="name" onChange={handleChange} placeholder="Name" required />
                        <input className='input' type="number" name="phone" onChange={handleChange} placeholder="Phone Number" required />
                        <input className='input' type="email" name="email" onChange={handleChange} placeholder="Email" required />
                        <input className='input' type="password" name="password" onChange={handleChange} placeholder="Password" required />
                        <input className='input' type="file" name="" onChange={handleChange} placeholder="Password" required />
                        <button type="submit" name="submit1" className="button" onClick={handleSignup}>Sign Up</button>
                    </div>
                </div>
                <div className="sign-in">
                    <div className='form'>
                        <h1 className='h1'>Sign in</h1>
                        <p className='p'>or use your account</p>
                        <input className='input' type="email" name="email" onChange={handleChange} placeholder="Email" required />
                        <input className='input' type="password" name="password" onChange={handleChange} placeholder="Password" required />
                        <button type="submit" className="button" name="login" onClick={handleLogin}>login</button>
                    </div>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-left">
                            <h1 className='h1'>Welcome Back</h1>
                            <p className='p'>login with your personal info</p>
                            <button className='button' id="signin" onClick={handleSignInClick}>Sign In</button>
                        </div>
                        <div className="overlay-right">
                            <h1 className='h1'>New Here?</h1>
                            <p className='p'>Please enter details to start your journey</p>
                            <button className='button' id="signup" onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
