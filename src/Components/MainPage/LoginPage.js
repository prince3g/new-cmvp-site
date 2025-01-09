

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

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   setErrorMessage(null);
  //   setIsLoading(true);

  //   // Create FormData for the login request
  //   const formDataToSend = new FormData();
  //   formDataToSend.append("email", formData.email);
  //   formDataToSend.append("password", formData.password);

  //   try {
  //     const response = await axios.post(
  //       `${config.API_BASE_URL}/api/accounts/auth/login/`,
  //       formDataToSend,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data", // Ensure correct content type
  //         },
  //       }
  //     );

  //     // Assuming the API sends back a token or some user data on success
  //     const token = response.data;

  //     // Store the token and other user details in localStorage
  //     localStorage.setItem("authToken", token.access);
  //     localStorage.setItem("authEmail", token.email);
  //     localStorage.setItem("authUserId", token.unique_subscriber_id);
  //     localStorage.setItem("authName", token.name);
  //     localStorage.setItem("authPhone", token.phone);
  //     localStorage.setItem("authAddress", token.address);

  //     localStorage.setItem("loginTime", token.login_time); // Store login time
  //     // localStorage.setItem("authImageUrl", token.logo_url);
  //     // console.log("Response Data: ", token)
  //     // Redirect to the dashboard or home page
  //     navigate("/dashboard/");
  //   } catch (error) {
  //     setErrorMessage(
  //       error.response?.data?.detail || "Failed to log in. Please try again."
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);
  
    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
  
    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/api/accounts/auth/login/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      const token = response.data;
  
      localStorage.setItem("authToken", token.access);
      localStorage.setItem("authEmail", token.email);
      localStorage.setItem("authUserId", token.unique_subscriber_id);
      localStorage.setItem("authName", token.name);
      localStorage.setItem("authPhone", token.phone);
      localStorage.setItem("authAddress", token.address);
      localStorage.setItem("loginTime", token.login_time);
  
      // Check if the logged-in email is "ekenehanson@gmail.com"
      if (token.email === "super_admin1@cmvp.net" && token.user_role === "super_admin") {
        navigate("/admin-dashboard/");
      } else {  
        navigate("/dashboard/");
      }
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
                  <button
                    type="submit"
                    className="primary-background-color"
                    disabled={isLoading} // Disable button while loading
                  >
                    {isLoading ? "Logging In..." : "Log In"}
                  </button>
                </div>
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
