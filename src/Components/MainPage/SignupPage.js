import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegNavBar from "./RegNavBar";
import config from "../../config.js";
import { Link } from "react-router-dom";
import axios from "axios";

import ShowPassIcon from "./Img/showPass-icon.svg";
import HidePassIcon from "./Img/hidePass-icon.svg";

const SignupPage = () => {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [formData, setFormData] = useState({
    email: "",
    companyName: "",
    phone: "",
    address: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State for loader

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
    setSuccessMessage(null);
    setIsLoading(true); // Start loading
  
    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/api/accounts/auth/users/`,
        {
          email: formData.email,
          company_name: formData.companyName,
          phone: formData.phone,
          address: formData.address,
          password: formData.password,
        }
      );
  
      setSuccessMessage("Account created successfully. Please check your email to confirm your account.");
  
      // Clear form
      setFormData({
        email: "",
        companyName: "",
        phone: "",
        address: "",
        password: "",
      });
  
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.detail ||
        "Failed to create an account. Please try again."
      );
    } finally {
      setIsLoading(false); // End loading
    }
  };
  

  return (
    <div>
      <RegNavBar />

      <section className="Get-Seecos signup-desis">
        <div className="site-container">
          <div className="Reg_Sec">
            <div className="Reg_Box">
              <div className="Reg_Box_Header">
                <h3>Get started with CMVP</h3>
                <p>Account creation is exclusively for companies</p>
              </div>
              <form className="Reg_Form" onSubmit={handleFormSubmit}>
                <div className="Reg_Input">
                  <input
                    type="email"
                    name="email"
                    placeholder="Work Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="OO-D-flex">
                  <div className="Reg_Input">
                    <input
                      type="text"
                      name="companyName"
                      placeholder="Company Name"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="Reg_Input">
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="Reg_Input">
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
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
                  <p>
                    By clicking "Sign Up," you agree to our{" "}
                    <Link to="/terms">Terms of Use</Link> and our{" "}
                    <Link to="/privacy">Privacy Policy</Link>.
                  </p>
                </div>


                <div className="Reg_Input">
                  <button
                    type="submit"
                    className="primary-background-color"
                    disabled={isLoading} // Disable button when loading
                  >
                    {isLoading ? "Signing Up..." : "Sign Up"}
                  </button>
                </div>

              </form>

              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}

              <div className="Reg_Box_Foot">
                <p>
                  Already have an account? <Link to="/login">Log in</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignupPage;
