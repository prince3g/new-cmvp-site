// import React, { useState, useEffect } from "react";
// import SiteNavBar from './SiteNavBar';
// import { Link } from "react-router-dom";
// import config from "../../config.js";

// import ChatIcon from './Img/contact-chat-icon.svg';
// import LocationIcon from './Img/location-icon.svg';
// import CallIcon from './Img/call-icon.svg';


// export default function HelpPage() {
//     const currentYear = new Date().getFullYear(); // Get the current year
//     return(
//         <div className="MMha-page">
//             <div className="MMha-page-header">
//             <SiteNavBar />

//             <div className="site-container">
//                 <div className="hero-Blam">
//                     <h2 className="big-text">Help and Support</h2>
//                 </div>
//             </div>

//           </div>


//           <div className='contact-Dlts'>
//         <div className='site-container'>
//         <div className='contact-Dlts-header'>
//             <p>Please use the form below to submit your enquiry, providing as much information and we'll get back to you as swiftly as possible.</p>
//         </div>

//         <div className='Contact_SeccO_1'>
//             <ul>
//               <li>
//                 <span className='DDl_Span'>
//                   <img src={ChatIcon} alt='Chat icon'></img>
//                 </span>
//                 <div className='DDl_Div'>
//                   <h3>Email us</h3>
//                   <h4><a href='#'>info@cmvp.com</a></h4>
//                 </div>
//               </li>


//               <li>
//                 <span className='DDl_Span'>
//                   <img src={CallIcon} alt='Call icon'></img>
//                 </span>
//                 <div className='DDl_Div'>
//                   <h3>Call us</h3>
//                   <h4><a href='#'>+234 807 970 1019</a>, <a href='#'> +234 911 459 7013</a></h4>
//                 </div>
//               </li>

//               <li>
//                 <span className='DDl_Span'>
//                   <img src={LocationIcon} alt='Location icon'></img>
//                 </span>
//                 <div className='DDl_Div'>
//                   <h3>Location</h3>
//                   <h4>Plot 5 Owule Ojuan Street, off Peter Odili Road, Trans Amadi, Port Harcourt, Rivers</h4>
//                 </div>
//               </li>


              


//             </ul>
//           </div>


//           <div className='message_Sec'>
//             <h2 className='big-text'>Message</h2>
//             <form className='message-form'>
//               <div className='message-DFlex'>
//               <div className='message-form-input'>
//                 <input type='text' name='' placeholder='Full Name' required></input>
//               </div>
//               <div className='message-form-input'>
//               <input type='text' name='' placeholder='Email Address' required></input>
//               </div>
//               </div>
//               <div className='message-DFlex'>
//               <div className='message-form-input'>
//               <input type='text' name='' placeholder='Phone Number' required></input>
//               </div>
//               <div className='message-form-input'>
//               <select required>
//                     <option>--Select service of interest--</option>
//                     <option>Consultancy</option>
//                     <option>Engineering</option>
//                     <option>Project Management</option>
//                     <option>Supply Chain Management</option>
//                     <option>Learning and Development</option>
//                    </select>
//               </div>
//               </div>
//               <div className='message-form-input'>
//                 <textarea placeholder='Message' required></textarea>
//               </div>
      
//               <div className='message-form-input'>
//                       <button>Send messge</button>
//                    </div>
//             </form>
//           </div>

//         </div>
//     </div>




//             <div className="hero-foot">
//             <div className="site-container">
//             <p>Powered by <a href="https://prolianceltd.com" target="_blank" rel="noopener noreferrer">Proliance LTD (ISO 9001 certifided company)</a></p>
//                     <p>© {currentYear}</p>
//                     </div>
//                 </div>

                
//         </div>
//     )
// }




import React, { useState } from "react";
import SiteNavBar from './SiteNavBar';
import { Link } from "react-router-dom";
import config from "../../config.js";

import ChatIcon from './Img/contact-chat-icon.svg';
import LocationIcon from './Img/location-icon.svg';
import CallIcon from './Img/call-icon.svg';

import MainFooter from './MainFooter';

export default function HelpPage() {
    const currentYear = new Date().getFullYear(); // Get the current year

    // State for form inputs
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        serviceInterest: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`${config.API_BASE_URL}/api/accounts/auth/send-contact-email/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`Failed to send message: ${response.statusText}`);
            }

            const data = await response.json();
            alert("Message sent successfully!");
            setFormData({
                fullName: "",
                email: "",
                phone: "",
                serviceInterest: "",
                message: ""
            });
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send the message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="MMha-page">
            <div className="MMha-page-header">
                <SiteNavBar />

                <div className="site-container">
                    <div className="hero-Blam">
                        <h2 className="big-text">Help and Support</h2>
                    </div>
                </div>
            </div>

            <div className="contact-Dlts">
                <div className="site-container">
                    <div className="contact-Dlts-header">
                        <p>
                            Please use the form below to submit your enquiry, providing as much information as possible, and we'll get back to you as swiftly as possible.
                        </p>
                    </div>

                    <div className="Contact_SeccO_1">
                        <ul>
                            <li>
                                <span className="DDl_Span">
                                    <img src={ChatIcon} alt="Chat icon" />
                                </span>
                                <div className="DDl_Div">
                                    <h3>Email us</h3>
                                    <h4><a href="mailto:info@cmvp.net">info@cmvp.net</a></h4>
                                </div>
                            </li>
                            <li>
                                <span className="DDl_Span">
                                    <img src={CallIcon} alt="Call icon" />
                                </span>
                                <div className="DDl_Div">
                                    <h3>Call us</h3>
                                    <h4><a href="tel:+2348079701019">+234 807 970 1019</a>, <a href="tel:+2349114597013">+234 911 459 7013</a></h4>
                                </div>
                            </li>
                            <li>
                                <span className="DDl_Span">
                                    <img src={LocationIcon} alt="Location icon" />
                                </span>
                                <div className="DDl_Div">
                                    <h3>Location</h3>
                                    <h4>Plot 5 Owule Ojuan Street, off Peter Odili Road, Trans Amadi, Port Harcourt, Rivers</h4>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="message_Sec">
                        <h2 className="big-text">Message</h2>
                        <form className="message-form" onSubmit={handleSubmit}>
                            <div className="message-DFlex">
                                <div className="message-form-input">
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Full Name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="message-form-input">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="message-DFlex">
                                <div className="message-form-input">
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="message-form-input">
                                    <select
                                        name="serviceInterest"
                                        value={formData.serviceInterest}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">--Select service of interest--</option>
                                        <option value="Consultancy">Consultancy</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Project Management">Project Management</option>
                                        <option value="Supply Chain Management">Supply Chain Management</option>
                                        <option value="Learning and Development">Learning and Development</option>
                                    </select>
                                </div>
                            </div>
                            <div className="message-form-input">
                                <textarea
                                    name="message"
                                    placeholder="Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="message-form-input">
                                <button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

           <MainFooter />
        </div>
    );
}
