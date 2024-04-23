import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import './LoginSignUp.css';

// icons
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

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
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.retypePassword) {
            console.error('Passwords do not match');
            return; // Prevent form submission if passwords do not match
        }
    
        try {
            const response = await axios.post('http://localhost:8081/api/signup', formData);
            if (response.data.token) {
                localStorage.setItem('userToken', response.data.token); // Save the token
                console.log('Signup success:', response.data.message);
                navigate('/app'); // Redirect user after successful signup
            } else {
                console.log('Signup failed:', response.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Network Error:', error.message);
                if (error.response) {
                    console.error('Server responded, status:', error.response.status);
                } else {
                    console.error('No response received from the server');
                }
            } else {
                console.error('Error:', error);
            }
        }
    };
    
    

    
    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className="header">
                <div className='status-container'>
                    <div className="form" onClick={() => navigate("/signup")}>Sign Up</div>
                    <div className="form gray" onClick={() => navigate("/login")}>Login</div>
                </div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder='Username' name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div className='input'>
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder='Email' name="email" value={formData.email} onChange={handleChange}/>
                </div>
                <div className='input'>
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='Password' name="password" value={formData.password} onChange={handleChange}/>
                </div>
                <div className='input'>
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='Retype Password' name="retypePassword" value={formData.retypePassword} onChange={handleChange}/>
                </div>
            </div>
            <button type="submit" className="submit">Sign Up</button>
        </form>
    );
}

export default SignUp;
