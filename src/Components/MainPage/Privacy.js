import React, { useState } from "react";
import SiteNavBar from './SiteNavBar';

import MainFooter from './MainFooter';


export default function Privacy() {
    const currentYear = new Date().getFullYear(); // Get the current year
    return(
        <div className="MMha-page">
            <div className="MMha-page-header">
            <SiteNavBar />

            <div className="site-container">
                <div className="hero-Blam">
                    <h2 className="big-text">Privacy Policy</h2>
                </div>
            </div>

          </div>


            <div className="hagsh-sec">
                <div className="site-container">
                    <div className="hagsh-main">
                        <div className="hagsh-Box">
                            <h4>Lorem ipsum dolor sit</h4>

                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
	consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
	cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
	proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

    <h4>Lorem ipsum dolor sit</h4>
                            
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
	consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
	cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
	proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

    <h4>Lorem ipsum dolor sit</h4>
                            
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
	consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
	cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
	proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

    <h4>Lorem ipsum dolor sit</h4>
                            
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
	consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
	cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
	proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

    <ul>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit</li>
    </ul>
    <h4>Lorem ipsum dolor sit</h4>

    <ol>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit</li>
    </ol>

                        </div>
                    </div>
                </div>
            </div>

         <MainFooter />

                
        </div>
    )
}