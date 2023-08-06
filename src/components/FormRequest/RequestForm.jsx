import React from "react";
import PopoverPopupState from "./PopoverPopupState";
import { Typography, Box } from "@mui/material";

export default function RequestForm() {
  return (
    <Box className="request-form">
      <Typography variant="h3" color="primary" className="page-heading">
        Make a Schedule Request
      </Typography>
      <PopoverPopupState />
    </Box>
  );
}
