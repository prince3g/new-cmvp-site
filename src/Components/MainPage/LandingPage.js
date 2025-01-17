import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import SiteNavBar from './SiteNavBar';
import config from "../../config.js";
import HeroWave from './Img/hero-wave.svg';
import StyleArrow from './Img/style-arrow.svg';
import OnSetImg from './Img/OnSetImg.png';
import MinusIcon from './Img/minus-icon.svg';
import CheckIcon from './Img/check-icon.svg';
import DirectArrow from './Img/direct-arrow.png';

import MainFooter from './MainFooter';

export default function LandingPage() {
    const [plans, setPlans] = useState([]);
    const [isSubscribing, setIsSubscribing] = useState(null); // Track the plan being subscribed to
    const [isLoading, setIsLoading] = useState(false); // State to track loading status

    const navigate = useNavigate();
    const [flashMessage, setFlashMessage] = useState(""); // State for flash message

    useEffect(() => {
        // Fetch subscription plans
        const fetchPlans = async () => {
            try {
                const response = await fetch(`${config.API_BASE_URL}/api/subscription/auth/api/subscription-plans/`);
                const data = await response.json();
                setPlans(data.results); // The actual plans are in `results` array
                //console.log("Fetched Plans Data: ", data);
            } catch (error) {
                console.error("Error fetching subscription plans:", error);
            }
        };
        fetchPlans();



        // Check if the user is logged in and fetch subscription details
        const fetchSubscriptionDetails = async () => {
            const authToken = localStorage.getItem("authToken");
            const authUserId = localStorage.getItem("authUserId");

            if (authToken && authUserId) {
                try {
                    const response = await fetch(`${config.API_BASE_URL}/api/subscription/auth/api/user-subscription/${authUserId}/`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${authToken}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error("Failed to fetch subscription details");
                    }

                    const data = await response.json();

                    localStorage.setItem("subscriptionDetails", JSON.stringify(data)); // Store subscription data in local storage
                    //console.log("Subscription Details: ", data);

                } catch (error) {
                    console.error("Error fetching subscription details:", error);
                }
            }
        };
        fetchSubscriptionDetails();
    }, []); // Empty dependency array, runs on component mount



    const handleSubscribeClick = async (planId) => {
        setIsSubscribing(planId); // Start loader for the specific plan
        const authToken = localStorage.getItem("authToken");
        const authUserId = localStorage.getItem("authUserId");

        if (!authToken) {
            setFlashMessage("Please login or register to continue");
            setTimeout(() => {
                setFlashMessage("");
                navigate("/login");
            }, 3000);
            setIsSubscribing(null); // Stop loader
            return;
        }

        const payload = {
            user: authUserId,
            subscription_plan: planId,
            transaction_id: "your_transaction_id"
        };

        try {

            const response = await fetch(`${config.API_BASE_URL}/api/subscription/auth/api/user-subscriptions/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to subscribe");
            }

            const result = await response.json();
            localStorage.setItem("subscription_plan", result.subscription_plan);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error subscribing:", error);
            setFlashMessage(error.message || "An unexpected error occurred");
            setTimeout(() => setFlashMessage(""), 3000);
        } finally {
            setIsSubscribing(null); // Stop loader
        }
    };



    const [paymentData, setpaymentData] = useState({
        key: "", // enter your key here
        customerId: "",
        firstName: "",
        lastName: "",
        email: "",
        amount: null,
        narration: "",
      });
      let data = {
        ...paymentData,
        onSuccess: function (response) {
          // function callback when payment is successful
          console.log("callback Successful Response", response);
        },
        onError: function (response) {
          // function callback when payment fails
          console.log("callback Error Response", response);
        },
        onClose: function () {
          // function callback when payment modal is closed
          console.log("closed");
        },
      };


    return (
        <div className="Landing-page MMha-page">
            <div className="Hero-Landing-page">
                <SiteNavBar />
                <img src={HeroWave} className="Hero-waveoo" />
                <div className="site-container">
                    <div className="HHh_Hero_Sec">
                        <h1 className="large-text">Certificate <span>Management</span> and Verification Portal</h1>
                        <p>Experience secure and efficient digital certificate verification and management with our advanced and user-friendly portal.</p>
                        <Link to="signup">Get started with CMVP <img src={StyleArrow} alt="Arrow" /></Link>
                    </div>
                </div>
            </div>

            <div className="site-container">
                <div className="TopTt_Geta">
                    <div className="TopTt_Geta_1">
                        <h2 className="big-text">Digital certificate verification system</h2>
                    </div>
                    <div className="TopTt_Geta_2">
                        <p>Manage and create unique certificate verification link for;</p>
                        <ul>
                            <li>Inspection Certificates</li>
                            <li>Calibration Certificates</li>
                            <li>Training Certificates</li>
                            <li>School results</li>
                            <li>All generated and issued certificates requiring verification</li>
                        </ul>
                    </div>
                </div>

                <div className="haggs-sec">
                    <div className="haggs-Box">
                        <img src={DirectArrow}></img>
                        <p>GENERATE UNIQUE CERTIFICATE VERIFICATION URL LINK</p>
                    </div>

                    <div className="haggs-Box">
                    <img src={DirectArrow}></img>
                        <p>CREATE MULTIPLE CERTIFICATE CATEGORIES</p>
                    </div>

                    <div className="haggs-Box">
                    <img src={DirectArrow}></img>
                        <p>UPLOAD CERTIFICATE DETAILS FOR VERFIFICATION</p>
                    </div>

                    <div className="haggs-Box">
                    <img src={DirectArrow}></img>
                        <p>CUSTOMISE YOUR VERIFICATION PAGE</p>
                    </div>
                </div>
                

                <div  className="Pricing_Sec">
                    <div className="Pricing_top">
                        <h2 className="big-text">Subscription Plans</h2>
                        <p>Subscription plans for certificate management and verification portal (CMVP).</p>
                    </div>
                    <div className="Plans_Sec">
                        {plans.length > 0 ? (
                            plans.map((plan) => (
                                <div key={plan.id} className="plan_box">
                                    <div className="Pricing_sub">
                                        <h3>{plan.name}</h3>
                                        {/* <div className="pricing_Top_Btns">
                                            {["1 Month", "3 Months", "6 Months", "1 Year"].map((duration) => (
                                                <button key={duration} className="plan_btn">
                                                    {duration}
                                                </button>
                                            ))}
                                        </div> */}
                                        <p>Get started Managing your certificates</p>
                                    </div>
                                    <div className="plan_box_Top">
                                        <div className="plan_box_Top_1">
                                            <h3>{plan.name}</h3>
                                        </div>
                                        <div className="plan_box_Top_1">
                                    <h3 className="plan_price">${plan.price}</h3>
                                    <Link
                                        to="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleSubscribeClick(plan.unique_subscription_plan_id);
                                        }}
                                        >
                                        {isSubscribing === plan.unique_subscription_plan_id ? "Subscribing..." : "Subscribe"}
                                    </Link>
                                    {flashMessage && <div className="flash-message">{flashMessage}</div>}
                                </div>

                                    </div>
                                    <div className="plan_box_Body">
                                        <table className="plan_table">
                                            <thead>
                                                <tr>
                                                    <th>Feature</th>
                                                    <th>Active</th>
                                                    <th>Not Active</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Access to portal</td>
                                                    <td>
                                                        {plan.features.access_deleted_certificates_files ? (
                                                            <span className="Check_Span">
                                                                <img src={CheckIcon} alt="Check Icon" />
                                                            </span>
                                                        ) : (
                                                            <span>
                                                                <img src={MinusIcon} alt="Minus Icon" />
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {!plan.features.access_deleted_certificates_files ? (
                                                            <span className="Check_Span">
                                                                <img src={MinusIcon} alt="Minus Icon" />
                                                            </span>
                                                        ) : (
                                                            <span>
                                                                <img src={CheckIcon} alt="Check Icon" />
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Add up to {plan.features.num_certificate_categories} certificate categories</td>
                                                    <td>
                                                        <span className="Check_Span">
                                                            <img src={CheckIcon} alt="Check Icon" />
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span>
                                                            <img src={MinusIcon} alt="Minus Icon" />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Upload up to {plan.features.num_daily_certificate_upload} certificates daily</td>
                                                    <td>
                                                        <span className="Check_Span">
                                                            <img src={CheckIcon} alt="Check Icon" />
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span>
                                                            <img src={MinusIcon} alt="Minus Icon" />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Access to deleted certificates and files</td>
                                                    <td>
                                                        {plan.features.access_deleted_certificates_files ? (
                                                            <span className="Check_Span">
                                                                <img src={CheckIcon} alt="Check Icon" />
                                                            </span>
                                                        ) : (
                                                            <span>
                                                                <img src={MinusIcon} alt="Minus Icon" />
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {!plan.features.access_deleted_certificates_files ? (
                                                            <span className="Check_Span">
                                                                <img src={MinusIcon} alt="Minus Icon" />
                                                            </span>
                                                        ) : (
                                                            <span>
                                                                <img src={CheckIcon} alt="Check Icon" />
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>{plan.features.maximum_login_users} maximum login users</td>
                                                    <td>
                                                        <span className="Check_Span">
                                                            <img src={CheckIcon} alt="Check Icon" />
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span>
                                                            <img src={MinusIcon} alt="Minus Icon" />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>24/7 support</td>
                                                    <td>
                                                        {plan.features["24/7_support"] ? (
                                                            <span className="Check_Span">
                                                                <img src={CheckIcon} alt="Check Icon" />
                                                            </span>
                                                        ) : (
                                                            <span>
                                                                <img src={MinusIcon} alt="Minus Icon" />
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {!plan.features["24/7_support"] ? (
                                                            <span className="Check_Span">
                                                                <img src={MinusIcon} alt="Minus Icon" />
                                                            </span>
                                                        ) : (
                                                            <span>
                                                                <img src={CheckIcon} alt="Check Icon" />
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Loading plans...</p>
                        )}
                    </div>
                </div>
            </div>

           <MainFooter />
        </div>
    );
}





// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { HashLink } from 'react-router-hash-link';
// import SiteNavBar from './SiteNavBar';
// import config from "../../config.js";
// import HeroWave from './Img/hero-wave.svg';
// import StyleArrow from './Img/style-arrow.svg';
// import OnSetImg from './Img/OnSetImg.png';
// import MinusIcon from './Img/minus-icon.svg';
// import CheckIcon from './Img/check-icon.svg';
// import DirectArrow from './Img/direct-arrow.png';

// import MainFooter from './MainFooter';

// export default function LandingPage() {
//     const [plans, setPlans] = useState([]);
//     const [selectedDuration, setSelectedDuration] = useState("1 Month"); // Track selected duration

//     const [isSubscribing, setIsSubscribing] = useState(null); // Track the plan being subscribed to
//     const [isLoading, setIsLoading] = useState(false); // State to track loading status

//     const navigate = useNavigate();
//     const [flashMessage, setFlashMessage] = useState(""); // State for flash message

//     useEffect(() => {
//         // Fetch subscription plans
//         const fetchPlans = async () => {
//             try {
//                 const response = await fetch(`${config.API_BASE_URL}/api/subscription/auth/api/subscription-plans/`);
//                 const data = await response.json();
//                 setPlans(data.results); // The actual plans are in `results` array
//                 //console.log("Fetched Plans Data: ", data);
//             } catch (error) {
//                 console.error("Error fetching subscription plans:", error);
//             }
//         };
//         fetchPlans();



//         // Check if the user is logged in and fetch subscription details
//         const fetchSubscriptionDetails = async () => {
//             const authToken = localStorage.getItem("authToken");
//             const authUserId = localStorage.getItem("authUserId");

//             if (authToken && authUserId) {
//                 try {
//                     const response = await fetch(`${config.API_BASE_URL}/api/subscription/auth/api/user-subscription/${authUserId}/`, {
//                         method: "GET",
//                         headers: {
//                             "Authorization": `Bearer ${authToken}`,
//                         },
//                     });

//                     if (!response.ok) {
//                         throw new Error("Failed to fetch subscription details");
//                     }

//                     const data = await response.json();

//                     localStorage.setItem("subscriptionDetails", JSON.stringify(data)); // Store subscription data in local storage
//                     //console.log("Subscription Details: ", data);

//                 } catch (error) {
//                     console.error("Error fetching subscription details:", error);
//                 }
//             }
//         };
//         fetchSubscriptionDetails();
//     }, []); // Empty dependency array, runs on component mount



//     // const handleSubscribeClick = async (planId) => {
//     //     setIsSubscribing(planId); // Start loader for the specific plan
//     //     const authToken = localStorage.getItem("authToken");
//     //     const authUserId = localStorage.getItem("authUserId");

//     //     if (!authToken) {
//     //         setFlashMessage("Please login or register to continue");
//     //         setTimeout(() => {
//     //             setFlashMessage("");
//     //             navigate("/login");
//     //         }, 3000);
//     //         setIsSubscribing(null); // Stop loader
//     //         return;
//     //     }

//     //     const payload = {
//     //         user: authUserId,
//     //         subscription_plan: planId,
//     //         transaction_id: "your_transaction_id"
//     //     };

//     //     try {

//     //         const response = await fetch(`${config.API_BASE_URL}/api/subscription/auth/api/user-subscriptions/`, {
//     //             method: "POST",
//     //             headers: {
//     //                 "Content-Type": "application/json",
//     //                 "Authorization": `Bearer ${authToken}`
//     //             },
//     //             body: JSON.stringify(payload)
//     //         });

//     //         if (!response.ok) {
//     //             const errorData = await response.json();
//     //             throw new Error(errorData.detail || "Failed to subscribe");
//     //         }

//     //         const result = await response.json();
//     //         localStorage.setItem("subscription_plan", result.subscription_plan);
//     //         navigate("/dashboard");
//     //     } catch (error) {
//     //         console.error("Error subscribing:", error);
//     //         setFlashMessage(error.message || "An unexpected error occurred");
//     //         setTimeout(() => setFlashMessage(""), 3000);
//     //     } finally {
//     //         setIsSubscribing(null); // Stop loader
//     //     }
//     // };

//     const handleSubscribeClick = async (planId) => {
//         setIsSubscribing(planId); // Start loader for the specific plan
//         const authToken = localStorage.getItem("authToken");
//         const authUserId = localStorage.getItem("authUserId");
    
//         if (!authToken) {
//             setFlashMessage("Please login or register to continue");
//             setTimeout(() => {
//                 setFlashMessage("");
//                 navigate("/login");
//             }, 3000);
//             setIsSubscribing(null); // Stop loader
//             return;
//         }
    
//         const payload = {
//             user: authUserId,
//             subscription_plan: planId,
//             transaction_id: "your_transaction_id",
//             duration: selectedDuration,
//             total_price: "updatedPrice" // Add the updated price to the payload // Add the selected duration to the payload
//         };
    
//         try {
//             const response = await fetch(`${config.API_BASE_URL}/api/subscription/auth/api/user-subscriptions/`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${authToken}`
//                 },
//                 body: JSON.stringify(payload)
//             });
    
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.detail || "Failed to subscribe");
//             }
    
//             const result = await response.json();
//             localStorage.setItem("subscription_plan", result.subscription_plan);
//             navigate("/dashboard");
//         } catch (error) {
//             console.error("Error subscribing:", error);
//             setFlashMessage(error.message || "An unexpected error occurred");
//             setTimeout(() => setFlashMessage(""), 3000);
//         } finally {
//             setIsSubscribing(null); // Stop loader
//         }
//     };
    

//     const [paymentData, setpaymentData] = useState({
//         key: "", // enter your key here
//         customerId: "",
//         firstName: "",
//         lastName: "",
//         email: "",
//         amount: null,
//         narration: "",
//       });
//       let data = {
//         ...paymentData,
//         onSuccess: function (response) {
//           // function callback when payment is successful
//           console.log("callback Successful Response", response);
//         },
//         onError: function (response) {
//           // function callback when payment fails
//           console.log("callback Error Response", response);
//         },
//         onClose: function () {
//           console.log("closed");
//         },
//       };

//     const updatePrice = (planId, duration) => {
//     setSelectedDuration(duration);

//     const updatedPlans = plans.map(plan => {
//         if (plan.id === planId) {
//             let newPrice = plan.price; 
//             if (duration === "3 Months") {
//                 newPrice = plan.price * 3; 
//             } else if (duration === "6 Months") {
//                 newPrice = plan.price * 6; 
//             } else if (duration === "1 Year") {
//                 newPrice = plan.price * 12; 
//             }

//             return {
//                 ...plan,
//                 updatedPrice: newPrice, 
//             };
//         }
//         return plan; 
//     });

//     setPlans(updatedPlans);
//     };



//     return (
//         <div className="Landing-page MMha-page">
//             <div className="Hero-Landing-page">
//                 <SiteNavBar />
//                 <img src={HeroWave} className="Hero-waveoo" />
//                 <div className="site-container">
//                     <div className="HHh_Hero_Sec">
//                         <h1 className="large-text">Certificate <span>Management</span> and Verification Portal</h1>
//                         <p>Experience secure and efficient digital certificate verification and management with our advanced and user-friendly portal.</p>
//                         <Link to="signup">Get started with CMVP <img src={StyleArrow} alt="Arrow" /></Link>
//                     </div>
//                 </div>
//             </div>

//             <div className="site-container">
//                 <div className="TopTt_Geta">
//                     <div className="TopTt_Geta_1">
//                         <h2 className="big-text">Digital certificate verification system</h2>
//                     </div>
//                     <div className="TopTt_Geta_2">
//                         <p>Manage and create unique certificate verification link for;</p>
//                         <ul>
//                             <li>Inspection Certificates</li>
//                             <li>Calibration Certificates</li>
//                             <li>Training Certificates</li>
//                             <li>School results</li>
//                             <li>All generated and issued certificates requiring verification</li>
//                         </ul>
//                     </div>
//                 </div>

//                 <div className="haggs-sec">
//                     <div className="haggs-Box">
//                         <img src={DirectArrow}></img>
//                         <p>GENERATE UNIQUE CERTIFICATE VERIFICATION URL LINK</p>
//                     </div>

//                     <div className="haggs-Box">
//                     <img src={DirectArrow}></img>
//                         <p>CREATE MULTIPLE CERTIFICATE CATEGORIES</p>
//                     </div>

//                     <div className="haggs-Box">
//                     <img src={DirectArrow}></img>
//                         <p>UPLOAD CERTIFICATE DETAILS FOR VERFIFICATION</p>
//                     </div>

//                     <div className="haggs-Box">
//                     <img src={DirectArrow}></img>
//                         <p>CUSTOMISE YOUR VERIFICATION PAGE</p>
//                     </div>
//                 </div>
                

//                 <div  className="Pricing_Sec">
//                     <div className="Pricing_top">
//                         <h2 className="big-text">Subscription Plans</h2>
//                         <p>Subscription plans for certificate management and verification portal (CMVP).</p>
//                     </div>
//                     <div className="Plans_Sec">
//                         {plans.length > 0 ? (
//                             plans.map((plan) => (
//                                 <div key={plan.id} className="plan_box">
//                                     <div className="Pricing_sub">
//                                         <h3>{plan.name}</h3>
//                                         <div className="pricing_Top_Btns">
//                                             {["1 Month", "3 Months", "6 Months", "1 Year"].map((duration) => (
 

//                                                 <button
//                                                     key={duration}
//                                                     className={`plan_btn ${selectedDuration === duration ? "active" : ""}`}
//                                                     onClick={() => updatePrice(plan.id, duration)} // Pass plan.id and duration to the updatePrice function
//                                                 >
//                                                     {duration}
//                                                 </button>

//                                             ))}
//                                         </div>
//                                     </div>
//                                     <div className="plan_box_Top">
//                                         <div className="plan_box_Top_1">
//                                             <h3>{plan.name}</h3>
//                                         </div>
//                                         <div className="plan_box_Top_1">
//                                             <h3 className="plan_price">${plan.updatedPrice || plan.price}</h3>
//                                             <Link
//                                                 to="#"
//                                                 onClick={(e) => {
//                                                     e.preventDefault();
//                                                     handleSubscribeClick(plan.unique_subscription_plan_id);
//                                                 }}
//                                             >
//                                                 {isSubscribing === plan.unique_subscription_plan_id ? "Subscribing..." : "Subscribe"}
//                                             </Link>
//                                             {flashMessage && <div className="flash-message">{flashMessage}</div>}
//                                         </div>


//                                     </div>
                                    
//                                     <div className="plan_box_Body">
//                                         <table className="plan_table">
//                                             <thead>
//                                                 <tr>
//                                                     <th>Feature</th>
//                                                     <th>Active</th>
//                                                     <th>Not Active</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 <tr>
//                                                     <td>Access to portal</td>
//                                                     <td>
//                                                         {plan.features.access_deleted_certificates_files ? (
//                                                             <span className="Check_Span">
//                                                                 <img src={CheckIcon} alt="Check Icon" />
//                                                             </span>
//                                                         ) : (
//                                                             <span>
//                                                                 <img src={MinusIcon} alt="Minus Icon" />
//                                                             </span>
//                                                         )}
//                                                     </td>
//                                                     <td>
//                                                         {!plan.features.access_deleted_certificates_files ? (
//                                                             <span className="Check_Span">
//                                                                 <img src={MinusIcon} alt="Minus Icon" />
//                                                             </span>
//                                                         ) : (
//                                                             <span>
//                                                                 <img src={CheckIcon} alt="Check Icon" />
//                                                             </span>
//                                                         )}
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td>Add up to {plan.features.num_certificate_categories} certificate categories</td>
//                                                     <td>
//                                                         <span className="Check_Span">
//                                                             <img src={CheckIcon} alt="Check Icon" />
//                                                         </span>
//                                                     </td>
//                                                     <td>
//                                                         <span>
//                                                             <img src={MinusIcon} alt="Minus Icon" />
//                                                         </span>
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td>Upload up to {plan.features.num_daily_certificate_upload} certificates daily</td>
//                                                     <td>
//                                                         <span className="Check_Span">
//                                                             <img src={CheckIcon} alt="Check Icon" />
//                                                         </span>
//                                                     </td>
//                                                     <td>
//                                                         <span>
//                                                             <img src={MinusIcon} alt="Minus Icon" />
//                                                         </span>
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td>Access to deleted certificates and files</td>
//                                                     <td>
//                                                         {plan.features.access_deleted_certificates_files ? (
//                                                             <span className="Check_Span">
//                                                                 <img src={CheckIcon} alt="Check Icon" />
//                                                             </span>
//                                                         ) : (
//                                                             <span>
//                                                                 <img src={MinusIcon} alt="Minus Icon" />
//                                                             </span>
//                                                         )}
//                                                     </td>
//                                                     <td>
//                                                         {!plan.features.access_deleted_certificates_files ? (
//                                                             <span className="Check_Span">
//                                                                 <img src={MinusIcon} alt="Minus Icon" />
//                                                             </span>
//                                                         ) : (
//                                                             <span>
//                                                                 <img src={CheckIcon} alt="Check Icon" />
//                                                             </span>
//                                                         )}
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td>{plan.features.maximum_login_users} maximum login users</td>
//                                                     <td>
//                                                         <span className="Check_Span">
//                                                             <img src={CheckIcon} alt="Check Icon" />
//                                                         </span>
//                                                     </td>
//                                                     <td>
//                                                         <span>
//                                                             <img src={MinusIcon} alt="Minus Icon" />
//                                                         </span>
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td>24/7 support</td>
//                                                     <td>
//                                                         {plan.features["24/7_support"] ? (
//                                                             <span className="Check_Span">
//                                                                 <img src={CheckIcon} alt="Check Icon" />
//                                                             </span>
//                                                         ) : (
//                                                             <span>
//                                                                 <img src={MinusIcon} alt="Minus Icon" />
//                                                             </span>
//                                                         )}
//                                                     </td>
//                                                     <td>
//                                                         {!plan.features["24/7_support"] ? (
//                                                             <span className="Check_Span">
//                                                                 <img src={MinusIcon} alt="Minus Icon" />
//                                                             </span>
//                                                         ) : (
//                                                             <span>
//                                                                 <img src={CheckIcon} alt="Check Icon" />
//                                                             </span>
//                                                         )}
//                                                     </td>
//                                                 </tr>
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>Loading plans...</p>
//                         )}
//                     </div>
//                 </div>
//             </div>

//            <MainFooter />
//         </div>
//     );
// }
