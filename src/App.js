import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import VerificationPage from './Components/VerificationPage/Verification';
import CompanyDashbaord from './Components/CompanyDashboard/CompanyDashbaord';
import LandingPage from './Components/MainPage/LandingPage';
import LoginPage from './Components/MainPage/LoginPage';
import SignupPage from './Components/MainPage/SignupPage';
import Terms from './Components/MainPage/Terms';
import Privacy from './Components/MainPage/Privacy';
import ForgotPassPage from './Components/MainPage/ForgotPassPage';
import ForgotPassPageReset from './Components/MainPage/ForgotPassPageReset';
import HelpPage from './Components/MainPage/HelpPage';

import ScrollToTop from './Components/ScrollToTop';

import AdminDashbaord from './Components/AdminDashboard/AdminDashboard';

function App() {
  return (
    <Router>
      <ScrollToTop />
      
      <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/forgot-password" element={<ForgotPassPage />} />
        <Route path="/forgotten_pass_reset/:uidb64/:token/" element={<ForgotPassPageReset />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/verification/:orgID/:OrgName" element={<VerificationPage />} />
        <Route path="/dashboard/*" element={<CompanyDashbaord />} />
        
        <Route path="/admin-dashboard/*" element={<AdminDashbaord />} />
        <Route path="/verification/*" element={<VerificationPage />} />
      </Routes>
      </div>
    </Router>

    // <div>
    //   <AdminDashbaord />
    // </div>
    
    // <div>
    //   <VerificationPage />
    // </div>


  );
}

export default App;
