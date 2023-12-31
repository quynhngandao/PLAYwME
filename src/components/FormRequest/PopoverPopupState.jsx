import { useState } from "react";
/* MUI */
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import { IconButton, Fab, Popover, Box, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
/* COMPONENT */
import Modalpopup from "./Modalpopup";
import '../Nav/Nav.css'
/* HOOK */
import { usePopupState, bindPopover } from "material-ui-popup-state/hooks";

/* STYLE */
const PopoverContent = styled("div")({
  margin: (theme) => theme.spacing(2),
});

export default function PopoverPopupState() {
  // useState for date_time
  // const [date_time, setDate_time] = useState("");
  // useState for open and close for modal
  const [open, setOpen] = useState(false);

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

  // Custom Hook
  const popupState = usePopupState({
    variant: "popover",
    popupId: "demoPopover",
  });

  // // handleDateTimeChange to handle change for date_time
  // const handleDateTimeChange = (formattedDateTime) => {
  //   setDate_time(formattedDateTime);
  // };

  /* DISPLAY */
  return (
    <Box className="popover" justifyContent="center">
      {/* SUBMIT BUTTON */}
       <Grid container justifyContent="center" alignItems="center"> 
       <IconButton
        className="add-request-button"
        margin="20px"
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
      
        <Fab sx={{ width: "100%", justifyContent: "center" }}
variant="extended" size="medium" color="primary">
          <AddIcon sx={{ mr: 1 }} />
          Add Request
        </Fab>
      </IconButton></Grid>
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
          {/* MODALPOPUP */}
          <Modalpopup
            open={open}
            onClose={handleClose}
          
            // date_time={date_time}
            // Pass setDate_time to Modalpopup
            // setDate_time={setDate_time}
          />
        </PopoverContent>
      </Popover>
    </Box>
  );
}
