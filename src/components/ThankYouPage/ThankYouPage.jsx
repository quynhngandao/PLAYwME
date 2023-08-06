import React from "react";
import "./ThankYouPage.css";
import { Box, Button, Grid } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const CustomComponent = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/user");
  };

  return (
    <div className="thankyou-page">
  
        <div className="yellow-box"></div>
        <div className="blue-box"></div>
        <img
          className="image"
          src="images/thankyou.png"
        />
        <div className="text-container">
          <div className="title">Thank You</div>
          <div className="message">
            We Appreciate You! You Will Be Contacted Shortly!
          </div>
          <div className="button-container">
            <Button onClick={handleClick} className="button">
              Go Back Home
            </Button>
          </div>
        </div>
    </div>
  );
};

export default CustomComponent;
