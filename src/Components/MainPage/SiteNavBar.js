// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import HelpIcon from './Img/helpIcon.svg';
// import LoginIcon from './Img/LoginIcon.svg';
// import SiteLogo from './Img/site-logo.png';

// export default function SiteNavBar() {

//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Check if user is logged in by looking for the token in localStorage
//         const token = localStorage.getItem("authToken");

//         // console.log("token")
//         // console.log(token)
//         // console.log("token")

//         setIsLoggedIn(!!token);
//       }, []);


//       const handleLogout = () => {
//         // Clear localStorage
//         localStorage.clear();
//         // Update logged-in state
//         setIsLoggedIn(false);
//         // Navigate 
//         // 
//         // to the logout route
//         navigate("/logout");
//       };
    
//     return (
//         <nav className="Landing_Nav">
//             <div className="site-container">
//                 <div className="nav_Contn">
//                     <div className="R_Nav_Sec">
//                         <Link to="/" className="site-logo">
//                             <img src={SiteLogo} alt="Site Logo" />
//                         </Link>
//                     </div>
//                     <div className="L_Nav_Sec">
//                         <ul>
//                             <li>
//                                 <Link to="/help">
//                                     <img src={HelpIcon} alt="Help and Support" />
//                                     <span>Help and Support</span>
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to="/login" className="login-btn">
//                                     <img src={LoginIcon} alt="Login" />
//                                     <span>Login</span>
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to="/signup" className="signup-btn">
//                                 <span>Signup for free</span>
//                                 </Link>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// }




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
                                    <Link to="/logout" className="login-btn" onClick={handleLogout}>
                                        <img src={LoginIcon} alt="Logout" />
                                        <span>Logout</span>
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
                            <li>
                                <Link to="/signup" className="signup-btn">
                                    <span>Signup for free</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
