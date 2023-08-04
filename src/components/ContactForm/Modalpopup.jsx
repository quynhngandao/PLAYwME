import { Fab, FormControlLabel, IconButton, Button, Checkbox, DialogContentText, DialogTitle, Dialog, DialogActions, DialogContent, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import  SendIcon from "@mui/icons-material/Send";
import CheckboxDropdown from "../CheckboxDropdown/CheckboxDropdown";
import { Box } from "@mui/system";

const Modalpopup = ({ open, onClose }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle variant="h4">
          Request Application
           <IconButton onClick={onClose} style={{ float: 'right' }}>
            <CloseIcon color="primary" />
            
          </IconButton>
           
        </DialogTitle>
        
        <DialogContent>
          <DialogContentText margin={2}>Please fill out your information to request a playtime</DialogContentText>
          <Stack spacing={2} margin={2}>
          
            <TextField placeholder="Select date and time" type="datetime-local" />
            <CheckboxDropdown/>
            <FormControlLabel
              control={<Checkbox defaultChecked color="primary" />}
              label="Agree to terms & conditions"
            />
            
          </Stack>
           {/* SUBMIT BUTTON */}
           <Box display="flex" justifyContent="center">
           <IconButton variant="outlined" color="primary"> 
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                aria-label="add"
              >
                <SendIcon sx={{ mr: 1 }} />
                Submit
              </Fab>
            </IconButton>
            </Box>
        </DialogContent>
        <DialogActions>
          {/* <Button color="success" variant="contained">Yes</Button> */}
          {/* <Button onClick={onClose} color="error" variant="contained">Close</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Modalpopup;