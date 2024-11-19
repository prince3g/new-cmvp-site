import React, { useState } from "react";
import RegNavBar from "./RegNavBar";

import ShowPassIcon from "./Img/showPass-icon.svg";
import HidePassIcon from "./Img/hidePass-icon.svg";

const LoginPage = () => {
  const [passwordType, setPasswordType] = useState("password");

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) => (prevType === "password" ? "text" : "password"));
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
              <form className="Reg_Form">
                <div className="Reg_Input">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
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
             <a href="#">Forgot Password?</a>
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
            <p>Don't have an account? <a href="#">Sign up</a></p>
          </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
