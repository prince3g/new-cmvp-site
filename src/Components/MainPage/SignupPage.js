import React, { useState } from "react";
import RegNavBar from "./RegNavBar";

import { Link } from "react-router-dom"; 

import ShowPassIcon from "./Img/showPass-icon.svg";
import HidePassIcon from "./Img/hidePass-icon.svg";

const SignupPage = () => {
  const [passwordType, setPasswordType] = useState("password");

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) => (prevType === "password" ? "text" : "password"));
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
              <form className="Reg_Form">
                <div className="Reg_Input">
                  <input
                    type="text"
                    name=""
                    placeholder="Work Email"
                  />
                </div>

                <div className="OO-D-flex">

                <div className="Reg_Input">
                  <input
                    type="text"
                    name=""
                    placeholder="Company Name"
                  />
                </div>

                <div className="Reg_Input">
                  <input
                    type="text"
                    name=""
                    placeholder="Phone number"
                  />
                </div>

                </div>

                <div className="Reg_Input">
                  <input
                    type="text"
                    name=""
                    placeholder="Address"
                  />
                </div>


                <div className="Reg_Input pass-Input">
                  <input
                    type={passwordType}
                    id="passwordField"
                    placeholder="Password"
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
             <p>By clicking "Sign Up," you agree to our <Link to="/terms">Terms of Use</Link> and our <Link to="/privacy">Privacy Policy</Link>.</p>
           </div>
           
                <div className="Reg_Input">
                  <input
                    type="submit"
                    value="Log In"
                    className="primary-background-color"
                  />
                </div>
              </form>

              <div className="Reg_Box_Foot">
              <p>Already have an account? <Link to="/login">Log in</Link></p>
          </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignupPage;
