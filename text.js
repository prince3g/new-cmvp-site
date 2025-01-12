return (
    <div className="Pricing_Sec">
        <div className="Pricing_top">
            <h2>Subscription Plan</h2>
            <p>Subscription plan details for certificate management and verification portal (CMVP).</p>
        </div>
        
        {plan ? (
            <div className="plan_box">
                <div className="Pricing_sub">
                    <h3>{plan.subscription_plan.name}</h3>
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
                        <h3>{plan.subscription_plan.name}</h3>
                    </div>
                    <div className="plan_box_Top_1">
                        <h3 className="plan_price">${plan.subscription_plan.price}</h3>
                        <Link 
                            to={`/edit-plan?id=${plan.subscription_plan.id}&price=${plan.subscription_plan.price}&name=${encodeURIComponent(plan.subscription_plan.name)}
                            &twentyFourSevenSupport=${encodeURIComponent(plan.subscription_plan.features["24/7_support"] || '')}`}>
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
                            <tr>
                                <td>24/7 Support</td>
                                <td>
                                    {plan.subscription_plan.features["24/7_support"] ? (
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
                                    {!plan.subscription_plan.features["24/7_support"] ? (
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
                            {/* Add other features similarly */}
                        </tbody>
                    </table>
                </div>
            </div>
        ) : (
            <p>Loading plan details...</p>
        )}
    </div>
);
