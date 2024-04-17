import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import './LoginSignUp.css'

// icons
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

const SignUp = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        retypePassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Received ${name}: ${value}`);
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8081/api/signup', formData);
            console.log('Response:', JSON.stringify(response.data));
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <div className='container'>
            <div className ="header">
                <div className='status-container'>
                    <div className="form" onClick={()=>{}}>Sign Up</div>
                    <div className="form gray" onClick={()=>{navigate("/login")}}>Login</div>
                </div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder='Username' name="username" fieldvalue={formData.username} onChange={handleChange} />
                </div>
                <div className='input'>
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder='Email' name="email" fieldvalue={formData.email} onChange={handleChange}/>
                </div>
                <div className='input'>
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='Password' name="password" fieldvalue={formData.password} onChange={handleChange}/>
                </div>
                <div className='input'>
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='Retype Password' name="retypePassword" fieldvalue={formData.retypePassword} onChange={handleChange}/>
                </div>
            </div>
            <div className="submit" onClick={handleSubmit}>Sign Up</div>
        </div>
    )
}

export default SignUp;