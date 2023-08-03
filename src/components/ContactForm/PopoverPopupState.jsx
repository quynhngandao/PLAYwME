import React from 'react';
import { usePopupState, bindTrigger, bindPopover } from 'material-ui-popup-state/hooks';
import { styled } from '@mui/material/styles';
import Modalpopup from './Modalpopup';
import { useState } from "react";
import { IconButton, Fab, Popover, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const PopoverContent = styled('div')({
  margin: (theme) => theme.spacing(2),
});

const PopoverPopupState = () => {
  const [open, setOpen] = useState(false);
  
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  });

  const handleOpen = () => {
    setOpen(true);
    popupState.open(); // Open the popover when "Add Request" is clicked
  };

  const handleClose = () => {
    setOpen(false);
    popupState.close(); // Close the popover when the dialog is closed
  };

  return (
    <div>
       {/* SUBMIT BUTTON */}
      <IconButton variant="contained" color="primary" onClick={handleOpen}>
      <Fab
   variant="extended"
   size="medium"
   color="primary"
   aria-label="add"
 >
   <AddIcon sx={{ mr: 1 }} />
  Request
 </Fab>
   
      </IconButton>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <PopoverContent>
        <Modalpopup open={open} onClose={handleClose} /> {/* Pass the state and close function */}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PopoverPopupState;



