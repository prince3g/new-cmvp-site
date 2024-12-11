import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Css/Dash.css';

import UserBanner from './Img/user-banner.jpg';



export default function UserProfile() {

    const navigate = useNavigate();

  const userDetails = {
    fullName: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+123-456-7890",
    address: "123 Street, City, Country",
    RegDate: "12/5/2024",
   
  };

  const handleBackClick = () => {
    navigate(-1);
  };
  
    return(
        <div className="DDD-Seco ooiais-de">
             <div className="JJha-DhA">

      <div className="profile-sec">
      <div className="profile-container" id="profile">
        <div className="profile-header">
          <h1>Profile</h1>
          <img src={UserBanner}></img>

        </div>
        <hr />
        <div className="profile-details">
          <p>
            <strong>Full Name:</strong> {userDetails.fullName}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p>
            <strong>Phone:</strong> {userDetails.phone}
          </p>
          <p>
            <strong>Address:</strong> {userDetails.address}
          </p>
          <p>
          <strong>Registeration date:</strong> {userDetails.RegDate}
          </p>
        </div>
        <hr />
        <div className="profile-body">
          <table>
            <thead>
              <tr>
              <th>S/N</th>
              <th>Plan</th>
              <th>Duration</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
              <th>Documents</th>
              </tr>
            </thead>
            <tbody>

            <tr>
              <td>1</td>
              <td>Basic Plan</td>
              <td>3 Months</td>
              <td>12/2/2024</td>
              <td>12/5/2024</td>
              <td className='active-BGD'>Active</td>
              <td>100</td>
            </tr>

            <tr>
              <td>2</td>
              <td>Pro Plan</td>
              <td>1 Months</td>
              <td>12/2/2024</td>
              <td>12/5/2024</td>
              <td className='expired-BGD'>Active</td>
              <td>5</td>
            </tr>
            

            </tbody>
          </table>
        </div>
        <hr />
        <div className="profile-footer">
        <div className="action-btns">
        <button type="button" className="back-btn" onClick={handleBackClick}>
                  Back
                </button>
          <button>Remove</button>
         </div>
        </div>

      </div>
    </div>


    </div>
        </div>
    )
}