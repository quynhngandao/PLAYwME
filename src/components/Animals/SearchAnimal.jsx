import { useSelector, useDispatch } from "react-redux";
import React, { forwardRef, useState } from 'react';
import { isMobile } from "react-device-detect";
// Import the placeholder image
import placeholderImage from "./notfoundcat.gif";
import "./AnimalItem.css";
/***** MUI *****/
import {
  CardContent,
  Typography,
  CardActionArea,
  IconButton,
  Card,
  CardMedia,
  Tooltip,
  Stack,
  Snackbar, 
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// STYLING
// STYLING
const body = {
  color: "primary.dark",
  fontSize: isMobile? ".5rem":".9rem",
fontWeight:  isMobile ? 600 : 800,
  fontFamily:  "fraunces",
  verticalAlign: "middle",
};
const bodyMobile = {
  color: "primary.dark",
  fontSize: ".5rem",
  fontWeight: 600,
  fontFamily: "fraunces",
  verticalAlign: "middle",
};
const title = {
  mt:  isMobile? 0:1,
  mb:  isMobile? 0.5:1,
  fontWeight: 800,
  color: "primary.dark",
  fontSize: isMobile ? ".7rem":"1.5rem",
  fontFamily: "fraunces",
};
const titleMobile = {
  mt: 0,
  mb:  .5,
  color: "primary.dark",
  fontSize:  ".7rem",
  fontFamily: "fraunces",
};
// Snackbar alert 
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert ref={ref} width="80%" variant="filled" {...props} />;
});
/***** FUNCTION *****/
export default function SearchAnimal({
  styledCard,
  styledCardMobile,
  styledCardMedia,  
  styledCardMediaMobile, 
  styledCardMediaNoImage,
  styledCardMediaNoImageMobile,
  styledHeartIcon,
  styledHeartIconMobile,
  styledHeartButton,
  styledHeartButtonMobile,
}) {
   // useSelector
   const searchResult = useSelector((store) => store.searchResult);
   const user = useSelector((store) => store.user);
   // useDispatch
   const dispatch = useDispatch(); 
   // useState for alert 
   const [open, setOpen] = useState(false);
   // handleClose for alert
   const handleClose = (event, reason) => {
     if (reason === 'clickaway') {
       return;
     }
 // close alert
     setOpen(false);
   };
  // handleFavorite to post animal from API to database
  const handleFavorite = (e, clickedAnimal) => {
    e.preventDefault();
     // open alert 
     setOpen(true);
    // conditional statement: if clickedAnimal=true
    // set newAnimal's properties => clickedAnimal's values
    // handleFavorite function => send clickedAnimal data
    if (clickedAnimal && clickedAnimal.id) {
      const newAnimal = {
        id: clickedAnimal.id,
        name: clickedAnimal.name,
        age: clickedAnimal.age,
        attribute: clickedAnimal.attribute,
        environment: clickedAnimal.environment,
        breeds: clickedAnimal.breeds.primary,
        type: clickedAnimal.type,
        size: clickedAnimal.size,
        organization_id: clickedAnimal.organization_id,
        organization_animal_id: clickedAnimal.organization_animal_id,
        status: clickedAnimal.status,
        status_changed_at: clickedAnimal.status_changed_at,
        published_at: clickedAnimal.published_at,
        location: clickedAnimal.contact.address,
        contact: clickedAnimal.contact.email,
        // Long conditional to check through all of the available photos
        photos: (() => {
          if (
            clickedAnimal.photos &&
            clickedAnimal.photos.length > 0 &&
            clickedAnimal.photos[0].full
          ) {
            return clickedAnimal.photos[0].full;
          } else if (
            clickedAnimal.primary_photo_cropped &&
            clickedAnimal.primary_photo_cropped.full
          ) {
            return clickedAnimal.primary_photo_cropped.full;
          } else if (
            clickedAnimal.photos &&
            clickedAnimal.photos.length > 0 &&
            clickedAnimal.photos[0].large
          ) {
            return clickedAnimal.photos[0].large;
          }
        })(),
        url: clickedAnimal.url,
      };
      // dispatch the saved data to redux store
      dispatch({ type: "ADD_ANIMAL", payload: newAnimal });
    } else {
      console.error(
        "Animal data cannot be added to database due to being missing or incomplete."
      );
    }
  };
  // Open new tab when picture is clicked
  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };
  /***** RENDER *****/
  return (
    <div className="searchResult">
      {searchResult.animals && (
        <div className="animals">
          {searchResult.animals.map((animal, index) => (
            <Tooltip title="Click For More Details" placement="top">
              <Card key={index} className="card" sx={isMobile ? styledCardMobile : styledCard}>
                  {/* Image */}
                {animal.photos && animal.photos.length > 0 ? (
                  <CardActionArea onClick={() => openInNewTab(animal.url)}>
                    <CardMedia
                      sx={isMobile ? styledCardMediaMobile : styledCardMedia}
                  
                      component="img"
                      image={animal.photos[0].full}
                      alt={animal.name}
                    />
                  </CardActionArea>
                ) : (
                  // NOT AVAILABLE IMAGE
                  <CardActionArea onClick={() => openInNewTab(animal.url)}>
                    <CardMedia
                    sx={isMobile ? styledCardMediaNoImageMobile : styledCardMediaNoImage}
                   
                      component="img"
                      image={placeholderImage}
                      alt="not available"
                    />
                  </CardActionArea>
                )}

                {/* Favorite Button */}
                <Tooltip title="Add to Favorite" placement="left-start">
                  <IconButton
                         sx={isMobile ? styledHeartButtonMobile : styledHeartButton}
                   
                      onClick={(e) => handleFavorite(e, animal)}
                    >
                      <FavoriteBorderIcon  sx={isMobile ? styledHeartIconMobile : styledHeartIcon} />
                    </IconButton>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{bgColor: "primary"}} fontFamily="varela round">
          Animal Added!
        </Alert>
      </Snackbar>
    </Tooltip>
                {/* DETAILS */}
                <CardContent>
                  {/* NAME */}
                  <Typography sx={isMobile ? titleMobile : title}>{animal.name}</Typography>
                  {/* AGE */}
                  <Typography sx={isMobile ? bodyMobile: body}>
                    {animal.age} &#x2022; {animal.breeds?.primary}
                  </Typography>
                  {/* LOCATION */}
                  <Typography sx={isMobile ? bodyMobile: body}>
                    {animal.contact.address.city},{" "}
                    {animal.contact.address.state}
                  </Typography>
                </CardContent>
              </Card>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  );
}
