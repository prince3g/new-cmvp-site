import React, { useState } from "react";
import './Css/Main.css';

import { ColorProvider } from "../ColorContext";

import HomePage from './HomePage';

import ImageColorExtractor from '../ImageColorExtractor';


export default function Verification() {

    return (
        
        <ColorProvider>
        <div className="Verification_Sec">
            <HomePage />

            <ImageColorExtractor />
        </div>
        </ColorProvider>

    )

}