import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
import './LoginSignUp.css'

// icons
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

const Login = () => {

    const navigate = useNavigate();

    return (
        <div className='container'>
            <div className ="header">
                <div className='text'>Log In</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder='Username' />
                </div>
                <div className='input'>
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='Password' />
                </div>
            </div>
            <div className='submit-container'>
                <div className="submit gray" onClick={()=>{navigate("/signup")}}>Sign Up</div>
                <div className="submit" onClick={()=>{navigate("/app")}}>Login</div>
            </div>
        </div>
    )
}

export default Login;