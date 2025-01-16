import React from 'react';
import './Css/Main.css';

import VerifiedBadge1 from './Img/verified-badge1.svg';
import VerifiedBadge2 from './Img/verified-badge2.svg';

export default function Search_Reasult({ data }) {
    
    if (!data || !data.certificate_details) {
        return <p>No certificate data available.</p>;
    }


    const { certificate_id, certificate_title, client_name, issue_date, organization_name, issuedNumber } = data.certificate_details;
    const  statusV  = data.status;

    return (
        <div className="Search_Reasult">
            <div className="RStl_Top">
                <h2>
                    {certificate_id} 
                    <span>
                        <img src={VerifiedBadge1} alt="Verified Badge" /> 
                        {statusV === "valid" ? "Verified" : "Invalid"}
                    </span>
                </h2>
                <p>{certificate_title}</p>
            </div>

            <div className="RStl_Box">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <span>
                                    <img src={VerifiedBadge2} alt="Verified Badge" /> Certificate number
                                </span>
                            </td>
                            <td><p>{certificate_id}</p></td>
                        </tr>
                        <tr>
                            <td>
                                <span>
                                    <img src={VerifiedBadge2} alt="Verified Badge" /> Certificate title
                                </span>
                            </td>
                            <td><p>{certificate_title}</p></td>
                        </tr>
                        <tr>
                            <td>
                                <span>
                                    <img src={VerifiedBadge2} alt="Verified Badge" /> Issued to
                                </span>
                            </td>
                            <td><p>{client_name}</p></td>
                        </tr>
                        <tr>
                            <td>
                                <span>
                                    <img src={VerifiedBadge2} alt="Verified Badge" /> Issued Number
                                </span>
                            </td>
                            <td><p>{issuedNumber}</p></td>
                        </tr>
                        <tr>
                            <td>
                                <span>
                                    <img src={VerifiedBadge2} alt="Verified Badge" /> Date of issue
                                </span>
                            </td>
                            <td><p>{issue_date}</p></td>
                        </tr>
                        <tr>
                            <td>
                                <span>
                                    <img src={VerifiedBadge2} alt="Verified Badge" /> Issued by
                                </span>
                            </td>
                            <td><p>{organization_name}</p></td>
                        </tr>
                        <tr>
                            <td>
                                <span>
                                    <img src={VerifiedBadge2} alt="Verified Badge" /> Status
                                </span>
                            </td>
                            <td><p>{statusV === "valid" ? "Verified" : "Invalid"}</p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

