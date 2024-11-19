import React, { useState } from "react";
import SiteNavBar from './SiteNavBar';


export default function LandingPage() {
    const currentYear = new Date().getFullYear(); // Get the current year
    return(
        <div className="Landing-page">
            <SiteNavBar />
            <div className="site-container">
                <div className="llal_Hero_Sec">
                    <h2>Certificate Management and Verification Portal</h2>
                    <p>Efficiently validate, issue, and manage your digital certificates with our secure and user-friendly verification and management portal.</p>
                    <a href="#">Signup for free</a>
                </div>
           
            </div>
            <div className="hero-foot">
            <div className="site-container">
                    <p>Powered by <a href="#">Proliance LTD</a></p>
                    <p>© {currentYear}</p>
                    </div>
                </div>
        </div>
    )
}