import React, { useState } from "react";
import './Css/Dash.css';
import userImg from './Img/user-img.jpg';

import CopyIcon from './Img/copyicon.svg';

import PhotoEditIcon from './Img/edit_icon.svg';

import AngleDownIcon from './Img/angle-down.svg';

export default function Profile() {
    const [firstName, setFirstName] = useState("Prince");
    const [lastName, setLastName] = useState("Godson");
    const [email, setEmail] = useState("princegodson24@gmail.com");
    const [phone, setPhone] = useState("09037494084");
    const [city, setCity] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
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
            firstName,
            lastName,
            email,
            phone,
            city,
            oldPassword,
            newPassword
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
                                <span><img src={PhotoEditIcon}></img></span>
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
                                        <p>First Name</p>
                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <p>Last Name</p>
                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="form-input">
                                    <p>Email Address</p>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-input">
                                    <p>Phone Number</p>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className="form-input">
                                    <p>City</p>
                                    <input
                                        type="text"
                                        placeholder="Enter your city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>
                                <div className="form-input">
                                    <h3>Password reset</h3>
                                </div>
                                <div className="form-input">
                                    <p>Old Password</p>
                                    <input
                                        type="password"
                                        placeholder="Enter old password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-input">
                                    <p>New Password</p>
                                    <input
                                        type="password"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
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
