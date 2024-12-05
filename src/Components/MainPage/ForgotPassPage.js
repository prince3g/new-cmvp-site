import React, { useState } from "react";
import RegNavBar from "./RegNavBar";
import { Link } from "react-router-dom"; 

import ShowPassIcon from "./Img/showPass-icon.svg";
import HidePassIcon from "./Img/hidePass-icon.svg";

const ForgotPassPage = () => {

  return (
    <div>
      <RegNavBar />

      <section className="Get-Seecos login-desis">
        <div className="site-container">
          <div className="Reg_Sec">
            <div className="Reg_Box">
              <div className="Reg_Box_Header">
                <h3>Forgot Password?</h3>
                <p>Enter your email address below</p>
              </div>
              <form className="Reg_Form">
                <div className="Reg_Input">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                  />
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
            <p><Link to="/Login">Login</Link> instead !</p>
          </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassPage;
