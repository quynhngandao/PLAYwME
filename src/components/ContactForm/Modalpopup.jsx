import {
  Fab,
  FormControlLabel,
  IconButton,
  Button,
  Checkbox,
  DialogContentText,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import CheckboxDropdown from "../CheckboxDropdown/CheckboxDropdown";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import CustomDateTimePicker from "../CustomDateTimePicker/CustomDateTimePicker";

export default function Modalpopup({ open, onClose, AdapterDayjs }) {
  const history = useHistory();

  const handleClick = () => {
    history.push("/thankyou");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle style={{ textAlign: "center", marginBottom:0, paddingBottom:0}} variant="h3" color="primary.dark">
          Request Application
          <IconButton onClick={onClose} style={{ float: "right" }}>
            <CloseIcon color="primary" />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <DialogContentText margin={2}>
            Please fill out your information to request a playtime
          </DialogContentText>
          <Stack spacing={2} margin={2}>
            {/* DATETIMEPICKER */}
            <CustomDateTimePicker />
            {/* CHECKBOX DROPDOWN */}
            <CheckboxDropdown />
            {/* Term of agreement */}
            <FormControlLabel
              control={<Checkbox defaultChecked color="primary" />}
              label="Agree to terms & conditions"
            />
          </Stack>
          {/* SUBMIT BUTTON */}
          <Box display="flex" justifyContent="center">
            <IconButton
              onClick={() => handleClick()}
              variant="outlined"
              color="primary"
            >
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
