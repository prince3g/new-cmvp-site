// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import './Css/Dash.css';



// export default function RegUsers() {
//     return(
//         <div className="DDD-Seco">
//              <div className="JJha-DhA">
//       <div className="Dash-Intro">
//         <h2>Registered users</h2>

//       </div>

//       <div className="Sec-table">
//         <table>
//           <thead>
//             <tr>
//               <th>S/N</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone number</th>
//               <th>Address</th>
//               <th>Registeration date</th>
//               <th>Current Plan</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
            
//             <tr>
//               <td>1</td>
//               <td>Proliance LTD</td>
//               <td>princegodson24@gmail.com</td>
//               <td>09037494084</td>
//               <td>Okwulaga Afaraukwu Ibeku, Umuahi Abia state, Nigeria.</td>
//               <td>12/5/2024</td>
//               <td>Basic Plan</td>
//               <td>
//                 <div className="action-btns">
//                 <Link to="/user-profile" className="prof-bank-btn">
//                     View Profile
//                   </Link>
//                   <button>Remove</button>
//                 </div>
//               </td>
//             </tr>




            
//           </tbody>
//         </table>
//       </div>
//     </div>
//         </div>
//     )
// }



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './Css/Dash.css';
import config from '../../config.js';

export default function RegUsers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get(`${config.API_BASE_URL}/api/accounts/auth/organization/`)
      .then((response) => {
        setData(response.data.results); // Access the `results` array from the response
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

   // Function to handle delete
   const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this organization?");
    if (confirmDelete) {
      axios
        .delete(`${config.API_BASE_URL}/api/accounts/auth/organization/${id}`)
        .then(() => {
          // Update the state to reflect the deletion
          setData((prevData) => prevData.filter((organization) => organization.id !== id));
          alert("Organization deleted successfully!");
        })
        .catch((err) => {
          console.error(err);
          alert("An error occurred while deleting the organization.");
        });
    }
  };

  return (
    <div className="DDD-Seco">
      <div className="JJha-DhA">
        <div className="Dash-Intro">
          <h2>Registered Users</h2>
        </div>

        <div className="Sec-table">
          <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Address</th>
                <th>Registration Date</th>
                <th>Current Plan</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((organization, index) => (
                <tr key={organization.id}>
                  {/* Serial Number (S/N) */}
                  <td>{index + 1}</td>

                  {/* Organization Data */}
                  <td>{organization.name}</td>
                  <td>{organization.email}</td>
                  <td>{organization.phone}</td>
                 
                  <td>{organization.address}</td>

                  {/* Format Date */}
                  <td>{new Date(organization.date_joined).toLocaleDateString('en-GB')}</td>

                  {/* Actions */}
                  <td>{organization.contact_first_name}</td>
                  <td>
                    <div className="action-btns">
                    <Link
                        to={{
                          pathname: "/admin-dashboard/user-profile",
                          search: `?name=${organization.name}
                          &phone=${organization.phone}
                          &logo=${organization.logo}
                          &address=${organization.address}
                          &id=${organization.id}
                          &email=${organization.email}
                          &date_joined=${organization.date_joined}`,
                        }}
                        className="prof-bank-btn"
                      >
                        View Profile
                      </Link>
                      
                      <button onClick={() => handleDelete(organization.id)}>Remove</button>
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
