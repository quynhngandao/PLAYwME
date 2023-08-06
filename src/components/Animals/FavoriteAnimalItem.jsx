import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Import styling
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  IconButton,
  Button,
  Tooltip,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EmailIcon from '@mui/icons-material/Email';

// Import the placeholder image
import placeholderImage from "./notfoundcat.gif";

// custom styling
const body = {
  color: "primary.dark",
  fontSize: "16px",
  fontWeight: "bold",
  fontFamily: "fraunces",
};
const title = {
  color: "primary.dark",
  fontSize: "20px", 
  fontFamily: "fraunces",
};

// FUNCTION
export default function FavoriteAnimalItem({
  styledCard,
  styledCardMedia,
  mailTo,
  label,
}) {
  // useSelector to grab animal data from redux store
  const user = useSelector((store) => store.user);
  const favorite = useSelector((store) => store.favorite);
  // useDispatch to send animal data to redux store
  const dispatch = useDispatch();

  // Open new tab when picture is clicked
  const openInNewTab = (url) => {
    window.open(url);
  };

  // RENDER
  return (
    <>
      <Typography variant="h3" color="primary.main" className="page-heading">
        Review Your Animal Selection
      </Typography>
      {favorite && (
        <div className="favorite-animals">
          {favorite.map((animal) => (
            <Card key={animal.animal_details.id} sx={styledCard}>
              {/* Image */}
              {animal.animal_details.photos &&
              animal.animal_details.photos.length > 0 ? (
                <CardActionArea
                  onClick={() => openInNewTab(animal.animal_details.url)}
                >
                  <Tooltip Tooltip title="See more details" placement="top">
                    <CardMedia
                      sx={styledCardMedia}
                      component="img"
                      image={animal.animal_details.photos}
                      alt={animal.animal_details.name}
                    />
                  </Tooltip>
                </CardActionArea>
              ) : (
                // NOT AVAILABLE IMAGE
                <CardActionArea>
                  <a href={animal.animal_details.url}>
                    <CardMedia
                      sx={styledCardMedia}
                      component="img"
                      image={placeholderImage}
                      alt="not available"
                    />
                  </a>
                </CardActionArea>
              )}
              <CardActionArea>
                <CardActions sx={{p:0}}>
            
                  {/* EDIT BUTTON */}
                  <Tooltip Tooltip title="edit" placement="bottom">
                    <IconButton>
                      <Button
                        variant="outlined"
                        color="primary"
                
                      ><EditNoteIcon /></Button>
                    </IconButton>
                    {/* DELETE BUTTON */}
                  </Tooltip>
                  <Tooltip Tooltip title="delete" placement="bottom">
                    <IconButton
                      onClick={() => {
                        dispatch({
                          type: "DELETE_ANIMAL",
                          payload: animal.animal_details.id,
                        });
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="error"
        
                      ><DeleteIcon /></Button>
                    </IconButton>
                  </Tooltip>

                  {/* CONTACT */}
                  <Tooltip Tooltip title="contact" placement="bottom">
                    <IconButton
                      onClick={() =>
                        (window.location = `mailto:${animal.animal_details.contact}`)
                      }
                    >
                      <Button width="50%"
                        variant="outlined"
                        color="primary"
                       
                      > <EmailIcon/></Button>
                    </IconButton>
                  </Tooltip>
        
                </CardActions>
              </CardActionArea>
              {/* DETAILS OF ANIMAL*/}
              <CardContent sx={{pt:0}}>
                {/* NAME */}
                <Typography sx={title}>{animal.animal_details.name}</Typography>
                {/* LOCATION */}
                <Typography sx={body}>
                  {animal.animal_details.location.city}, 
                  {animal.animal_details.location.state}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
