import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Css/Main.css';
import { ColorContext } from "../ColorContext";

import NavBar from './NavBar';
import HeroBanner1 from './Img/heroImg.png';
import HeroBanner2 from './Img/heroImg2.png';
import CertIcon from './Img/cert-icon.svg';
import CertIcon1 from './Img/cert-icon1.svg';
import ArrowIcon from './Img/arrow.svg';
import config from "../../config.js";
import VerifiedBadge1 from './Img/verified-badge1.svg';

import SearchReasult from './Search_Reasult';

import SampleImage from "../CompanyDashboard/Img/CompLogo.png"; 


import PageFixeImg from '../PageFixeImg.jpg';

export default function HomePage() {

    const currentYear = new Date().getFullYear(); // Get the current year


    const { orgID } = useParams(); // Get orgId from URL

    const [responseData, setResponseData] = useState(null); // New state for API response

    const [organizationData, setOrganizationData] = useState(null); // For organization data
    const [organizationData_name, setOrganizationData_name] = useState(null); // For organization data
    const [loading, setLoading] = useState(false); // State for loader
    const [certificateNumber, setCertificateNumber] = useState('');
    const [issuedDate, setIssuedDate] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (certificateNumber && issuedDate) {
            setLoading(true); // Start the loader
            try {
                // Format issued_date to 'YYYY-MM-DD' in local time
                const formattedDate = issuedDate.getFullYear() + '-' + 
                                      String(issuedDate.getMonth() + 1).padStart(2, '0') + '-' + 
                                      String(issuedDate.getDate()).padStart(2, '0');
    
                // Call API to verify the certificate
                const response = await fetch(`${config.API_BASE_URL}/api/certificates/verify-certificate/${orgID}/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        certificate_id: certificateNumber,
                        issued_date: formattedDate, // Use the locally formatted date
                    }),
                });
    
                const data = await response.json();
                if (response.ok) {
                    setResponseData(data); // Save the response data
                    setShowResult(true);
                } else {
                    console.error('Verification Failed:', data.message);
                }
            } catch (error) {
                console.error('Error verifying certificate:', error);
            } finally {
                setLoading(false); // Stop the loader
            }
        }
    };


  // Fetch organization data
  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        const response = await fetch(
          `${config.API_BASE_URL}/api/accounts/auth/organizations/${orgID}/`
        );
        const data = await response.json();
        if (response.ok) {
          setOrganizationData(data);
          setOrganizationData_name(data.name);
        } else {
          console.error("Error fetching organization data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching organization data:", error);
      }
    };

    fetchOrganizationData();
  }, [orgID]);

    const handleGoBackClick = () => {
        setCertificateNumber('');
        setIssuedDate(null);
        setShowResult(false);
    };


    const { backgroundColor } = useContext(ColorContext);

    const calculateForegroundColor = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      return luminance > 128 ? "#000000" : "#FFFFFF"; // Black if bright, white if dim
    };
  
    const textColor = calculateForegroundColor(backgroundColor);



    return (
        <div className={`Verification-Landing-page ${showResult ? 'Showresult' : ''}`}>
             <NavBar />
             <div className="Verification-Hero-sec">
            <img src={PageFixeImg} className="Fixed-ImgBg"></img>

        <div className="Fix-hero-Bg"
        style={{
          background: `linear-gradient(135deg, ${backgroundColor}, #0D2818)`, // Example gradient
          color: textColor,
          transition: "background 0.5s ease", // Smooth transition for gradient change
        }}
      ></div>

      <div className="site-container">
        <div className="hero-Tttrs">
        <h6><img src={VerifiedBadge1} alt="Verified Badge" /> Certificate Verification Portal</h6>
            <h2>{organizationData_name} <br></br> <span className="anim-Hh-span">Certificate</span> Verification</h2>
        </div>

      </div>
      <div className="Inputer-SecOO">
      <a href="#" className="Inputer-SecOO-Top">
        <div className="dal-1">
        <img 
            src={`${config.API_BASE_URL}/media/organization_logos/Creative_Contact__App.png`} 
            alt="CEO" 
            onError={(e) => { e.target.onerror = null; e.target.src = SampleImage; }}
        />
          {/* <img src={SampleImage} alt="CEO" /> */}
        </div>
        <div className="dal-2">
          <h4>{organizationData_name} </h4>
          <p>Certificate verification portal</p>
        </div>
      </a>
      <div className="has-Form">
        {/* <h3>Search for a verified certificate here</h3> */}

        <form className="Verification_Search_Form" onSubmit={handleFormSubmit}>
                                    <div className="V_Form_Input F_V_Form_Input">
                                        <input 
                                            type="text" 
                                            placeholder="Enter certificate number" 
                                            value={certificateNumber}
                                            onChange={(e) => setCertificateNumber(e.target.value)}
                                            // className="certNum_Inpt"
                                        />
                                        <img src={CertIcon} alt="Cert Icon"/>
                                    </div>
                                    <div className="V_Form_Input">
                                        <DatePicker
                                            selected={issuedDate}
                                            onChange={(date) => setIssuedDate(date)}
                                            placeholderText="Issued date"
                                            dateFormat="yyyy/MM/dd"
                                            className="DatePicker_Input"
                                            showYearDropdown
                                            showMonthDropdown
                                            dropdownMode="select"
                                        />
                                    </div>
                                    <div className="V_Form_Input">
                                        <button type="submit" disabled={loading}
                                          style={{
                                            background: backgroundColor, // Example gradient
                                            color: textColor,
                                          }}
                                        >
                                                {loading ? "Verifying..." : "See certificate"}
                                        </button>
                                    </div>
                                </form>
                                
        </div>
      </div>

      <footer className="GGf-foot">
        <div className="Nav-Content">
            <a href="https://prolianceltd.com" target="_blank" >Powered by Proliance LTD (ISO 9001 certifided company)</a>
                <p>© {currentYear} CMVP </p>
        </div>
        </footer>


</div>


<button className="Go_Back_Sch_Btn Close_Search_Btn" onClick={handleGoBackClick}>
                           <img src={ArrowIcon} alt="Cert Icon"/>
                        </button>
            <section className="Search_Reasult_Sec">
          
                <div className="Site-container">
                    {/* <SearchReasult data={responseData} /> */}
                    {showResult && responseData && <SearchReasult data={responseData} />}

                    <div className='Cont_btn_Sec'>
                        <button className="Go_Back_Sch_Btn" onClick={handleGoBackClick}
                        style={{
                            background: backgroundColor, // Example gradient
                            color: textColor,
                          }}
                        >
                            Search for a verified certificate <img src={CertIcon1} alt="Cert Icon"/>
                        </button>
                    </div>
                </div>
            </section>



</div>
    );
}
