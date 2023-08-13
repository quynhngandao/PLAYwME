import { useSelector } from 'react-redux';
import {  useState } from 'react';
/***** MUI ******/
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
const ITEM_HEIGHT = 60;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
/***** FUNCTION ******/
export default function CheckboxDropdown({ onAnimalSelection }) {
  // useSelector
  const favorite = useSelector(store => store.favorite);
  // useState
  const [newAnimal, setNewAnimal] = useState([]);

// handleChange: split string with commas
  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    // update newAnimal state
    setNewAnimal(typeof value === 'string' ? value.split(',') : value);
    // call onAnimalSelection function with the split values.
    onAnimalSelection(typeof value === 'string' ? value.split(',') : value);
  };
/***** RENDER *****/
  return (
    <div>
      <FormControl sx={{ mt:1 , width: 520 }}>
        <InputLabel placeholder="Select your animal" id="demo-multiple-checkbox-label">Select Your Animals</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={newAnimal}
          onChange={handleChange}
          input={<OutlinedInput label="Animal" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {/* use favorited animas from reducer */}
          {favorite.map((animal) => (
            <MenuItem key={animal.animal_details.id} value={animal.animal_details.name}>
              <Checkbox checked={newAnimal.indexOf(animal.animal_details.name) > -1} color="default" />
              <ListItemText primary={animal.animal_details.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
