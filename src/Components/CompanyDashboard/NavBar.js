import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { Link, useLocation } from "react-router-dom";
import config from '../../config.js';
import './Css/Dash.css';

import DashLogo from './Img/DashLogo.png';

import SampleImage from './Img/CompLogo.png';

import LitDashLogo from './Img/liteDashLogo.png';



import HomeIcon from './Img/Homeicon.svg';
import PortalIcon from './Img/portalicon.svg';
import CertIcon from './Img/Certicon.svg';
import NoticIcon from './Img/noticIcon.svg';
import LogonIcon from './Img/logonicon.svg';
import ProfileIcon from './Img/profileicon.svg';
import HelpIcon1 from './Img/helpicon1.svg';
import HelpIcon2 from './Img/helpicon2.svg';
import SearchIcon from './Img/searchicon.svg';
import LogoutIcon from './Img/logouticon.svg';
import PlusIcon from './Img/plusicon.svg';
import MinusIcon from './Img/minus-icon.svg';
import MenuIcon from './Img/menu-icon.svg';
import CloseIcon from './Img/close_icon.svg';

import './Css/Dash.css';

export default function NavBar() {

    const [daysLeft, setDaysLeft] = useState(null); // State for days left

    const [organizationDatalogo, setOrganizationDataLogo] = useState(null); // For organization data
    const organizationID =  localStorage.getItem("authUserId");
    const organizationName =  localStorage.getItem("authName");
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


    const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      // Redirect to login if no token
      navigate("/");
    }
  }, [navigate]);


  // Fetch organization data
  useEffect(() => {
    const fetchOrganizationData = async () => {
        try {
            const response = await fetch(`${config.API_BASE_URL}/api/accounts/auth/organizations/${organizationID}/`);
            const data = await response.json();
            if (response.ok) {
                setOrganizationDataLogo(data.logo);
                // Assuming your API returns the expiry date
                const expiryDate = new Date(data.trial_end_date); // Log this value

                // console.log('expiryDate:', expiryDate);
                
                if (isNaN(expiryDate)) {
                  console.error('Invalid expiryDate:', data.expiry_date);
                } else {
                  const today = new Date();
                  const timeDiff = expiryDate - today;
                  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                  setDaysLeft(daysRemaining);
                }
                
            } else {
                console.error("Error fetching organization data:", data.message);
            }
        } catch (error) {
            console.error("Error fetching organization data:", error);
        }
    };

    fetchOrganizationData();
}, [organizationID]);



    return (
        <div className={`Dash_NavBar ${isSidebarOpen ? 'Toggle_NavBar' : ''}`}>
            <div className="NavBar_Body" onClick={closeSidebar}></div>
            <nav className="Left_Dash_Nav">
                <div className="Top_Dash_nav">
                    <Link to="/" onClick={() => handleLinkClick('/')}>
                        <img src={LitDashLogo} alt="Dashboard Logo"></img>
                    </Link>
                    <button className="Side_Nav_Toggler" onClick={closeSidebar}><img src={`${config.API_BASE_URL}${organizationDatalogo}`}  alt="Close Icon"></img></button>
                </div>
                <div className="Nav_Main">
                    <ul>


                        <li>
                            <Link to="/dashboard/" className={location.pathname === '/portal' ? 'ActiveLNav_Icon' : ''} onClick={() => handleLinkClick('/portal')}>
                                <img src={PortalIcon} alt="Portal Icon"></img>
                                <span>Upload Certificate</span>
                            </Link>
                        </li>

                        <li className="Nav_Drop_Down_Btn" onClick={toggleDropdown}>
                            <Link to="#" onClick={(event) => event.preventDefault()}>
                                <img src={CertIcon} alt="Certificates Icon"></img>
                                <span>Certificates</span>
                                <span className={`Drop_Icon ${activeDropIcon ? 'Active_Drop_Icon' : ''}`}>
                                    <img src={PlusIcon} alt="Plus Icon" className="PluseIcon_img"></img>
                                    <img src={MinusIcon} alt="Minus Icon" className="MinusIcon_img"></img>
                                </span>
                            </Link>
                        </li>

                        {isDropdownOpen && (
                            <ul className="Dropdown_Menu">
                                <li>
                                    <Link to="/dashboard/uploaded-certificates" className={location.pathname === '/uploaded-certificates' ? 'ActiveLNav_Icon' : ''} onClick={() => handleLinkClick('/uploaded-certificates')}>
                                        Uploaded Certificates
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/deleted-certificates" className={location.pathname === '/deleted-certificates' ? 'ActiveLNav_Icon' : ''} onClick={() => handleLinkClick('/deleted-certificates')}>
                                        Deleted Certificates
                                    </Link>
                                </li>
                            </ul>
                        )}

                        <li>
                            <Link to="/dashboard/notification" className={location.pathname === '/notification' ? 'ActiveLNav_Icon' : ''} onClick={() => handleLinkClick('/notification')}>
                                <img src={NoticIcon} alt="Notification Icon"></img>
                                <span>Notification</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard/logon-info" className={location.pathname === '/logon-info' ? 'ActiveLNav_Icon' : ''} onClick={() => handleLinkClick('/logon-info')}>
                                <img src={LogonIcon} alt="Logon Icon"></img>
                                <span>Logon information</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard/profile" className={location.pathname === '/profile' ? 'ActiveLNav_Icon' : ''} onClick={() => handleLinkClick('/profile')}>
                                <img src={ProfileIcon} alt="Profile Icon"></img>
                                <span>Profile</span>
                            </Link>
                        </li>

                        <li className="Mobile_LI">
                            <Link to="/dashboard/pricing" className={`mobile_Price_Btn ${location.pathname === '/pricing' ? 'ActiveLNav_Icon' : ''}`} onClick={() => handleLinkClick('/pricing')}>
                                Pricing
                            </Link>
                        </li>

                        <div className="upload_Add">
                            <h3>Upgrade to Pro</h3>
                            <p>Upload up to unlimited certificates a day</p>
                            <Link to="/" className={location.pathname === '/upgrade' ? 'ActiveLNav_Icon' : ''} onClick={() => handleLinkClick('/upgrade')}>Upgrade</Link>
                        </div>


                        <li>
                        <button onClick={() => {
                            localStorage.clear(); // Clear token
                            navigate("/"); // Redirect to login
                        }}>
                             <img src={LogoutIcon} alt="Logout Icon"></img>
                           <span>Logout </span>
                        </button>
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

                                <Link to="/dashboard/" onClick={() => handleLinkClick('/')}>
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
                                <Link to="/help" className={location.pathname === '/help' ? 'ActiveLNav_Icon' : ''} onClick={() => handleLinkClick('/help')}>
                                    <img src={HelpIcon2} alt="Help Icon"></img>
                                </Link>

                                <Link className="mobile_Search_toggler" onClick={toggleSearch}>
                                    <img src={SearchIcon} alt="Search Icon"></img>
                                </Link>
                            </div>


                            <div className="Sub_Conunter">
                            {daysLeft >= 1 ? (
                                <>
                                <span className={daysLeft < 4 ? "blinking-text" : ""}>{daysLeft}</span>
                                <p><b> {daysLeft > 1 ? "days" : "day"} left</b> for your free trial</p>
                                </>
                            ) : (
                                <p>Your free trial period has expired</p>
                            )}
                            </div>



                            <div className="Pricing_Btn_Sec">
                                <Link to="/dashboard/pricing" className={location.pathname === '/pricing' ? 'ActiveLNav_Icon' : ''} onClick={() => handleLinkClick('/pricing')}>Pricing</Link>
                            </div>
                            <div className="Profile_Img_Sec">
                                <img  src={`${config.API_BASE_URL}${organizationDatalogo}`}  alt="Sample"></img>
                                <span></span>

                                <div className="Drop_gafs">
                                <div className="Drop_gafs_main">
                                    <h3>{organizationName}</h3>
                                <button onClick={() => {
                                        localStorage.clear(); // Clear token
                                        navigate("/"); // Redirect to login
                                    }}>
                                     Logout
                                    </button>
                                    </div>
                                </div>
                              
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
