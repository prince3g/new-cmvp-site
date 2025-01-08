import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import './Css/Dash.css';
import config from "../../config.js";

import MinusIcon from './Img/minus-icon.svg';
import CheckIcon from './Img/check-icon.svg';

export default function Pricing() {
    
    const [activePlanFree, setActivePlanFree] = useState("1 Month");
    const [activePlanBasic, setActivePlanBasic] = useState("1 Month");
    const [activePlanPro, setActivePlanPro] = useState("1 Month");

    const [basicPrice, setBasicPrice] = useState(200);
    const [proPrice, setProPrice] = useState(350);

    const [plans, setPlans] = useState([]);

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
    }, []);


    const handlePlanClick = (plan, setActivePlan, setPrice, basePrice) => {
        setActivePlan(plan);
        let multiplier = 1;
        switch(plan) {
            case "3 Months":
                multiplier = 3;
                break;
            case "6 Months":
                multiplier = 6;
                break;
            case "1 Year":
                multiplier = 12;
                break;
            default:
                multiplier = 1;
        }
        setPrice(basePrice * multiplier);
    };

    return (
        <div className="Pricing_Sec">
            <div className="Pricing_top">
                <h2>Subscription Plans</h2>
                <p>Subscription plans for certificate management and verification portal (CMVP).</p>
            </div>

            {/* <div className="Plans_Sec">

                <div className="plan_box">
                    <div className="Pricing_sub">
                        <h3>Choose Plan</h3>
                        <div className="pricing_Top_Btns">
                            {["1 Month", "3 Months", "6 Months", "1 Year"].map(plan => (
                                <button 
                                    key={plan} 
                                    className={activePlanFree === plan ? "active_Plan_Selt_btn" : ""} 
                                    onClick={() => handlePlanClick(plan, setActivePlanFree, () => {}, 0)}
                                >
                                    {plan}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="plan_box_Top">
                        <div className="plan_box_Top_1">
                            <h3>Basic Plan</h3>
                            <p>Subscribe for 30 days free trial</p>
                        </div> 
                        <div className="plan_box_Top_1">
                            <h3 className="plan_price">$0</h3>
                            <a href="#">Subscribe</a>
                        </div> 
                    </div> 

                    <div className="plan_box_Body">
                        <table className="plan_table">
                            <tr>
                                <th></th>
                                <th><h3>Active</h3></th>
                                <th><h3>Not active</h3></th>
                            </tr>
                            <tr>
                                <td>Access to portal</td>
                                <td><span className="Check_Span"><img src={CheckIcon}></img></span></td>
                                <td><span><img src={MinusIcon}></img></span></td>
                            </tr>
                            <tr>
                                <td>Add upto 2 certificate cartegories</td>
                                <td><span className="Check_Span"><img src={CheckIcon}></img></span></td>
                                <td><span><img src={MinusIcon}></img></span></td>
                            </tr>
                            <tr>
                                <td>Upload up to 10 certificates daily</td>
                                <td><span className="Check_Span"><img src={CheckIcon}></img></span></td>
                                <td><span><img src={MinusIcon}></img></span></td>
                            </tr>
                            <tr>
                                <td>Upload files (pdf, Jpeg, PNG)</td>
                                <td><span className="Check_Span"><img src={CheckIcon}></img></span></td>
                                <td><span><img src={MinusIcon}></img></span></td>
                            </tr>
                            <tr>
                                <td>Access to deleted certificates and files</td>
                                <td><span className="Check_Span"><img src={CheckIcon}></img></span></td>
                                <td><span><img src={MinusIcon}></img></span></td>
                            </tr>
                            <tr>
                                <td>3 maximum login users</td>
                                <td><span className="Check_Span"><img src={CheckIcon}></img></span></td>
                                <td><span><img src={MinusIcon}></img></span></td>
                            </tr>
                            <tr>
                                <td>24/7 support</td>
                                <td><span className="Check_Span"><img src={CheckIcon}></img></span></td>
                                <td><span><img src={MinusIcon}></img></span></td>
                            </tr>
                        </table>
                    </div>
                </div> 



                <div className="plan_box">
                    <div className="Pricing_sub">
                        <h3>Choose Plan</h3>
                        <div className="pricing_Top_Btns">
                            {["1 Month", "3 Months", "6 Months", "1 Year"].map(plan => (
                                <button 
                                    key={plan} 
                                    className={activePlanPro === plan ? "active_Plan_Selt_btn" : ""} 
                                    onClick={() => handlePlanClick(plan, setActivePlanPro, setProPrice, 350)}
                                >
                                    {plan}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="plan_box_Top">
                        <div className="plan_box_Top_1">
                            <h3>Pro Plan</h3>
                            <p>Subscribe to CMVP Pro plan</p>
                        </div> 
                        <div className="plan_box_Top_1">
                            <h3 className="plan_price">${proPrice}</h3>
                            <a href="#">Subscribe</a>
                        </div> 
                    </div> 

                    <div className="plan_box_Body">
                        <table className="plan_table">
                            <tr>
                                <th></th>
                                <th><h3>Active</h3></th>
                                <th><h3>Not active</h3></th>
                            </tr>
                            <tr>
                                <td>Access to portal</td>
                                <td><span className="Check_Span"><img src={CheckIcon}></img></span></td>
                                <td><span><img src={MinusIcon}></img></span></td>
                            </tr>

                            <tr>
                                <td>Add upto 20 certificate cartegories</td>
                                <td><span className="Check_Span"><img src={CheckIcon}></img></span></td>
                                <td><span><img src={MinusIcon}></img></span></td>
                            </tr>

                            <tr>
                                <td>Upload up to 100 certificates daily</td>
                                <td><span className="Check_Span"><img src={CheckIcon}></img></span></td>
                                <td><span><img src={MinusIcon}></img></span></td>
                            </tr>
                            <tr>
                                <td>Upload files (pdf, Jpeg, PNG)</td>
                                <td><span className="Check_Span"><img src={CheckIcon}></img></span></td>
                                <td><span><img src={MinusIcon}></img></span></td>
                            </tr>
                            <tr>
                                <td>Access to deleted certificates and files</td>
                                <td><span className="Check_Span"><img src={CheckIcon}></img></span></td>
                                <td><span><img src={MinusIcon}></img></span></td>
                            </tr>
                            <tr>
                                <td>10 maximum login users</td>
                                <td><span className="Check_Span"><img src={CheckIcon}></img></span></td>
                                <td><span><img src={MinusIcon}></img></span></td>
                            </tr>
                            <tr>
                                <td>24/7 support</td>
                                <td><span className="Check_Span"><img src={CheckIcon}></img></span></td>
                                <td><span><img src={MinusIcon}></img></span></td>
                            </tr>
                        </table>
                    </div>
                </div> 
            </div> */}

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
                                            to={`/edit-plan?id=${plan.id}&price=${plan.price}&name=${encodeURIComponent(plan.name)}
                                            &storage=${encodeURIComponent(plan.features.storage || '')}
                                            &num_certificate_categories=${encodeURIComponent(plan.features.num_certificate_categories || '')}
                                            &num_daily_certificate_upload=${encodeURIComponent(plan.features.num_daily_certificate_upload || '')}
                                            &access_deleted_certificates_files=${encodeURIComponent(plan.features.access_deleted_certificates_files || '')}
                                            &maximum_login_users=${encodeURIComponent(plan.features.maximum_login_users || '')}
                                            &twentyFourSevenSupport=${encodeURIComponent(plan.features["24/7_support"] || '')}`}
                                            >
                                            Subscribe
                                        </Link>



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
                                            {/* Check each feature's property in `features` */}
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
    )
}
