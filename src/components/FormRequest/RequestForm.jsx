import React from "react";
import PopoverPopupState from "./PopoverPopupState";
import { Typography, Box } from "@mui/material";

export default function RequestForm() {
  return (
    <Box className="request-form">
      <h3 className="request-heading">
        Make a Schedule Request
      </h3>
      <PopoverPopupState />
    </Box>
  );
}
