import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
/* MUI */
import {
  Fab,
  FormControlLabel,
  Icon,
  Checkbox,
  DialogContentText,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
/* COMPONENT */
import CheckboxDropdown from "../CheckboxDropdown/CheckboxDropdown";
import CustomDateTimePicker from "../CustomDateTimePicker/CustomDateTimePicker";

export default function Modalpopup({ open, onClose }) {
  // useState
  const [dateTime, setDateTime] = useState(null);
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  // useSelector
  const requests = useSelector((store) => store.requests);
  const favorite = useSelector((store) => store.favorite);
  // useHistory
  const history = useHistory();
  // useDispatch
  const dispatch = useDispatch();

  // Go to thankyou page and send user's request info to store
  const handleSubmit = (e) => {
    e.preventDefault();
    // Get the animal_id from selectedAnimal's state
    const animal_id = selectedAnimals.map((animal) => animal.id);

    // dispatch selected time and animals as payload
    dispatch({
      type: "ADD_REQUEST",
      payload: {
        date_time: dateTime,
        animal_id: animal_id,
      },
    });
    history.push("/thankyou");
  };

  // handleDateTimeChange: handle the selected date and time change
  const handleDateTimeChange = (dateTime) => {
    setDateTime(dateTime);
  };

  // handleAnimalsSelection: handle the selected animals
  const handleAnimalSelection = (selected) => {
    // selected = array of animal names that user selected
    // Map the selected animal names to objects with the same structure as in the favorite array (from favorite reducer)
    const selectedAnimalsObjects = selected.map((selectedAnimalName) => {
      // find method searches for item in favorite array (item.animal_details.name === selectedAnimalName)
      const animal = favorite.find(
        // animal_details from favorite reducer contains animal infos (i.e id, name)
        (item) => item.animal_details.name === selectedAnimalName
      );
      // Creates new object with id from animal_details.id and name from selectedAnimalName
      return animal
        ? { id: animal.animal_details.id, name: selectedAnimalName }
        : null;
    });

    // Filter and remove null values from the mapped array
    const filteredSelectedAnimalsObjects = selectedAnimalsObjects.filter(
      (animal) => animal !== null
    );

    // Update the state with array of animal objects (id, name)
    setSelectedAnimals(filteredSelectedAnimalsObjects);
  };

  /* DISPLAY */
  return (
    <div style={{ textAlign: "center" }}>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle
          style={{ textAlign: "center", marginBottom: 0, paddingBottom: 0 }}
          variant="h3"
          color="primary.dark"
        >
          Request Application
          <Icon onClick={onClose} style={{ float: "right" }}>
            <CloseIcon color="primary" />
          </Icon>
        </DialogTitle>

        <DialogContent>
          <DialogContentText margin={2}>
            Please fill out your information to request a playtime
          </DialogContentText>
          <Stack spacing={2} margin={2}>
            {/* CUSTOMDATETIMEPICKER */}
            <CustomDateTimePicker handleDateTimeChange={handleDateTimeChange} />

            {/* CHECKBOXDROPDOWN */}
            <CheckboxDropdown onAnimalSelection={handleAnimalSelection} />
            {/* Term of agreement */}
            <FormControlLabel
              control={<Checkbox defaultChecked color="primary" />}
              label="Agree to terms & conditions"
            />
          </Stack>
          {/* SUBMIT  */}
          <Box display="flex" justifyContent="center">
            <IconButton onClick={handleSubmit} variant="outlined" color="primary">
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
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
