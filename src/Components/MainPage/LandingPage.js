import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SiteNavBar from './SiteNavBar';
import config from "../../config.js";
import HeroWave from './Img/hero-wave.svg';
import StyleArrow from './Img/style-arrow.svg';
import OnSetImg from './Img/OnSetImg.png';
import MinusIcon from './Img/minus-icon.svg';
import CheckIcon from './Img/check-icon.svg';

export default function LandingPage() {
    const [plans, setPlans] = useState([]);
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



    const handleSubscribeClick = async (plan) => {
        const isLoggedIn = localStorage.getItem("authToken");
        const authToken = localStorage.getItem("authToken");
        const authUserId = localStorage.getItem("authUserId");
    
        if (!isLoggedIn) {
            setFlashMessage("Please login or register to continue"); // Show flash message
            setTimeout(() => {
                setFlashMessage(""); // Clear flash message after 3 seconds
                navigate("/login"); // Redirect to login
            }, 3000);
            return;
        }
    
        const payload = {
            user: authUserId,
            subscription_plan: plan,
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
                // Capture the detailed error message from the response
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to subscribe");
            }
    
            navigate("/dashboard");
            const result = await response.json();
            localStorage.setItem("subscription_plan", result.subscription_plan);
            
        } catch (error) {
            console.error("Error subscribing:", error);
            // Display the error message from the backend (or generic message)
            setFlashMessage(error.message || "An unexpected error occurred");
            setTimeout(() => {
                setFlashMessage(""); // Clear flash message after 3 seconds
            }, 3000);
        }
    };
    

    const currentYear = new Date().getFullYear(); // Get the current year

    return (
        <div className="Landing-page MMha-page">
            <div className="Hero-Landing-page">
                <SiteNavBar />
                <img src={HeroWave} className="Hero-waveoo" />
                <div className="site-container">
                    <div className="HHh_Hero_Sec">
                        <h1 className="large-text">Certificate <span>Management</span> and Verification Portal</h1>
                        <Link to="signup">Get started with CMVP <img src={StyleArrow} alt="Arrow" /></Link>
                    </div>
                </div>
            </div>

            <div className="site-container">
                <div className="TopTt_Geta">
                    <div className="TopTt_Geta_1">
                        <h2 className="big-text">Digital certificate verification</h2>
                    </div>
                    <div className="TopTt_Geta_2">
                        <p>Efficiently validate, issue, and manage your digital certificates with our secure and user-friendly verification and management portal.</p>
                        <p>Experience secure and efficient digital certificate verification and management with our advanced and user-friendly portal.</p>
                        <Link to="/signup">Get started with CMVP</Link>
                    </div>
                </div>

                <div className="Pricing_Sec">
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
                                        <div className="pricing_Top_Btns">
                                            {["1 Month", "3 Months", "6 Months", "1 Year"].map((duration) => (
                                                <button key={duration} className="plan_btn">
                                                    {duration}
                                                </button>
                                            ))}
                                        </div>
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
                                                Subscribe
                                            </Link>
                                            {flashMessage && <div className="flash-message">{flashMessage}</div>} {/* Flash message element */}
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

            <div className="hero-foot">
                <div className="site-container">
                    <p>Powered by <a href="https://prolianceltd.com" target="_blank" rel="noopener noreferrer">Proliance LTD (ISO 9001 certified company)</a></p>
                    <p>© {currentYear}</p>
                </div>
            </div>
        </div>
    );
}
