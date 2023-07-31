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
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Import the placeholder image
import placeholderImage from "./notfoundcat.gif";
import { useDispatch } from "react-redux";
import { InsertEmoticon } from "@mui/icons-material";

// FUNCTION
export default function FavoriteAnimal() {
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
            <Card key={animal.id}>
              {/* Image */}
              {animal.photos && animal.photos.length > 0 ? (
                <CardMedia
                  component="img"
                  image={animal.photos}
                  alt={animal.name}
                />
              ) : (
                // NOT AVAILABLE IMAGE
                <CardMedia
                  component="img"
                  image={placeholderImage}
                  alt="not available"
                />
              )}
              <CardActionArea>
                <CardActions>
                  {/* DELETE BUTTON */}
                  <IconButton></IconButton>
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
