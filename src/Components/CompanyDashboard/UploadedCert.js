import React, { useState, useEffect } from "react";
import axios from "axios";
import AngleDownIcon from './Img/angle-down.svg';
import DownloadIcon from './Img/download_icon.svg';
import VerifiedIcon from './Img/verified-badge2.svg';
import ArrowLeft from './Img/arrow-left.svg';
import PhotoIcon from './Img/photo-icon.svg';
import config from '../../config.js'

export default function UploadedCert() {

    const organizationID = localStorage.getItem("authUserId");
    const organizationName = localStorage.getItem("authName");

    const [isUploadBoxTogglerActive, setIsUploadBoxTogglerActive] = useState(false);
    const [isUploadEnvHidden, setIsUploadEnvHidden] = useState(false);
    const [isCertificateSectionVisible, setIsCertificateSectionVisible] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false); // Loader state
    const [loadingDownload, setLoadingDownload] = useState(false); // Loader state for download

    const [certificateList, setCertificateList] = useState([]);

    const [certificateData, setCertificateData] = useState({
        organization_id: organizationID,
        certificate_id: "",
        certificate_title: "", // Ensure this field is included
        type: "",
        client_name: "",
        dateOfIssue: "",
        issueNumber: "",
        issuedBy: organizationName
    });
    

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

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    const handleDragEnter = () => setIsDragging(true);
    const handleDragLeave = () => setIsDragging(false);
    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };
    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
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

        // console.log("certificateData.certificate_title")
        // console.log(certificateData.certificate_title)
        // console.log("certificateData.certificate_title")
    
        const formData = new FormData();
        formData.append("organization", certificateData.organization_id); 
        formData.append("certificate_id", certificateData.number);  // `number` on frontend -> `certificate_id` on backend
        formData.append("client_name", certificateData.client_name);   // `issuedTo` -> `client_name`
        formData.append("issue_date", certificateData.dateOfIssue); 
        formData.append("certificate_title", certificateData.certificate_title); // Ensure this line is present

        formData.append("issuedBy", certificateData.issuedBy); 

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
            window.location.reload();
        } catch (error) {
            console.error("Error creating certificate:", error);
            alert("Failed to create certificate. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    

    const [selectedCategory, setSelectedCategory] = useState('');

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
        // Perform any other actions based on the selected value
    };


    useEffect(() => {
        const fetchCertificateData = async () => {
            try {
                const response = await axios.get(`${config.API_BASE_URL}/api/certificates/organization/${organizationID}/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setCertificateList(response.data.results || []); // Default to an empty array
            } catch (error) {
                console.error("Error fetching certificate data:", error);
                setCertificateList([]); // Fallback to an empty array
            }
        };
    
        fetchCertificateData();
    }, []);
    
   // Soft delete certificate by id with confirmation
const handleSoftDelete = async (certificate_id) => {
    // Ask for confirmation before proceeding with deletion
    const isConfirmed = window.confirm("Are you sure you want to delete this certificate? This action cannot be undone.");

    if (!isConfirmed) {
        return; // Exit the function if the user cancels the deletion
    }

    try {
        // Make the request to perform the soft delete
        await axios.post(`${config.API_BASE_URL}/api/certificates/${certificate_id}/delete/`, null, {

            
            // headers: {
            //     // "Authorization": `Bearer ${localStorage.getItem("token")}`
            //     "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMxNTA0NzMwLCJpYXQiOjE3MzE1MDQ0MzAsImp0aSI6IjM3ZDk0M2VlZmFmMzRkNTc5YmU4MmIwY2YwMTE2MGU1IiwidXNlcl9pZCI6Mn0.RS28FEgjmx0Mg9W30P9yYToFIe3oNqhaU9KJyRiuIGM`
            // }
        });

        // Remove the deleted certificate from the state list
        setCertificateList(certificateList.filter(cert => cert.certificate_id !== certificate_id));
        alert("Certificate has been deleted (soft delete).");
    } catch (error) {
        console.error("Error deleting certificate:", error);
        alert("Failed to delete certificate. Please try again.");
    }
};

   

    const handleDownloadReceipt = async (receiptUrl, name) => {
        setLoadingDownload(true); // Start loader for download state

        try {
            const response = await axios.get(receiptUrl, {
                responseType: 'blob', // Ensure response is treated as a Blob
            });

            // Fallback if Content-Type is not provided
            const contentType = response.data.type || 'application/pdf';
            const blob = new Blob([response.data], { type: contentType });
            
            // Create URL for the Blob
            const downloadUrl = window.URL.createObjectURL(blob);
            
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = name; // Set the file name
            
            // Append link to the document and initiate download
            document.body.appendChild(link);
            link.click();
            
            // Clean up the URL and link element
            window.URL.revokeObjectURL(downloadUrl);
            document.body.removeChild(link);

        } catch (error) {
            console.error('Error downloading receipt:', error);
            alert("An error occurred during the download. Please try again.");
        } finally {
            setLoadingDownload(false); // Stop loader
        }
    };


    return (
        <div className="Uploaded_Cert_page">
            <section className={`Certificate_Sec ${isCertificateSectionVisible ? 'PopOut_Certificate_Sec' : ''}`}>
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
                                    <h3>Edit certificate</h3>
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
                                            name="certificate_title" // Ensure this matches the state property
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
                                        <b>Note:</b> The uploaded file is solely for internal records management purposes and will not be visible to the verifier or the general public.
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

            <div className="ToP_Upload_env">
                <h3 
                    className={`Upload_Box_Toggler ${isUploadBoxTogglerActive ? 'Active_Upload_Box_Toggler' : ''}`} 
                    onClick={toggleUploadEnvVisibility}
                >
                    Uploaded Certificates <img src={AngleDownIcon} alt="Angle Down Icon" />
                </h3>
                <div className="Upload_Conunter">
                    <span>90</span>
                    <p><b>Uploaded</b> certificates</p>
                </div>
            </div>


    <div className={`Upload_env_main ${isUploadEnvHidden ? 'Hide_Envi_Box' : ''}`}>
    <div className="Cert_Carti_Sel_Sec">
        <h3>Training certificate</h3>
        <div className="Cart_select_Sec">
            <select value={selectedCategory} onChange={handleChange}>
                <option value="">All certificate</option>
                <option value="training">Training certificate</option>
                <option value="inspection">Inspection certificate</option>
            </select>
        </div>
    </div>


    <div className="Table_Sec">
        <table className="Upload_Table">
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>Certificate number</th>
                    <th>Client name</th>
                    <th>Date of issue</th>
                    <th>Issue number</th>
                    <th>Issued by</th>
                    <th>Status</th>
                    <th>Uploaded / E-copy</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {certificateList.map((cert, index) => (
                    <tr key={index}>
                        <td><span className="serial_Number_span">{index + 1}</span></td>
                        <td>{cert.certificate_id}</td>
                        <td>{cert.client_name}</td>
                        <td>{new Date(cert.issue_date).toLocaleDateString()}</td>
                        <td>{cert.issueNumber || cert.certificate_id}</td>
                        <td>{cert.issuedBy  ||  cert.organization_name}</td>
                        <td>
                            <span className="Status_Respn"><img src={VerifiedIcon} alt="Verified Icon" /> Verified</span>
                        </td>
                        <td>
                            <div className="Uploaded_Cert_Div">
                                {cert.pdf_file ? (
                                    <button 
                                        onClick={() => handleDownloadReceipt(cert.pdf_file, `${cert.client_name}.pdf`)}
                                        disabled={loadingDownload} // Disable if downloading
                                    >
                                        {loadingDownload ? 'Downloading...' : 'Download' } 
                                        <img src={DownloadIcon} alt="Download Icon" />
                                    </button>
                                ) : (
                                    <span>Not uploaded</span>
                                )}
                            </div>
                        </td>
                        <td>
                            <div className="td_Btns">
                                <button onClick={handlePreviewButtonClick}>Edit</button>
                                <button onClick={() => handleSoftDelete(cert.certificate_id)}>Delete</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

        </div>
    );
}
