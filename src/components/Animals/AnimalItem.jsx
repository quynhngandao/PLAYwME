import { useSelector, useDispatch } from "react-redux";
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
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// STYLING
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
  fontSize: "1.5em",
  fontFamily: "fraunces",
};
/***** FUNCTION *****/
export default function AnimalItem({
  styledCard,
  styledCardMedia,
  styledCardMediaNoImage,
  styledHeartIcon,
  styledHeartButton,
}) {
  // useSelector
  const petfinder = useSelector((store) => store.petfinder);
  const user = useSelector((store) => store.user);
  // useDispatch
  const dispatch = useDispatch();
  // handleFavorite to post animal from API to database
  const handleFavorite = (e, clickedAnimal) => {
    e.preventDefault();
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
    <div className="petfinder">
      {petfinder.animals && ( // Check for both searchResult and petfinder
        <div className="animals">
          {petfinder.animals.map(
            (
              animal,
              index // Use searchResult or petfinder
            ) => (
              <Tooltip title="Click For More Details" placement="top">
                <Card key={index} className="card" sx={styledCard}>
                  {/* Image */}
                  {animal.photos && animal.photos.length > 0 ? (
                    <CardActionArea onClick={() => openInNewTab(animal.url)}>
                      <CardMedia
                        sx={styledCardMedia}
                        component="img"
                        image={animal.photos[0].full}
                        alt={animal.name}
                      />
                    </CardActionArea>
                  ) : (
                    // NOT AVAILABLE IMAGE
                    <CardActionArea onClick={() => openInNewTab(animal.url)}>
                      <CardMedia
                        sx={styledCardMediaNoImage}
                        component="img"
                        image={placeholderImage}
                        alt="not available"
                      />
                    </CardActionArea>
                  )}

                  {/* Favorite Button */}
                  <Tooltip title="Add to Favorite" placement="left-start">
                    <IconButton
                      sx={styledHeartButton}
                      onClick={(e) => handleFavorite(e, animal)}
                    >
                      <FavoriteBorderIcon sx={styledHeartIcon} />
                    </IconButton>
                  </Tooltip>
                  {/* DETAILS */}
                  <CardContent>
                    {/* NAME */}
                    <Typography sx={title}>{animal.name}</Typography>
                    {/* AGE */}
                    <Typography sx={body}>
                      {animal.age} &#x2022; {animal.breeds?.primary}
                    </Typography>
                    {/* LOCATION */}
                    <Typography sx={body}>
                      {animal.contact.address.city},{" "}
                      {animal.contact.address.state}
                    </Typography>
                  </CardContent>
                </Card>
              </Tooltip>
            )
          )}
        </div>
      )}
    </div>
  );
}
