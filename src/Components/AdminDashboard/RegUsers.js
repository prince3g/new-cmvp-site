import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './Css/Dash.css';



export default function RegUsers() {
    return(
        <div className="DDD-Seco">
             <div className="JJha-DhA">
      <div className="Dash-Intro">
        <h2>Registered users</h2>

      </div>

      <div className="Sec-table">
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone number</th>
              <th>Address</th>
              <th>Registeration date</th>
              <th>Current Plan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            
            <tr>
              <td>1</td>
              <td>Proliance LTD</td>
              <td>princegodson24@gmail.com</td>
              <td>09037494084</td>
              <td>Okwulaga Afaraukwu Ibeku, Umuahi Abia state, Nigeria.</td>
              <td>12/5/2024</td>
              <td>Basic Plan</td>
              <td>
                <div className="action-btns">
                <Link to="/user-profile" className="prof-bank-btn">
                    View Profile
                  </Link>
                  <button>Remove</button>
                </div>
              </td>
            </tr>




            
          </tbody>
        </table>
      </div>
    </div>
        </div>
    )
}