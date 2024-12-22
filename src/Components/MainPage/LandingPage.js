import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import SiteNavBar from './SiteNavBar';

import HeroWave from './Img/hero-wave.svg';

import StyleArrow from './Img/style-arrow.svg';

import OnSetImg from './Img/OnSetImg.png';

import MinusIcon from './Img/minus-icon.svg';
import CheckIcon from './Img/check-icon.svg';

export default function LandingPage() {
    const currentYear = new Date().getFullYear(); // Get the current year


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

    return (
        <div className="Landing-page MMha-page">
        <div className="Hero-Landing-page">
            <SiteNavBar />
           <img src={HeroWave} className="Hero-waveoo"></img>

           <div className="site-container">
            <div className="HHh_Hero_Sec">
                <h1 className="large-text">Certificate <span>Management</span> and Verification Portal</h1>
               

                <Link to="signup">Getstarted with CMVP <img src={StyleArrow}></img></Link>
            </div>
           </div>
        </div>

        <div className="site-container">
            {/* <div className="onset-banner">
                <img src={OnSetImg}></img>
            </div> */}

            <div className="TopTt_Geta">
       <div className="TopTt_Geta_1">
         <h2 className="big-text">Digital certificate verification</h2>
       </div>
        <div className="TopTt_Geta_2">
        <p>Efficiently validate, issue, and manage your digital certificates with our secure and user-friendly verification and management portal.</p>
          <p>Experience secure and efficient digital certificate verification and management with our advanced and user-friendly portal.</p>

          <Link to="/signup">Getstarted with CMVP</Link>
        </div>
    </div>



    <div className="Pricing_Sec">
            <div className="Pricing_top">
                <h2 className="big-text">Subscription Plans</h2>
                <p>Subscription plans for certificate management and verification portal (CMVP).</p>
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
                </div> {/* plan_box */}
            </div>
        </div>


        </div>

        <div className="hero-foot">
            <div className="site-container">
            <p>Powered by <a href="https://prolianceltd.com" target="_blank" rel="noopener noreferrer">Proliance LTD (ISO 9001 certifided company)</a></p>
                    <p>© {currentYear}</p>
                    </div>
                </div>

        </div>
    );
}

