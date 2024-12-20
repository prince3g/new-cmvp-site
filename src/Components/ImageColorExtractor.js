import React, { useState, useEffect, useContext } from "react";
import { ColorContext } from "./ColorContext";
import SampleImage from "./CompanyDashboard/Img/CompLogo.png"; // Import your image file

const ImageColorExtractor = () => {
  const { setBackgroundColor } = useContext(ColorContext); // Access context to update background color
  const [hexColor, setHexColor] = useState("");

  useEffect(() => {
    extractColor(SampleImage);
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
      setHexColor(hex);
      setBackgroundColor(hex); // Update the shared background color
    };
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Image HEX Color Extractor</h1>
      <img
        src={SampleImage}
        alt="Sample"
        style={{ maxWidth: "100%", marginTop: "20px", borderRadius: "8px" }}
      />
      {hexColor && (
        <div style={{ marginTop: "20px" }}>
          <h2>Dominant HEX Color:</h2>
          <div
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: hexColor,
              margin: "0 auto",
              borderRadius: "8px",
            }}
          ></div>
          <p>{hexColor}</p>
        </div>
      )}
    </div>
  );
};

export default ImageColorExtractor;
