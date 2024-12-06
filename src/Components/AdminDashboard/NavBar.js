import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './Css/Dash.css';

import DashLogo from './Img/DashLogo.png';

import LitDashLogo from './Img/liteDashLogo.png';

import HomeIcon from './Img/Homeicon.svg';
import PortalIcon from './Img/portalicon.svg';
import NoticIcon from './Img/noticIcon.svg';
import ProfileIcon from './Img/profileicon.svg';
import SearchIcon from './Img/searchicon.svg';
import LogoutIcon from './Img/logouticon.svg';
import MenuIcon from './Img/menu-icon.svg';
import CloseIcon from './Img/close_icon.svg';
import UserPlaceholder from './Img/user-placeholder.png';

import './Css/Dash.css';

export default function NavBar() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false); // State to manage search visibility
    const [activeDropIcon, setActiveDropIcon] = useState(false); // State to manage active drop icon
    const location = useLocation();

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
        setActiveDropIcon(!activeDropIcon); // Toggle active class for Drop_Icon
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const handleLinkClick = (path) => {
        closeSidebar();
    };

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    const closeSearch = () => {
        setShowSearch(false);
    };

    return (
        <div className={`Dash_NavBar ${isSidebarOpen ? 'Toggle_NavBar' : ''}`}>
            <div className="NavBar_Body" onClick={closeSidebar}></div>
            <nav className="Left_Dash_Nav">
                <div className="Top_Dash_nav">
                    <Link to="/" onClick={() => handleLinkClick('/')}>
                        <img src={LitDashLogo} alt="Dashboard Logo"></img>
                    </Link>
                    <button className="Side_Nav_Toggler" onClick={closeSidebar}><img src={CloseIcon} alt="Close Icon"></img></button>
                </div>
                <div className="Nav_Main">
                    <ul>
                        <li>
                            <Link to="/" className={location.pathname === '/' ? 'ActiveLNav_Icon' : ''} onClick={() => handleLinkClick('/')}>
                                <img src={HomeIcon} alt="Home Icon"></img>
                                <span>Admin</span>
                            </Link>
                        </li>



                        <li>
                            <Link to="/users" className={location.pathname === '/users' ? 'ActiveLNav_Icon' : ''} onClick={() => handleLinkClick('/profile')}>
                                <img src={ProfileIcon}></img>
                                <span>Registered users</span>
                            </Link>
                        </li>

                        
                        <li>
                            <Link to="/subscriptions" className={location.pathname === '/subscriptions' ? 'ActiveLNav_Icon' : ''} onClick={() => handleLinkClick('/profile')}>
                                <img src={PortalIcon}></img>
                                <span>Subscriptions</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/notification" className={location.pathname === '/notification' ? 'ActiveLNav_Icon' : ''} onClick={() => handleLinkClick('/notification')}>
                                <img src={NoticIcon} alt="Notification Icon"></img>
                                <span>Notification</span>
                            </Link>
                        </li>



                        <li>
                            <Link to="/logout" className={location.pathname === '/logout' ? 'ActiveLNav_Icon' : ''} onClick={() => handleLinkClick('/logout')}>
                                <img src={LogoutIcon} alt="Logout Icon"></img>
                                <span>Log out</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <nav className="Top_NaV">
                <div className={`search-sec ${showSearch ? 'show-search-sec' : ''}`}>
                    <div className="large-container">
                        <form className="search-form">
                            <button><img src={SearchIcon} alt="Search Icon"></img></button>
                            <input type="text" name="" placeholder="Search"></input>
                        </form>
                        <button className="close-search" onClick={closeSearch}>
                            <img src={CloseIcon} alt="Close Icon"></img>
                        </button>
                    </div>
                </div>
                <div className="Main_Top_NaV">
                    <div className="Large-container">
                        <div className="L_NN_V_Sec">
                            <div className="Mobile_IcoNs">
                                <button className="Side_Nav_toggler" onClick={toggleSidebar}><img src={MenuIcon} alt="Menu Icon"></img></button>

                                <Link to="/" onClick={() => handleLinkClick('/')}>
                                    <img src={DashLogo} alt="Dashboard Logo"></img>
                                </Link>
                            </div>

                            <div className="Search_Sec">
                                <input type="text" placeholder="Search"></input>
                                <button className="mobile_Search_toggler" onClick={toggleSearch}><img src={SearchIcon} alt="Search Icon"></img></button>
                            </div>
                        </div>

                        <div className="R_NN_V_Sec">
                            <div className="Help_Icon">

                                <Link className="mobile_Search_toggler" onClick={toggleSearch}>
                                    <img src={SearchIcon} alt="Search Icon"></img>
                                </Link>
                            </div>
                           
                            <div className="Pricing_Btn_Sec">
                                <a href="#">Logout</a>
                            </div>
                            <div className="Profile_Img_Sec">
                                <img src={UserPlaceholder} alt="Profile"></img>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}