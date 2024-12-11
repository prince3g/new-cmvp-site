import React from 'react';
import { Link } from 'react-router-dom';

const SelectNavigationIcons = () => {
  return (
    <div className="Selct-Navi-Icons">
      <Link to="/subscriptions" className="active-selt-Icon">
        <span className="material-icons">subscriptions</span>
        <span>Subscription</span>
      </Link>

      <Link to="/users">
        <span className="material-icons">group</span>
        <span>Users</span>
      </Link>
      
      <Link to="/notification">
        <span className="material-icons">notifications</span>
        <span>Notification</span>
      </Link>

    </div>
  );
};

export default SelectNavigationIcons;
