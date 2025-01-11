import React, { useState } from "react";
import SiteNavBar from './SiteNavBar';

import { Link, useNavigate } from "react-router-dom";


export default function MainFooter() {
    const currentYear = new Date().getFullYear(); // Get the current year
    return(
        <div className="hero-foot">
        <div className="site-container">
            <p>Powered by <a href="https://prolianceltd.com" target="_blank" rel="noopener noreferrer">Proliance LTD (ISO 9001 certified company)</a></p>

            <div className="ahhs-Ul">
                <ul>
                    <li><Link to="/terms">Terms of use</Link></li>
                    <li><Link to="/privacy">Privacy Policy</Link></li>
                </ul>
                
            <p>© {currentYear}</p>

            </div>


        </div>
    </div>
    )
}