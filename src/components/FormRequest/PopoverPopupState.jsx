import React from "react";
import dayjs from "dayjs";
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from "material-ui-popup-state/hooks";
import { styled } from "@mui/material/styles";
import Modalpopup from "./Modalpopup";
import { useState } from "react";
import { IconButton, Fab, Popover, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const PopoverContent = styled("div")({
  margin: (theme) => theme.spacing(2),
});

function PopoverPopupState() {
  const [date_time, setDate_time] = useState("");

  const handleDateTimeChange = (formattedDateTime) => {
    setDate_time(formattedDateTime);
  };

  // OPEN AND CLOSE MODAL
  const [open, setOpen] = useState(false);

  const popupState = usePopupState({
    variant: "popover",
    popupId: "demoPopover",
  });

  // handleOpen Modal
  const handleOpen = () => {
    setOpen(true);
    popupState.open(); // Open the popover when "Add Request" is clicked
  };
  // handleClose Modal
  const handleClose = () => {
    setOpen(false);
    popupState.close(); // Close the popover when the dialog is closed
  };

  return (
    <Box className="popover" marginLeft="20px">
      {/* SUBMIT BUTTON */}
      <IconButton
        margin="20px"
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        <Fab variant="extended" size="medium" color="primary" ariaLabel="add">
          <AddIcon sx={{ mr: 1 }} />
          Request
        </Fab>
      </IconButton>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <PopoverContent>
          <Modalpopup
            open={open}
            onClose={handleClose}
            AdapterDayjs={dayjs}
            date_time={date_time}
            // Pass setDate_time to Modalpopup
            setDate_time={setDate_time}
          />
        </PopoverContent>
      </Popover>
    </Box>
  );
}

export default PopoverPopupState;
