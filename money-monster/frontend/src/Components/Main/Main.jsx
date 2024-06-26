import {useNavigate} from "react-router-dom"
import "./Main.css"

import backgroundGif from "../Assets/money.gif";


const Main = () => {

    const navigate = useNavigate();

    return (
        <div className="about" 
            style={{ 
            // backgroundImage: `url(${backgroundGif})`

        }}>
            <span className="main-text">Make Money less of a Monster when you work with us!</span>
            <div className="create-button">
                <div className="create-account" onClick={() => navigate("/signup")}>
                    <span>{"Create Account"}</span>
                </div>
            </div>
        </div>

        
    )
}

export default Main;