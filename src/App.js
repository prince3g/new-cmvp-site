import './App.css';
import React from 'react';


import VerificationPage from './Components/VerificationPage/Verification';

import CompanyDashbaord from './Components/CompanyDashboard/CompanyDashbaord';

import LandingPage from './Components/MainPage/LandingPage';
import LoginPage from './Components/MainPage/LoginPage';
import SignupPage from './Components/MainPage/SignupPage';

function App() {
  return (
    <div className="App">

      {/* <VerificationPage /> */}

      <CompanyDashbaord />
    
    </div>
  );
}

export default App;
