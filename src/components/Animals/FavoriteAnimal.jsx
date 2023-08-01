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
import EditNoteIcon from '@mui/icons-material/EditNote';

// Import the placeholder image
import placeholderImage from "./notfoundcat.gif";
import { useDispatch } from "react-redux";

// FUNCTION
export default function FavoriteAnimal({
  styledCard,
  styledCardMedia,
}) {
  const user = useSelector((store) => store.user);
  const favorite = useSelector((store) => store.favorite);
  const dispatch = useDispatch();

  // RENDER
  return (
    <>
      <Typography sx={{ m: 1, p: 1 }} variant="h4" color="primary.dark">
        Here are your animals
      </Typography>
      {favorite && (
        <div className="favorite-animals">
          {favorite.map((animal) => (
            <Card key={animal.id} sx={styledCard}>
              {/* Image */}
              {animal.photos && animal.photos.length > 0 ? (
                <CardMedia sx={styledCardMedia}
                  component="img"
                  image={animal.photos}
                  alt={animal.name}
                />
              ) : (
                // NOT AVAILABLE IMAGE
                <CardMedia sx={styledCardMedia}
                  component="img"
                  image={placeholderImage}
                  alt="not available"
                />
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
                  {/* DELETE BUTTON */}
                  <IconButton>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </IconButton>
                </CardActions>
              </CardActionArea>
              {/* DETAILS OF ANIMAL*/}
              <CardContent>
                {/* NAME */}
                <Typography gutterBottom variant="h4">
                  {animal.name}
                </Typography>
                {/* AGE */}
                <Typography variant="h5">
                  {animal.age} &#x2022; {animal.breeds}
                </Typography>
                {/* LINK */}
                <Typography variant="h6">
                  <a href={animal.url}>For more information</a>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
