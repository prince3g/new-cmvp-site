import React from 'react';
import { Link} from "react-router-dom";

const SubscriptionTable = () => {
  return (
    <div className="JJha-DhA">
      <div className="Dash-Intro subscripp-header">
        <h2>Registered users with their subscription plans</h2>
        <Link to="/add-subscription-plan" className="add-subscription-plan">
        <span className="material-icons">add</span>
        Add Subscription Plan
      </Link>
      </div>

      <div className="Sec-table">
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Plan</th>
              <th>Duration</th>
              <th>Subscription Date</th>
              <th>Expiration date</th>
              <th>Status</th>
              <th>Uploaded documents</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            
            <tr>
              <td>1</td>
              <td>Proliance LTD</td>
              <td>Basic Plan</td>
              <td>3 Months</td>
              <td>12/2/2024</td>
              <td>12/5/2024</td>
              <td className='active-BGD'>Active</td>
              <td>100 documents</td>
              <td>
                <div className="action-btns">
                <Link to="user-profile" className="prof-bank-btn">
                    View Profile
                  </Link>
                </div>
              </td>
            </tr>


            <tr>
              <td>2</td>
              <td>Cenglobal</td>
              <td>Pro Plan</td>
              <td>1 Month</td>
              <td>12/2/2024</td>
              <td>12/5/2024</td>
              <td className='expired-BGD'>Expired</td>
              <td>5 documents</td>
              <td>
                <div className="action-btns">
                  <Link to="user-profile" className="prof-bank-btn">
                    View Profile
                  </Link>
                </div>
              </td>
            </tr>

            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionTable;
