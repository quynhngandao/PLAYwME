import React from 'react';
import {useSelector} from 'react-redux';
import RequestResult from '../RequestResultItem/RequestResult';
import { Box, Button } from '@mui/material';
import { GetStartedButton } from '../GetStartedButton/GetStartedButton';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory()

  const handleClick = () => {
    history.push("/petfinder");
  }
  return (
    <div className="container">
      <Box sx={{ml:5}}>
      <h2>Welcome, {user.username}!</h2>
     
      <Box sx={{mt:5, mb:5}}>
      <Button
      variant='outlined'
            type="button"
            className="btn"
            buttonStyle="btn--primary"
            buttonSize="btn--large"
            onClick={() => handleClick()}
          >
            <span>
              SEE THE ANIMALS <i className="fa-solid fa-paw" />
            </span>
          </Button>
          </Box> 
          <RequestResult/>
      </Box>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
