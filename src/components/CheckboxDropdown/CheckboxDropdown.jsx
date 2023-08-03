import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux';

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

const animals = [
  'Oliver Hansen',
  'Van Henry',
];

export default function CheckboxDropdown() {
    const favorite = useSelector(store=> store.favorite)
  const [newAnimal, setNewAnimal] = React.useState([]);

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewAnimal(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel placeholder="Select your animal" id="demo-multiple-checkbox-label">Animal</InputLabel>
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
          {animals.map((animal) => (
            <MenuItem key={animal} value={animal}>
              <Checkbox checked={newAnimal.indexOf(animal) > -1} color="default"/>
              <ListItemText primary={animal} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
