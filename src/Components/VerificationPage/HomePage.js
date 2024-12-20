import React, { useState, useContext } from "react";
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

import SearchReasult from './Search_Reasult';
// import config from '../config';
import config from '../../config.js'

import CengGlobalLogo from './Img/cenglobal_logo.png';

export default function HomePage() {

    const { backgroundColor } = useContext(ColorContext);


    const { orgID } = useParams(); // Get orgId from URL

    const [responseData, setResponseData] = useState(null); // New state for API response


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



   
    // const handleFormSubmit = (event) => {
    //     event.preventDefault();
    //     if (certificateNumber && issuedDate) {
    //         setShowResult(true);
    //     } else {
    //         setShowResult(false);
    //     }
    // };

    const handleGoBackClick = () => {
        setCertificateNumber('');
        setIssuedDate(null);
        setShowResult(false);
    };

    
    return (
        <div className={`hero-sec ${showResult ? 'Showresult' : ''}`}

        style={{
            height: "100vh",
            backgroundColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFF",
            transition: "background-color 0.5s ease", // Smooth transition for color change
          }}
        
        >
            <NavBar />
            <button className="Go_Back_Sch_Btn Close_Search_Btn" onClick={handleGoBackClick}>
                           <img src={ArrowIcon} alt="Cert Icon"/>
                        </button>
            <section className="Search_Reasult_Sec">
          
                <div className="Site-container">
                    {/* <SearchReasult data={responseData} /> */}
                    {showResult && responseData && <SearchReasult data={responseData} />}

                    <div className='Cont_btn_Sec'>
                        <button className="Go_Back_Sch_Btn" onClick={handleGoBackClick}>
                            Search for a verified certificate <img src={CertIcon1} alt="Cert Icon"/>
                        </button>
                    </div>
                </div>
            </section>

            <div className="Site-container">
                <div className="Hero_Grid">
                    <div className="Hero_Dlt">
                    <div className="CEO-INtro">
                <div className="CEO-INtro-1">
                   <span><img src={CengGlobalLogo} alt="CEO"/></span>
                </div>
                <div className="CEO-INtro-2">
                    <h4>Global Services Limited </h4>
                    <p>Welcome to Global Services Limited certification verification portal by CMVP</p>
                </div>
            </div>

                        <div className="Hero_Dlt_main">
                            <h1>Verify any certificate with CMVP</h1>
                            <div className="DlT_Form_Sec">
                                <p>Search for a verified certificate here</p>
                                <form className="Verification_Search_Form" onSubmit={handleFormSubmit}>
                                    <div className="V_Form_Input F_V_Form_Input">
                                        <input 
                                            type="text" 
                                            placeholder="Enter certificate number" 
                                            value={certificateNumber}
                                            onChange={(e) => setCertificateNumber(e.target.value)}
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
                                        <button type="submit" disabled={loading}>
                                                {loading ? "Verifying..." : "See certificate"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="Hero_Banner">
                        <img src={HeroBanner1} alt="Hero Banner" className="heroBan_1"/>
                        <img src={HeroBanner2} alt="Hero Banner" className="heroBan_2"/>
                        <p>Powered by Proliance LTD</p>
                    </div>
                </div>
            </div>

          
        </div>
    );
}
