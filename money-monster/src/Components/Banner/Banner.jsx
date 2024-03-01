import React from 'react';
import {useNavigate, useLocation} from "react-router-dom"
import './Banner.css';

const Banner = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const isHome = location.pathname === "/";

    return (
        <div className="banner">
            <p className="banner-text" onClick={() => navigate("/")}>Money Monster</p>
            {isHome &&
                <div className="login-button">
                    <div className="login" onClick={() => navigate("/login")}>
                        <span>{"Have an account? \n Login Here!"}</span>
                    </div>
                </div>
            }
        </div>
    );
};

export default Banner;
