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
  Box,
  Grid,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EmailIcon from "@mui/icons-material/Email";

// Import the placeholder image
import placeholderImage from "./notfoundcat.gif";
import { useState } from "react";

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
  const editRequest = useSelector((store) => store.editRequest);
  // useDispatch to send animal data to redux store
  const dispatch = useDispatch();
  // useState
  const [showCard, setShowCard] = useState(false);

  // Open new tab when picture is clicked
  const openInNewTab = (url) => {
    window.open(url);
  };

  // handleSubmit: submit animal change
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      "edit animals before submitting in favoriteanimalitem",
      editRequest
    );

    dispatch({
      type: "SUBMIT_EDIT_REQUEST",
      payload: editRequest,
    });
    // Reset state after submitting
    dispatch({
      type: "RESET_EDIT_REQUEST",
    });
  };

  // cancelEdit: undo edit
  const cancelEdit = () => {
    // Reset after submitting
    dispatch({
      type: "RESET_EDIT_REQUEST",
    });
  };

  // handleChange
  const handleChange = (e, propertyToChange) => {
    dispatch({
      type: "EDIT_ONCHANGE",
      payload: {
        property: propertyToChange,
        value: e.target.value,
      },
    });
  };

  const handleEditClick = (animalid, clickedanimal) => {
    console.log(editRequest.note, "edit note in favorite animal");

    const animal = favorite.find(
      (req) => req.animal.animal_details.id === animalid
    );

    if (animal && animal.animal_details) {
      const { note } = clickedAnimal.animal_details;
      console.log(note, "edit note in favorite animal");

      dispatch({
        type: "SET_EDIT_REQUEST",
        payload: { id: animalid, note: note },
      });
    }
    setShowCard(showCard);
    history.push("/edit");
  };

  let description;

  if (!showCard) {
    description = (
      <CardActionArea onClick={() => handleEditClick(animal.animal_details.id)}>
        <TextField
          label="Notes"
          onChange={(e) => handleChange(e, "note")}
          value={editRequest.note}
          placeholder="Notes about animal"
        />
        <Button onClick={handleSubmit}>Save</Button>
      </CardActionArea>
    );
  } else {
    description = (
      <CardActionArea
        onClick={() => handleEditClick(animal.animal_details.id)}
      ></CardActionArea>
    );
  }

  // RENDER
  return (
    <>
      <h3 className="animal-page-heading">Review Your Animal Selection</h3>
      {favorite && (
        <div
          className="favorite-animals"
          style={{ display: "flex", justifyContent: "center" }}
        >
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
                <CardActions>
                  <Box
                    sx={{
                      display: "flex",
                      direction: "row",
                      alignItems: "center",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    {/* EDIT BUTTON */}
                    <Tooltip Tooltip title="edit" placement="bottom">
                      <IconButton
                        onClick={() =>
                          handleEditClick(animal.animal_details.id)
                        }
                      >
                        <Button variant="outlined" color="primary">
                          <EditNoteIcon />
                        </Button>
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
                        <Button variant="outlined" color="error">
                          <DeleteIcon />
                        </Button>
                      </IconButton>
                    </Tooltip>

                    {/* CONTACT */}
                    <Tooltip Tooltip title="contact" placement="bottom">
                      <IconButton
                        onClick={() =>
                          (window.location = `mailto:${animal.animal_details.contact}`)
                        }
                      >
                        <Button variant="outlined" color="primary">
                          <EmailIcon />
                        </Button>
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardActions>
              </CardActionArea>

              {/* DETAILS OF ANIMAL*/}
              {description}
              <CardContent sx={{ pt: 0 }}>
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
