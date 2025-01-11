import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegNavBar from "./RegNavBar";
import config from "../../config.js";
import { Link } from "react-router-dom";
import axios from "axios";
import './SignupPage.css';

import ShowPassIcon from "./Img/showPass-icon.svg";
import HidePassIcon from "./Img/hidePass-icon.svg";

const SignupPage = () => {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password"); // State for confirm password visibility
  const [formData, setFormData] = useState({
    email: "",
    companyName: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    logo: null,
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "phone" && value.length > 15) {
      return;
    }

    if (name === "password") {
      setPasswordStrength(assessPasswordStrength(value));
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    formDataToSend.append("name", formData.companyName);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("password", formData.password);

    if (formData.logo) {
      formDataToSend.append("logo", formData.logo);
    }

    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/api/accounts/auth/organization/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMessage("Account created successfully. Please check your email to confirm your account.");
      setFormData({
        email: "",
        companyName: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
        logo: null,
      });

      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.detail || "Failed to create an account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const assessPasswordStrength = (password) => {
    if (!password) return "";
    const strengthCriteria = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[!@#$%^&*(),.?":{}|<>]/.test(password),
    ];

    const metCriteria = strengthCriteria.filter(Boolean).length;

    switch (metCriteria) {
      case 0:
      case 1:
        return "Weak";
      case 2:
      case 3:
        return "Moderate";
      case 4:
      case 5:
        return "Strong";
      default:
        return "";
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
                <p>For business</p>
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

                <div className="Reg_Input Upload-input">
                  <label>Upload Company Logo</label>
                  <input
                    type="file"
                    name="logo"
                    onChange={handleInputChange}
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
                  <span onClick={togglePasswordVisibility}>
                    <img
                      src={passwordType === "password" ? ShowPassIcon : HidePassIcon}
                      alt={passwordType === "password" ? "Show Password" : "Hide Password"}
                    />
                  </span>
                </div>

                <div className="Reg_Input pass-Input">
                  <input
                    type={confirmPasswordType}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <span onClick={toggleConfirmPasswordVisibility}>
                    <img
                      src={confirmPasswordType === "password" ? ShowPassIcon : HidePassIcon}
                      alt={confirmPasswordType === "password" ? "Show Password" : "Hide Password"}
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
                  <div className="password-strength">
                    <p>Password Strength: {passwordStrength}</p>
                    <div
                      className={`strength-bar ${
                        passwordStrength.toLowerCase()
                      }`}
                    ></div>
                  </div>

                  <button
                    type="submit"
                    className="primary-background-color"
                    disabled={isLoading}
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