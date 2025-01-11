import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HelpIcon from './Img/helpIcon.svg';
import LoginIcon from './Img/LoginIcon.svg';
import SiteLogo from './Img/site-logo.png';

export default function SiteNavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
    };



    return (
        <nav className="Landing_Nav">
            <div className="site-container">
                <div className="nav_Contn">
                    <div className="R_Nav_Sec">
                        <Link to="/" className="site-logo">
                            <img src={SiteLogo} alt="Site Logo" />
                        </Link>
                    </div>
                    <div className="L_Nav_Sec">
                        <ul>
                            <li>
                                <Link to="/help">
                                    <img src={HelpIcon} alt="Help and Support" />
                                    <span>Help and Support</span>
                                </Link>
                            </li>
                            {isLoggedIn ? (
                                <li>
                                    <Link to="/dashboard" className="login-btn" >
                                        <img src={LoginIcon} alt="Dashboard" />
                                        <span>Dashboard</span>
                                    </Link>
                                </li>
                            ) : (
                                <li>
                                    <Link to="/login" className="login-btn">
                                        <img src={LoginIcon} alt="Login" />
                                        <span>Login</span>
                                    </Link>
                                </li>
                            )}

                            {isLoggedIn ? (
                            <li>
                            <Link to="/signup" className="signup-btn" onClick={handleLogout}>
                                <span>Log out</span>
                            </Link>
                            </li>
                            ) : (
                                <li>
                                    <Link to="/signup" className="login-btn">
                                        <img src={LoginIcon} alt="Login" />
                                        <span>Sign Up for free</span>
                                    </Link>
                                </li>
                            )}

                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
