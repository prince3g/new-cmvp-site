import React, { useState } from "react";
import HelpIcon from './Img/helpIcon.svg';
import LoginIcon from './Img/LoginIcon.svg';
import SiteLogo from './Img/site-logo.png';


export default function SiteNavBar() {
    return(
        <nav className="Landing_Nav">
            <div className="site-container">
                <div className="nav_Contn">
                    <div className="R_Nav_Sec">
                        <a href="#" className="site-logo">
                            <img src={SiteLogo}></img>
                        </a>
                    </div>
                    <div className="L_Nav_Sec">
                        <ul>
                            <li><a href="#"><img src={HelpIcon}></img><span>Help and Support</span></a></li>
                            <li><a href="#" className="login-btn"><img src={LoginIcon}></img><span>Login</span></a></li>
                            <li><a href="#" className="signup-btn"><span>Signup for free</span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}