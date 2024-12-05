import React, { useState } from "react";
import HelpIcon from './Img/helpIcon.svg';
import LoginIcon from './Img/LoginIcon.svg';
import SiteLogo from './Img/site-logo.png';
import { Link } from "react-router-dom";


export default function RegNavBar() {
    return(
        <nav className="Landing_Nav Reg-Nav">
            <div className="site-container">
                <div className="nav_Contn">
                    <div className="R_Nav_Sec">
                        <Link to="/" className="site-logo">
                            <img src={SiteLogo}></img>
                        </Link>
                    </div>
                   
                </div>
            </div>
        </nav>
    )
}