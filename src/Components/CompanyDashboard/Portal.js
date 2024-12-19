import React, { useState, useEffect } from "react";
import axios from "axios";
import './Css/Dash.css';

import CopyIcon from './Img/copyicon.svg';
import AngleDownIcon from './Img/angle-down.svg';
import ArrowRightLit from './Img/arrow-right-lit.svg';
import DropArrow1 from './Img/droparrow1.svg';
import DropArrow2 from './Img/droparrow2.svg';
import ArrowLeft from './Img/arrow-left.svg';
import PhotoIcon from './Img/photo-icon.svg';
import config from '../../config.js';

export default function PortalPage() {
    const [uploadedCount, setUploadedCount] = useState(0);
    const [deletedCount, setDeletedCount] = useState(0);
    const [copyMessage, setCopyMessage] = useState('Copy verification Url');
    const [imagePreview, setImagePreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isCertificateSectionVisible, setIsCertificateSectionVisible] = useState(false);
    const [isUploadEnvHidden, setIsUploadEnvHidden] = useState(false);
    const [isUploadBoxTogglerActive, setIsUploadBoxTogglerActive] = useState(false);
    const [isAddCertCartiVisible, setIsAddCertCartiVisible] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [certificateData, setCertificateData] = useState({
        
        organization_id: "1c321d22-c526-4879-a3fa-555a401f7ed6",
        certificate_id: "",
        certificate_title: "",
        type: "",
        client_name: "",
        dateOfIssue: "",
        issueNumber: "",
        issuedBy: ""
    });

    useEffect(() => {
        // Fetch the uploaded certificates count
        const fetchUploadedCertificates = async () => {
            try {
                const response = await axios.get(`${config.API_BASE_URL}/api/certificates/create/`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setUploadedCount(response.data.count);
            } catch (error) {
                console.error("Error fetching uploaded certificates count:", error);
            }
        };

        // Fetch the deleted certificates count
        const fetchDeletedCertificates = async () => {
            try {
                const response = await axios.get(`${config.API_BASE_URL}/api/certificates/soft-deleted-certificates/`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setDeletedCount(response.data.length);
            } catch (error) {
                console.error("Error fetching deleted certificates count:", error);
            }
        };

        fetchUploadedCertificates();
        fetchDeletedCertificates();
    }, []);

    const handleCopy = () => {
        const copyText = document.getElementById("portalUrl");
        copyText.select();
        document.execCommand("copy");

        setCopyMessage('Copied!');
        setTimeout(() => setCopyMessage('Copy portal Url'), 2000);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDragEnter = () => {
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    const handleUploadButtonClick = () => {
        setIsCertificateSectionVisible(true);
    };

    const handleCloseButtonClick = () => {
        setIsCertificateSectionVisible(false);
    };

    const toggleUploadEnvVisibility = () => {
        setIsUploadEnvHidden(!isUploadEnvHidden);
        setIsUploadBoxTogglerActive(!isUploadBoxTogglerActive);
    };

    const handleChange = (event) => {
        setCategoryName(event.target.value);
    };

    const showAddCertCarti = () => {
        setIsAddCertCartiVisible(true);
    };

    const hideAddCertCarti = () => {
        setIsAddCertCartiVisible(false);
        setCategoryName('');
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCertificateData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
    
        const formData = new FormData();
        formData.append("organization", certificateData.organization_id); 
        formData.append("certificate_id", certificateData.number);
        formData.append("client_name", certificateData.client_name);
        formData.append("issue_date", certificateData.dateOfIssue); 
        formData.append("expiry_date", "");  // Optional
        if (selectedFile) {
            formData.append("pdf_file", selectedFile);
        }
    
        try {
            const response = await axios.post(`${config.API_BASE_URL}/api/certificates/create/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            alert("Certificate created successfully!");
        } catch (error) {
            console.error("Error creating certificate:", error);
            alert("Failed to create certificate. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="PortalPage">
            <section className={`Certificate_Sec ${isCertificateSectionVisible ? 'PopOut_Certificate_Sec' : ''}`}>
                <div className={`Add_Cert_Carti ${isAddCertCartiVisible ? 'Active_Add_Cert_Carti' : ''}`}>
                    <div className="site-container">
                        <div className="Add_Cert_Carti_box">
                            <div className="Add_CCt_Input">
                                <input
                                    type="text"
                                    placeholder="Enter category name"
                                    value={categoryName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="Add_CCt_btns">
                                <button className="Add_Cert_Certegory" onClick={showAddCertCarti}>
                                    Add category
                                </button>
                                <button className="Close_Cert_Certegory" onClick={hideAddCertCarti}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Certificate_Sec_Main">
                    <div className="site-container">
                        <div className="Top_CC_Mn">
                            <button className="Close_Certificate_Sec" onClick={handleCloseButtonClick}>
                                <img src={ArrowLeft} alt="Arrow Left" />
                            </button>
                        </div>
                        <form className="Main_CC_Mn" onSubmit={handleSubmit}>
                            <div className="L_CC_Mn">
                                <div className="L_CC_Mn_main">
                                    <h3>Upload certificate</h3>
                                    <div className="Certificate_Form">
                                        <div className="Cert_Form_input">
                                            <input
                                                type="text"
                                                name="number"  // Maps to `certificate_id`
                                                value={certificateData.number}
                                                onChange={handleInputChange}
                                                placeholder="Certificate ID"
                                            />
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input
                                                type="text"
                                                name="certificate_title"
                                                value={certificateData.certificate_title}
                                                onChange={handleInputChange}
                                                placeholder="Certificate title"
                                            />
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input
                                                type="text"
                                                name="type"
                                                value={certificateData.type}
                                                onChange={handleInputChange}
                                                placeholder="Type of examination / Event (optional)"
                                            />
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input
                                                type="text"
                                                name="client_name"  // Maps to `client_name`
                                                value={certificateData.client_name}
                                                onChange={handleInputChange}
                                                placeholder="Issued To"
                                            />
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input
                                                type="date"
                                                name="dateOfIssue"  // Maps to `issue_date`
                                                value={certificateData.dateOfIssue}
                                                onChange={handleInputChange}
                                                placeholder="Date of Issue"
                                            />
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input
                                                type="text"
                                                name="issueNumber"
                                                value={certificateData.issueNumber}
                                                onChange={handleInputChange}
                                                placeholder="Issue number"
                                            />
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input
                                                type="text"
                                                name="issuedBy"
                                                value={certificateData.issuedBy}
                                                onChange={handleInputChange}
                                                placeholder="Issued by"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="R_CC_Mn">
                                <div className="R_CC_Mn_Main">
                                    <h4>Upload file (optional)</h4>
                                    <p>
                                        <b>Note:</b> File uploaded won't be displayed on user portal and it’s totally
                                        optional. If you don’t want to upload a file click on the submit button to
                                        continue.
                                    </p>

                                    <div 
                                        className={`Image_Upload_div ${isDragging ? 'dragging' : ''}`} 
                                        onClick={triggerFileInput}
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onDragEnter={handleDragEnter}
                                        onDragLeave={handleDragLeave}
                                    >
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" className="uploadedImage" />
                                        ) : (
                                            <>
                                                <img src={PhotoIcon} className="photo_Icon" alt="Photo Icon" />
                                                <span>Drag and drop file (pdf, Jpeg, PNG)</span>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        style={{ display: 'none' }}
                                        onChange={handleImageUpload}
                                    />

                                    <div className="Submit_Sec">
                                        <button type="submit" disabled={loading}>
                                            {loading ? "Submitting..." : "Save changes"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>


            <div className="Copy_Url_Sec">
                <div className="Copy_Url_box" onClick={handleCopy}>
                    <div className="Copy_Url_box_Main">
                        <h3>{copyMessage}</h3>
                        <input
                            id="portalUrl"
                            type="text"
                            value="https://cmvp.net/cenglobalservices"
                            readOnly
                        />
                    </div>
                    <button className="Copy_Url_Btn">
                        <img src={CopyIcon} alt="Copy Icon" />
                    </button>
                </div>
            </div>

            <div className="Main_Port_Sec">
                <div className="site-container">
                    <div className="Port_into">
                        <h4>Hi 👋 ABC Company</h4>
                        <h2>Welcome to your CMVP Portal</h2>
                        <p>
                            This portal enables you to verify all your certificates just by uploading them.
                        </p>
                    </div>

                    <div className="ToP_Upload_env">
                        <h3
                            className={`Upload_Box_Toggler ${
                                isUploadBoxTogglerActive ? 'Active_Upload_Box_Toggler' : ''
                            }`}
                            onClick={toggleUploadEnvVisibility}
                        >
                            Upload <img src={AngleDownIcon} alt="Angle Down Icon" />
                        </h3>
                        <div className="Upload_Conunter">
                            <span>0%</span>
                            <p>
                                You can only upload <b>50</b> certificates a day
                            </p>
                        </div>
                    </div>

                    <div className={`Upload_env_main ${isUploadEnvHidden ? 'Hide_Envi_Box' : ''}`}>
                        <button className="CertUpload_Btn" onClick={handleUploadButtonClick}>
                            Upload Certificate <img src={ArrowRightLit} alt="Arrow Right" />
                        </button>

                            <div className="Upload_env_main_Foot">
                            <p>
                                {uploadedCount} uploaded <img src={DropArrow1} alt="Drop Arrow 1" />
                            </p>
                            <p>
                                {deletedCount} deleted <img src={DropArrow2} alt="Drop Arrow 2" />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
