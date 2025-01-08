import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./Css/Dash.css";
import NavBar from "./NavBar";
import AdminFooter from "./AdminFooter";
import AdminHome from "./AdminHome";
import SubscriptionPage from "./SubscriptionPage";
import RegUsers from "./RegUsers";
import Notification from "./Notification";
import UserProfile from "./UserProfile";
import AddSubScript from "./AddSubScript";
import EditSubScript from "./EditSubScript";

export default function AdminDashbaord() {
  return (
    <div className="AdminDashbaord">
        <NavBar />
        <div className="MainPage_Content">
          <div className="Large-container">
            <Routes>
              <Route path="/" element={<AdminHome />} />
              <Route path="/subscriptions" element={<SubscriptionPage />} />
              <Route path="/users" element={<RegUsers />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/add-subscription-plan" element={<AddSubScript />} />
              <Route path="/edit-plan" element={<EditSubScript />} />
            </Routes>
          </div>
          <AdminFooter />
        </div>
    </div>
  );
}
