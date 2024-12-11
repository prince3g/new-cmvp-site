import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './Css/Dash.css';



export default function AddSubScript() {
    return(
        <div className="DDD-Seco hhga-uua">
           <div className="SSS-Nbahs">
           <div className="Dash-Intro">
                    <h2>Add Subscription Plan</h2>
                </div>
                <form className="add-SUp-Form">
                    <div className="Supt-Input">
                        <label>What's the plan name?</label>
                        <input type="text" name="" placeholder="Enter plan name" />
                    </div>
                    <div className="Supt-Input">
                        <label>What's the amount?</label>
                        <input type="number" name="" placeholder="Enter amount" />
                    </div>
                    <div className="Supt-Input">
                        <label>Access to portal</label>
                        <select>
                            <option>--Select--</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>

                    <div className="Supt-Input">
                        <label>How many certificate cartegories can be added?</label>
                        <select>
                            <option>--Select--</option>
                            <option>5</option>
                            <option>10</option>
                            <option>15</option>
                            <option>20</option>
                            <option>25</option>
                            <option>30</option>
                            <option>UNLIMITED</option>
                        </select>
                    </div>

                    <div className="Supt-Input">
                        <label>How many certificates can be uploaded daily?</label>
                        <select>
                            <option>--Select--</option>
                            <option>5</option>
                            <option>10</option>
                            <option>15</option>
                            <option>20</option>
                            <option>25</option>
                            <option>30</option>
                            <option>UNLIMITED</option>
                        </select>
                    </div>

                    <div className="Supt-Input">
                        <label>Can files like pdf, Jpeg, PNG be upload?</label>
                        <select>
                            <option>--Select--</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>


                    
                    <div className="Supt-Input">
                        <label>Access to deleted certificates and files</label>
                        <select>
                            <option>--Select--</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>

                    <div className="Supt-Input">
                        <label>Maximum login users</label>
                        <select>
                            <option>--Select--</option>
                            <option>5</option>
                            <option>10</option>
                            <option>15</option>
                            <option>20</option>
                            <option>25</option>
                            <option>30</option>
                            <option>UNLIMITED</option>
                        </select>
                    </div>

                    <div className="Supt-Input">
                        <label>24/7 support</label>
                        <select>
                            <option>--Select--</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>

                    <div className="Supt-Input">
                        <button>Add subscription plan</button>
                    </div>


                </form>
           </div>
        </div>
    )
}