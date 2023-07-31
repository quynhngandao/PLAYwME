import {
  Box,
  Fab,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardActions,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useSelector, useDispatch } from "react-redux";

// Import the placeholder image
import placeholderImage from "./notfoundcat.gif";

// Import CSS
import "./AnimalItem.css";

export default function AnimalItem({ animal }) {
  // useSelector to grab animal data from redux store
  const petfinder = useSelector((store) => store.petfinder);
  const user = useSelector((store) => store.user);

  // useDispatch to send animal data to redux store
  const dispatch = useDispatch();

  // handleFavorite
  const handleFavorite = (e, clickedAnimal) => {
    e.preventDefault();

    // conditional statement: if clickedAnimal=true
    // set newAnimal's properties => clickedAnimal's values
    // handleFavorite function => send clickedAnimal data
    if (
      clickedAnimal &&
      clickedAnimal.name &&
      clickedAnimal.age &&
      clickedAnimal.breeds &&
      clickedAnimal.url
    ) {
      const newAnimal = {
        id: clickedAnimal.id,
        name: clickedAnimal.name,
        age: clickedAnimal.age,
        breeds: clickedAnimal.breeds.primary,
        photos:
          clickedAnimal.photos && clickedAnimal.photos.length > 0
            ? clickedAnimal.primary_photo_cropped.full
            : "",
        url: clickedAnimal.url,
      };
      // dispatch the saved data to redux store
      dispatch({ type: "ADD_ANIMAL", payload: newAnimal });
    } else {
      console.error("Animal data is missing or incomplete.");
    }
  };

  return (
    <>
      {petfinder && (
        <div className="animals">
          {petfinder.map((animal) => (
            <Card
              key={animal.id}
              className="card"
              sx={{
                minWidth: 300,
                maxWidth: 300,
                minHeight: 470,
                maxHeight: 470,
                boxShadow: 5,

                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "#101010" : "#fff",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "grey.200" : "grey.500",
              }}
            >
              {/* Image */}
              {animal.photos && animal.photos.length > 0 ? (
                <CardMedia
                  sx={{
                    width: "100%",
                    minWidth: 300,
                    maxWidth: 300,
                    height: "100%",
                    minHeight: 300,
                    maxHeight: 300,
                    borderRadius: 3,
                  }}
                  component="img"
                  image={animal.primary_photo_cropped.full}
                  alt={animal.name}
                />
              ) : (
                // NOT AVAILABLE IMAGE
                <CardMedia
                  sx={{
                    width: "100%",
                    minWidth: 300,
                    maxWidth: 300,
                    height: "100%",
                    minHeight: 300,
                    maxHeight: 300,
                    borderRadius: 3,
                  }}
                  component="img"
                  image={placeholderImage}
                  alt="not available"
                />
              )}
              <CardActionArea>
                {/* Favorite Button */}
                <IconButton>
                  <Fab
                    onClick={(e) => handleFavorite(e, animal)}
                    size="medium"
                    aria-label="favorite"
                    sx={{
                      position: "absolute",
                      transform: "translate(550%, -100%)",
                      opacity: "0.5",
                    }}
                  >
                    <FavoriteBorderIcon htmlColor="#6294ff" fontSize="large" />
                  </Fab>
                </IconButton>
              </CardActionArea>
              {/* DETAILS */}
              <CardContent>
                {/* NAME */}
                <Typography
                  fontWeight="700"
                  fontFamily="fraunces"
                  gutterBottom
                  variant="h4"
                  component="div"
                >
                  {animal.name}
                </Typography>

                {/* AGE */}
                <Typography variant="h5">
                  {animal.age} &#x2022; {animal.breeds?.primary}
                </Typography>

                {/* LINK */}
                <Typography variant="h6" text="primary.main">
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
