import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";
import { Box, Button } from "@mui/material";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
import { GetStartedButton } from "../GetStartedButton/GetStartedButton";

function LandingPage() {
  const history = useHistory();

  // const onLogin = (event) => {
  //   history.push("/login");
  // };

  return (
    <div className="container">
      <div className="grid">
        <center>
          <GetStartedButton
        
            type="button"
            className="btns"
            buttonStyle="btn--primary"
            buttonSize="btn--large"
            onClick={() => {
              history.push("/registration");
            }}
          >
            <span>
              GET STARTED <i className="fa-solid fa-paw" />
            </span>
          </GetStartedButton>
        </center>
        <div className="grid-col grid-col_8"></div>
        <div className="grid-col grid-col_4"></div>
      </div>
    </div>
  );
}

export default LandingPage;
