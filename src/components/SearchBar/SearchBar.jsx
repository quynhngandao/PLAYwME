import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {Box, InputBase, Button} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.light, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.light, 0.35),
  },

  [theme.breakpoints.up('sm')]: {
    width: '40em',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '70ch',
    },
  },
}));

export default function SearchBar() {

  return (
    <Box sx={{display:"flex" , justifyContent:"center", margin: 4}} >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search for...' }}
            /> 
          </Search>
  <Button variant="contained" color="primary">Search</Button>
    </Box>
  );
}