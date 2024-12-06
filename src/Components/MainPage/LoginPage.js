// import React, { useState } from "react";
// import RegNavBar from "./RegNavBar";
// import config from "../../config.js";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import ShowPassIcon from "./Img/showPass-icon.svg";
// import HidePassIcon from "./Img/hidePass-icon.svg";

// const LoginPage = () => {
//   const [passwordType, setPasswordType] = useState("password");

//   const togglePasswordVisibility = () => {
//     setPasswordType((prevType) => (prevType === "password" ? "text" : "password"));
//   };


//   //  `${config.API_BASE_URL}/api/accounts/auth/login/`

//   return (
//     <div>
//       <RegNavBar />

//       <section className="Get-Seecos login-desis">
//         <div className="site-container">
//           <div className="Reg_Sec">
//             <div className="Reg_Box">
//               <div className="Reg_Box_Header">
//                 <h3>Welcome Back</h3>
//                 <p>Log in to your CMVP account</p>
//               </div>
//               <form className="Reg_Form">
//                 <div className="Reg_Input">
//                   <input
//                     type="text"
//                     name="email"
//                     placeholder="Email"
//                   />
//                 </div>
//                 <div className="Reg_Input pass-Input">
//                   <input
//                     type={passwordType}
//                     id="passwordField"
//                     placeholder="Password"
//                   />
//                   <span id="togglePassword" onClick={togglePasswordVisibility}>
//                     <img
//                       src={passwordType === "password" ? ShowPassIcon : HidePassIcon}
//                       id="toggleIcon"
//                       alt={passwordType === "password" ? "Show Password" : "Hide Password"}
//                     />
//                   </span>
//                 </div>

//                 <div className="Reg_Input">
//                 <Link to="/forgot-password">Forgot your password?</Link>
//            </div>
           
//                 <div className="Reg_Input">
//                   <input
//                     type="submit"
//                     value="Log In"
//                     className="primary-background-color"
//                   />
//                 </div>
//               </form>

//               <div className="Reg_Box_Foot">
//             <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
//           </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegNavBar from "./RegNavBar";
import config from "../../config.js";
import { Link } from "react-router-dom";
import axios from "axios";
import ShowPassIcon from "./Img/showPass-icon.svg";
import HidePassIcon from "./Img/hidePass-icon.svg";

const LoginPage = () => {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/api/accounts/auth/login/`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      // Assuming the API sends back a token or some user data on success
      const { token } = response.data;
      localStorage.setItem("authToken", token); // Store token for future use

      // Redirect to the dashboard or home page
      navigate("/");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.detail || "Failed to log in. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <RegNavBar />

      <section className="Get-Seecos login-desis">
        <div className="site-container">
          <div className="Reg_Sec">
            <div className="Reg_Box">
              <div className="Reg_Box_Header">
                <h3>Welcome Back</h3>
                <p>Log in to your CMVP account</p>
              </div>
              <form className="Reg_Form" onSubmit={handleFormSubmit}>
                <div className="Reg_Input">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="Reg_Input pass-Input">
                  <input
                    type={passwordType}
                    name="password"
                    id="passwordField"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <span id="togglePassword" onClick={togglePasswordVisibility}>
                    <img
                      src={passwordType === "password" ? ShowPassIcon : HidePassIcon}
                      id="toggleIcon"
                      alt={passwordType === "password" ? "Show Password" : "Hide Password"}
                    />
                  </span>
                </div>

                <div className="Reg_Input">
                  <Link to="/forgot-password">Forgot your password?</Link>
                </div>

                 <div className="Reg_Input">
                  <input
                    type="submit"
                    value="Log In"
                    className="primary-background-color"
                  />
                </div>

                {/* <div className="Reg_Input">
                  <button
                    type="submit"
                    className="primary-background-color"
                    disabled={isLoading} // Disable button while loading
                  >
                    {isLoading ? "Logging In..." : "Log In"}
                  </button>
                </div> */}

              </form>

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <div className="Reg_Box_Foot">
                <p>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
