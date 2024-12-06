import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Css/Dash.css';
import NavBar from './NavBar';

export default function AdminDashbaord() {

    return (
        <div className="AdminDashbaord ">
             <Router>
           <NavBar />
           <div className="MainPage_Content">
           <div className="Large-container">
     
            <Routes>
                {/* <Route path="/" element={<Pricing />} /> */}
                {/* <Route path="/pricing" element={<Pricing />} />
                <Route path="/portal" element={<PortalPage />} />
                <Route path="/uploaded-certificates" element={<UploadedCert />} />
                <Route path="/deleted-certificates" element={<DeletedUploadedCert />} />
                <Route path="/logon-info" element={<LogonInfo />} />
                <Route path="/profile" element={<Profile />} /> */}
          </Routes>



           </div>

           <Routes>

             {/* <Route path="/notification" element={<Notification />} /> */}
           </Routes>

       

           </div>

           </Router>
        
           <div className="Large-container">
            {/* <DashFooter /> */}
           </div>
        </div>
    )

}