import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

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


export default function CheckboxDropdown({ onAnimalSelection }) {
  const favorite = useSelector(store => store.favorite);
  const [newAnimal, setNewAnimal] = useState([]);

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewAnimal(typeof value === 'string' ? value.split(',') : value);
    onAnimalSelection(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <FormControl sx={{ mt:1 , width: 520 }}>
        <InputLabel placeholder="Select your animal" id="demo-multiple-checkbox-label">Select Animals</InputLabel>
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
