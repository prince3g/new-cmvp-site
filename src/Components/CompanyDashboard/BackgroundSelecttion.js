import React, { useState, useContext, useRef, useEffect } from "react";
import "./Css/Dash.css";
import { ColorContext } from "../ColorContext";
import SettingIcon from "./Img/settings-icon.svg";
import CloseIcon from "./Img/close_icon.svg";
import LitDashLogo from "./Img/liteDashLogo.png";
import SeltImg1 from "./Img/AllSelImgs/1.jpg";
import SeltImg2 from "./Img/AllSelImgs/2.jpg";
import SeltImg3 from "./Img/AllSelImgs/3.jpg";
import SeltImg4 from "./Img/AllSelImgs/4.jpg";
import SeltImg5 from "./Img/AllSelImgs/5.jpg";
import SeltImg6 from "./Img/AllSelImgs/6.jpg";
import DefaultSampleImage from "../PageFixeImg.jpg";
import { useDropzone } from "react-dropzone";

export default function BackgroundSelection() {
  const { backgroundColor, setBackgroundColor } = useContext(ColorContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showBackgroundSelection, setShowBackgroundSelection] = useState(true);
  const [showSettingsButton, setShowSettingsButton] = useState(false); // State for visibility of settings button
  const images = [SeltImg1, SeltImg2, SeltImg3, SeltImg4, SeltImg5, SeltImg6];
  
  const backgroundSelectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (backgroundSelectRef.current && !backgroundSelectRef.current.contains(event.target)) {
        setShowPreview(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const extractColor = (imageSrc) => {
    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const x = Math.floor(img.width / 2);
      const y = Math.floor(img.height / 2);
      const pixelData = ctx.getImageData(x, y, 1, 1).data;

      const hex = `#${((1 << 24) + (pixelData[0] << 16) + (pixelData[1] << 8) + pixelData[2])
        .toString(16)
        .slice(1)
        .toUpperCase()}`;
      setBackgroundColor(hex);
    };
  };

  const handleBoxClick = (image) => {
    setSelectedImage(image);
    extractColor(image);
    setShowPreview(true);
  };

  const handleFileChange = (file) => {
    if (file && file.type === "image/jpeg") {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageSrc = reader.result;
        setSelectedImage(imageSrc);
        extractColor(imageSrc);
        setShowPreview(true);
      };
      reader.readAsDataURL(file);
      setError(null);
    } else {
      setError("Please select a JPEG image.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      handleFileChange(file);
    },
    accept: ".jpg, .jpeg",
    maxSize: 2 * 1024 * 1024,
  });

  const handleClose = () => {
    setShowBackgroundSelection(false);
    setShowSettingsButton(true); // Show settings button when background selection is closed
  };

  const handleBackgroundSelectionToggle = () => {
    setShowSettingsButton(false); // Hide settings button when background selection is shown
    setShowBackgroundSelection(true); // Show background selection
  };

  return (
    <>
      {showBackgroundSelection && (
        <div className="BackgroundSelecttion" ref={backgroundSelectRef}>
          {showPreview && (
            <div className="BGG_Prev">
              <img
                src={selectedImage || DefaultSampleImage}
                className="BGG_Prev_BG"
                alt="Selected Background"
              />
              <div
                className="BGG_Prev_Gradi"
                style={{
                  background: `linear-gradient(135deg, ${backgroundColor}, #0D2818)`,
                  transition: "background 0.5s ease",
                }}
              ></div>
              <div className="ggg_1">
                <img src={LitDashLogo} alt="Logo" />
              </div>
              <div className="ggg_2">
                <h3>
                  Cen Global Services Limited <br />
                  <span>Certificate</span> Verification
                </h3>
                <p
                  style={{
                    background: `linear-gradient(135deg, ${backgroundColor}, #0D2818)`,
                    transition: "background 0.5s ease",
                  }}
                >
                  Verify certificate
                </p>
              </div>
              <div className="ggg_3">
                <p>Powered by Proliance LTD (ISO 9001 certified company)</p>
              </div>
            </div>
          )}

          <div className="BGG_Box">
            <div className="BGG_Box_Top">
              <span>
                <img src={CloseIcon} alt="Close Icon" onClick={handleClose} />
              </span>
            </div>
            <div className="BGG_Box_Sub">
              <p>
                Customize your <br />
                verification page
              </p>
            </div>

            <div className="BGG_Box_Thumbs">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleBoxClick(image)}
                  className="BGG_Box_Thumbs_Btn"
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </button>
              ))}
            </div>

            <div className="BGG_Box_Selected_Thumbs">
              <p>Upload Background</p>
              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <button>
                  <span>
                    {fileName ? fileName : "Drag and Drop file here or choose file"}
                  </span>
                </button>
              </div>
              <h6>
                Supported formats: JPEG <span>Max size: 2MB</span>
              </h6>
              {error && <h5>{error}</h5>}
            </div>

            <div className="BGG_Box_PUb_Btn">
              <button>Set Background</button>
            </div>
          </div>
        </div>
      )}

      {showSettingsButton && (
        <button
          className="Close_BGG_SEC_Box"
          onClick={handleBackgroundSelectionToggle}
        >
          <img src={SettingIcon} alt="Settings Icon" />
        </button>
      )}
    </>
  );
}
