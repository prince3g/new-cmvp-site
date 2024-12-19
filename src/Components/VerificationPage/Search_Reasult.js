
// import React from 'react';

// import './Css/Main.css';

// import VerifiedBadge1 from './Img/verified-badge1.svg';
// import VerifiedBadge2 from './Img/verified-badge2.svg';


// export default function Search_Reasult({ data }){

//     if (!data) {
//         return <p>No data available.</p>;
//     }

//     console.log("data")
//     console.log(data)
//     console.log("data")

//     return (
//         <div className='Search_Reasult'>
//              <div className="RStl_Top">
//                 <h2>000303 <span><img src={VerifiedBadge1}></img>Verified</span></h2>
//                 <p>Certificate of workmanship</p>
//             </div>

//             <div className="RStl_Box">
//             <table>
//             <tbody>
//                     <tr>
//                         <td><span><img src={VerifiedBadge2}></img> Certificate number</span></td>
//                         <td><p>000303</p></td>
//                     </tr>
//                     <tr>
//                         <td><span><img src={VerifiedBadge2}></img> Certificate title</span></td>
//                         <td><p>Certificate of workmanship</p></td>
//                     </tr>

//                     <tr>
//                         <td><span><img src={VerifiedBadge2}></img> Issued to</span></td>
//                         <td><p>Ndubuisi Prince Godson</p></td>
//                     </tr>

//                     <tr>
//                         <td><span><img src={VerifiedBadge2}></img> Date of issue</span></td>
//                         <td><p>16,May 2024</p></td>
//                     </tr>

//                     <tr>
//                         <td><span><img src={VerifiedBadge2}></img> Issued by</span></td>
//                         <td><p>Proliance LTD</p></td>
//                     </tr>

//                     <tr>
//                         <td><span><img src={VerifiedBadge2}></img> Status</span></td>
//                         <td><p>Verified</p></td>
//                     </tr>

                   
//             </tbody>
//         </table>
//             </div>

//         </div>
      
//     );
// };


import React from 'react';
import './Css/Main.css';

import VerifiedBadge1 from './Img/verified-badge1.svg';
import VerifiedBadge2 from './Img/verified-badge2.svg';

export default function Search_Reasult({ data }) {
    if (!data || !data.certificate_details) {
        return <p>No certificate data available.</p>;
    }

    const { certificate_id, certificate_title, client_name, issue_date, organization_name } = data.certificate_details;
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

