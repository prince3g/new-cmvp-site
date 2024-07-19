import React, { useState } from "react";
import './Css/Dash.css';
import userImg from './Img/user-img.jpg';
import CopyIcon from './Img/copyicon.svg';
import PhotoEditIcon from './Img/edit_icon.svg';
import AngleDownIcon from './Img/angle-down.svg';

export default function Profile() {
    const [companyName, setCompanyName] = useState("Company ABC");
    const [businessType, setBusinessType] = useState("Consulting");
    const [contactFirstName, setContactFirstName] = useState("John");
    const [contactLastName, setContactLastName] = useState("Doe");
    const [contactTelephone, setContactTelephone] = useState("123 Business Road");
    const [yearIncorporated, setYearIncorporated] = useState("2005");
    const [registrationNumber, setRegistrationNumber] = useState("123456789");
    const [nationality, setNationality] = useState("Nigeria");
    const [staffNumber, setStaffNumber] = useState("50");
    const [cityAddress, setCityAddress] = useState("Lagos");
    const [country, setCountry] = useState("Nigeria");
    const [state, setState] = useState("Lagos");
    const [imgSrc, setImgSrc] = useState(userImg);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImgSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log({
            companyName,
            businessType,
            contactFirstName,
            contactLastName,
            contactTelephone,
            yearIncorporated,
            registrationNumber,
            nationality,
            staffNumber,
            cityAddress,
            country,
            state
        });
    };

    const [copyMessage, setCopyMessage] = useState('Copy verification Url');

    const handleCopy = () => {
        const copyText = document.getElementById("portalUrl");
        copyText.select();
        document.execCommand("copy");

        // Temporarily change the text to "Copied!"
        setCopyMessage('Copied!');
        setTimeout(() => setCopyMessage('Copy portal Url'), 2000); // Revert back after 2 seconds
    };

    const [isUploadBoxTogglerActive, setIsUploadBoxTogglerActive] = useState(false);
    const [isUploadEnvHidden, setIsUploadEnvHidden] = useState(false);
    const [isCertificateSectionVisible, setIsCertificateSectionVisible] = useState(false);

    const toggleUploadEnvVisibility = () => {
        setIsUploadEnvHidden(!isUploadEnvHidden);
        setIsUploadBoxTogglerActive(!isUploadBoxTogglerActive);
    };

    const handleCloseButtonClick = () => {
        setIsCertificateSectionVisible(false);
    };

    const handlePreviewButtonClick = () => {
        setIsCertificateSectionVisible(true);
    };

    return (
        <div className="profile-Sec">
            <div className="ToP_Upload_env">
                <h3
                    className={`Upload_Box_Toggler ${isUploadBoxTogglerActive ? 'Active_Upload_Box_Toggler' : ''}`}
                    onClick={toggleUploadEnvVisibility}
                >
                    Portal profile<img src={AngleDownIcon} alt="Angle Down Icon" />
                </h3>
                <div className="Upload_Conunter">
                    <span>50%</span>
                    <p><b>Portal</b> usage</p>
                </div>
            </div>

            <div className={`Upload_env_main ${isUploadEnvHidden ? 'Hide_Envi_Box' : ''}`}>
                <div className="OnglS_sec">
                    <div className="top-dash">
                        <div className="top-dash-1">
                            <div className="top-dash-1-main">
                                <input type="file" id="file-upload" onChange={handleFileChange} style={{ display: 'none' }} />
                                <label htmlFor="file-upload" className="user-img">
                                    <img src={imgSrc} alt="User" id="img-display" />
                                    <span><img src={PhotoEditIcon} alt="Edit Icon" /></span>
                                </label>
                                <div className="user-details">
                                    <h4>Company ABC Portal Profile</h4>
                                    <div className="Copy_Url_Sec">
                                        <div className="Copy_Url_box" onClick={handleCopy}>
                                            <div className="Copy_Url_box_Main">
                                                <h3>{copyMessage}</h3>
                                                <input id="portalUrl" type="text" value="https://cmvp.net/cenglobalservices" readOnly />
                                            </div>
                                            <button className="Copy_Url_Btn">
                                                <img src={CopyIcon} alt="Copy Icon" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="top-dash-2">
                            <div className="top-dash-2-main top-dash-2-main-1 active-top-dash-2-main">
                                <div className="form-header">
                                    <h3>Portal profile Settings</h3>
                                </div>
                                <form className="site-form" onSubmit={handleSubmit}>
                                    <div className="d-grid">
                                        <div className="form-input">
                                            <p>Company Name</p>
                                            <input
                                                type="text"
                                                value={companyName}
                                                onChange={(e) => setCompanyName(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-input">
                                            <p>Business Type</p>
                                            <input
                                                type="text"
                                                value={businessType}
                                                onChange={(e) => setBusinessType(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-input">
                                        <p>Contact Person's First Name</p>
                                        <input
                                            type="text"
                                            value={contactFirstName}
                                            onChange={(e) => setContactFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <p>Contact Person's Last Name</p>
                                        <input
                                            type="text"
                                            value={contactLastName}
                                            onChange={(e) => setContactLastName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <p>Contact Person's Telephone</p>
                                        <input
                                            type="text"
                                            placeholder="Enter Contact Person's Telephone"
                                            value={contactTelephone}
                                            onChange={(e) => setContactTelephone(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <p>Year Incorporated</p>
                                        <input
                                            type="text"
                                            placeholder="Enter Year Incorporated"
                                            value={yearIncorporated}
                                            onChange={(e) => setYearIncorporated(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <p>Registration Number</p>
                                        <input
                                            type="text"
                                            placeholder="Enter Registration Number"
                                            value={registrationNumber}
                                            onChange={(e) => setRegistrationNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <p>Nationality</p>
                                        <input
                                            type="text"
                                            placeholder="Enter Nationality"
                                            value={nationality}
                                            onChange={(e) => setNationality(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <p>No. of Staff</p>
                                        <input
                                            type="text"
                                            placeholder="Enter Number of Staff"
                                            value={staffNumber}
                                            onChange={(e) => setStaffNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <p>City Address</p>
                                        <input
                                            type="text"
                                            placeholder="Enter City Address"
                                            value={cityAddress}
                                            onChange={(e) => setCityAddress(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <p>Select Country</p>
                                        <select value={country} onChange={(e) => setCountry(e.target.value)}>
                                            <option value="">Select Country</option>
                                            <option value="Nigeria">Nigeria</option>
                                            <option value="USA">USA</option>
                                            <option value="UK">UK</option>
                                            {/* Add more countries as needed */}
                                        </select>
                                    </div>
                                    <div className="form-input">
                                        <p>Select State</p>
                                        <select value={state} onChange={(e) => setState(e.target.value)}>
                                            <option value="">Select State</option>
                                            <option value="Lagos">Lagos</option>
                                            <option value="California">California</option>
                                            <option value="London">London</option>
                                            {/* Add more states as needed */}
                                        </select>
                                    </div>
                                    <div className="form-input">
                                        <button type="submit" className="profile_submit_btn">Save Profile</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
