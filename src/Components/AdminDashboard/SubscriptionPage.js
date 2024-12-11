import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './Css/Dash.css';

import MinusIcon from './Img/minus-icon.svg';
import CheckIcon from './Img/check-icon.svg';


export default function SubscriptionPage() {

    const [activePlanFree, setActivePlanFree] = useState("1 Month");
    const [activePlanBasic, setActivePlanBasic] = useState("1 Month");
    const [activePlanPro, setActivePlanPro] = useState("1 Month");

    const [basicPrice, setBasicPrice] = useState(200);
    const [proPrice, setProPrice] = useState(350);

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



    return(
        <div className="DDD-Seco">
             <div className="Pricing_Sec">

            <div className="Dash-Intro">
                <h2>Subscription Plans</h2>
                <p>Subscription plans for certificate management and verification portal (CMVP).</p>
                </div>

                <div className="JJha-DhA">

                <div className="Dash-Intro subscripp-header">
                <h2>Added  subscription plans</h2>
                <Link to="/add-subscription-plan" className="add-subscription-plan">
                <span className="material-icons">add</span>
                Add Subscription Plan
            </Link>
            </div>
            </div>

            <div className="Plans_Sec">

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
                            <h3>Free Plan</h3>
                        </div> 
                        <div className="plan_box_Top_1">
                            <h3 className="plan_price">$0</h3>
                            <Link to="/edit-plan">Edit Plan</Link>
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
                </div> {/* plan_box */}

                <div className="plan_box">
                    <div className="Pricing_sub">
                        <h3>Choose Plan</h3>
                        <div className="pricing_Top_Btns">
                            {["1 Month", "3 Months", "6 Months", "1 Year"].map(plan => (
                                <button 
                                    key={plan} 
                                    className={activePlanBasic === plan ? "active_Plan_Selt_btn" : ""} 
                                    onClick={() => handlePlanClick(plan, setActivePlanBasic, setBasicPrice, 200)}
                                >
                                    {plan}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="plan_box_Top">
                        <div className="plan_box_Top_1">
                            <h3>Basic Plan</h3>
                        </div> 
                        <div className="plan_box_Top_1">
                            <h3 className="plan_price">${basicPrice}</h3>
                            <Link to="/edit-plan">Edit Plan</Link>
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
                                <td>Add upto 5 certificate cartegories</td>
                                <td><span className="Check_Span"><img src={CheckIcon}></img></span></td>
                                <td><span><img src={MinusIcon}></img></span></td>
                            </tr>

                            <tr>
                                <td>Upload up to 50 certificates daily</td>
                                <td><span className="Check_Span"><img src={CheckIcon}></img></span></td>
                                <td><span><img src={MinusIcon}></img></span></td>
                            </tr>
                            <tr>
                                <td>Upload files (pdf, Jpeg, PNG)</td>
                                <td><span><img src={MinusIcon}></img></span></td>
                                <td><span className="Check_Span"><img src={CheckIcon}></img></span></td>
                            </tr>
                            <tr>
                                <td>Access to deleted certificates and files</td>
                                <td><span className="Check_Span"><img src={CheckIcon}></img></span></td>
                                <td><span><img src={MinusIcon}></img></span></td>
                            </tr>
                            <tr>
                                <td>5 maximum login users</td>
                                <td><span><img src={MinusIcon}></img></span></td>
                                <td><span className="Check_Span"><img src={CheckIcon}></img></span></td>
                            </tr>
                            <tr>
                                <td>24/7 support</td>
                                <td><span className="Check_Span"><img src={CheckIcon}></img></span></td>
                                <td><span><img src={MinusIcon}></img></span></td>
                            </tr>
                        </table>
                    </div>
                </div> {/* plan_box */}

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
                        </div> 
                        <div className="plan_box_Top_1">
                            <h3 className="plan_price">${proPrice}</h3>
                            <Link to="/edit-plan">Edit Plan</Link>
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
                </div> {/* plan_box */}
            </div>
        </div>
        </div>
    )
}