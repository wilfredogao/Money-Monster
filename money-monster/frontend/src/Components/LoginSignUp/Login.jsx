import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import './LoginSignUp.css'

// icons
import user_icon from '../Assets/person.png';
import password_icon from '../Assets/password.png';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [loginFail, setLoginFail] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const fetchUserData = async (token) => {
        try {
            const response = await axios.get('http://localhost:8081/api/user-data', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            // Assuming you will handle the user data in your state or context
            // For example, updating a global state or context
            console.log('Fetched user data:', response.data);
            navigate('/app', { state: { budget: response.data.budget, totalExpenses: response.data.totalExpenses } });
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setLoginFail('Failed to load user data');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/login', formData);
            if (response.data.message === 'Login successful!') {
                localStorage.setItem('userToken', response.data.token); // Save the token
                console.log('Login success!');
                fetchUserData(response.data.token);
            } else {
                setLoginFail("Login Failed: " + response.data.message);
            }
        } catch (error) {
            const errorMessage = error.response ? `Login failed: ${error.response.status} ${error.response.statusText}` : 'Network error, please try again.';
            setLoginFail(errorMessage);
        }
    };

    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className="header">
                <div className='status-container'>
                    <div className="form gray" onClick={() => navigate("/signup")}>Sign Up</div>
                    <div className="form" onClick={() => {}}>Login</div> 
                </div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder='Username' name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div className='input'>
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='Password' name="password" value={formData.password} onChange={handleChange} />
                </div>
            </div>
            {loginFail && <div className="error-message">{loginFail}</div>}
            <button type="submit" className="submit">Login</button>
        </form>
    );
}

export default Login;
