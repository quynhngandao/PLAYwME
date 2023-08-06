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
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

export default function Modalpopup({
  open,
  onClose,
  AdapterDayjs,
  date_time,
  setDate_time,
}) {
  const requests = useSelector((store) => store.requests);
  const favorite = useSelector(store => store.favorite)
  const history = useHistory();
  const dispatch = useDispatch();

  // Go to thankyou page and dispatch user's request to DB
  const handleSubmit = () => {
    // Get the animal_id from selectedAnimals state
    const animal_id = selectedAnimals.map((animal) => animal.id);

    
    // selected time and animals as payload
    dispatch({
      type: "ADD_REQUEST",
      payload: {
        date_time: date_time,
        animal_id: animal_id,
      },
    });
    history.push("/thankyou");
  };

  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedAnimals, setSelectedAnimals] = useState([]);

  // Function to handle the selected date and time change
  const handleDateTimeChange = (dateTime) => {
    setSelectedDateTime(dateTime);
    console.log("in modal pop up DATETIME IS", dateTime);
  };

  const handleAnimalSelection = (selected) => {
    setSelectedAnimals(selected);
    console.log("in modal pop up ANIMAL IS", selected);
    // Map the selected animal names to objects with the same structure as in the favorite array
  const selectedAnimalsObjects = selected.map((animalName) => {
    const animal = favorite.find((item) => item.animal_details.name === animalName);
    return { id: animal.animal_details.id, name: animalName };
  })
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle
          style={{ textAlign: "center", marginBottom: 0, paddingBottom: 0 }}
          variant="h3"
          color="primary.dark"
        >
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
            <CustomDateTimePicker
              onDateTimeChange={handleDateTimeChange}
              date_time={date_time}
              // Pass date_time to CustomDateTimePicker
              // Pass setDate_time to CustomDateTimePicker
              setDate_time={setDate_time}
            />

            {/* CHECKBOX DROPDOWN */}
            <CheckboxDropdown onAnimalSelection={handleAnimalSelection} />
            {/* Term of agreement */}
            <FormControlLabel
              control={<Checkbox defaultChecked color="primary" />}
              label="Agree to terms & conditions"
            />
          </Stack>
          {/* SUBMIT BUTTON */}
          <Box display="flex" justifyContent="center">
            <IconButton
              onClick={handleSubmit}
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
