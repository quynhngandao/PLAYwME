import React, { useEffect } from "react";
import { useSelector } from "react-redux";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

import { useDispatch } from "react-redux";

// Import the placeholder image
import placeholderImage from "./notfoundcat.gif";
import ExpandItem from "../RequestResultItem/ExpandItem";

// custom styling
const body = {
  color: "primary.dark",
  fontSize: "15px",
  fontWeight: "bold",
  fontFamily: "fraunces",
  verticalAlign: "middle",
};
const title = {
  mt: "3px",
  mb: "7px",
  color: "primary.main",
  fontSize: "1em",
  fontFamily: "fraunces",
};

// FUNCTION
export default function FavoriteAnimalItem({ styledCard, styledCardMedia }) {
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
                <CardActionArea onClick={() => openInNewTab(animal.animal_details.url)}>
                  <CardMedia
                    sx={styledCardMedia}
                    component="img"
                    image={animal.animal_details.photos}
                    alt={animal.animal_details.name}
                  />
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
                <CardActions>
                  {/* EDIT BUTTON */}
                  <IconButton>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<EditNoteIcon />}
                    >
                      Edit
                    </Button>
                   
                  </IconButton>
                  {/* DELETE BUTTON - should only show for logged in user */}
                  {animal.user_id == user.id ? (
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
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </IconButton>
                  ) : (
                    <></>
                  )}
                </CardActions>
              </CardActionArea>
              {/* DETAILS OF ANIMAL*/}
              <CardContent>
                {/* NAME */}
                <Typography sx={title}>{animal.animal_details.name}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
