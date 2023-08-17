import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import React, { forwardRef } from 'react';
import { isMobile } from "react-device-detect";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
/*****STYLE and IMPORT*****/
import "../App/App.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
// Import the placeholder image
import placeholderImage from "../Animals/notfoundcat.gif";
import "../Animals/AnimalItem.css";
/***** MUI *****/
import {
  CardContent,
  Typography,
  CardActionArea,
  IconButton,
  Card,
  CardMedia,
  Tooltip,
  Grid,
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// STYLING
// Custom sx props
const styledCardMediaNoImage = {
  width: "100%",
  minHeight: isMobile ? 110 : 190,
  maxHeight: isMobile ? 120 : 190,
  objectFit: "fill",
  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
  color: (theme) => (theme.palette.mode === "dark" ? "grey.200" : "grey.500"),
};
const styledCardMediaNoImageMobile = {
  width: "100%",
  minheight: 110,
  maxHeight: 120,
  objectFit: "fill",
  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
  color: (theme) => (theme.palette.mode === "dark" ? "grey.200" : "grey.500"),
};
const styledCardMedia = {
  width: "100%",
  minHeight: isMobile ? 110 : 190,
  maxHeight: isMobile ? 120 : 190,
  objectFit: "fill",
};
const styledCardMediaMobile = {
  width: "100%",
  minheight: 110,
  maxHeight: 120,
  objectFit: "fill",
};
const styledCard = {
  width: "100%",
  minHeight: isMobile ? 150 : 300,
  maxHeight: isMobile ? 220: 400,
  borderRadius: isMobile ? 2 : 4,
  boxShadow: isMobile ? 1 : 3,
  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
  color: (theme) => (theme.palette.mode === "dark" ? "grey.200" : "grey.500"),
};
const styledCardMobile = {
  width: "100%",
  minheight: 150,
  maxHeight: 220,
  borderRadius: 2,
  boxShadow: 1,
  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
  color: (theme) => (theme.palette.mode === "dark" ? "grey.200" : "grey.500"),
};

const styledHeartIcon = {
  marginRight: 1,
  htmlColor: "#ff95a6",
  fontSize: isMobile ? "1.5rem" : "2.2rem",
  color: "pink",
};
const styledHeartIconMobile = {
  marginRight: 1,
  htmlColor: "#ff95a6",
  fontSize: "1.5rem",
  color: "pink",
};
const styledHeartButton = {
  float: "right",
  borderRadius: isMobile ? 5 : 5,
};
const styledHeartButtonMobile = {
  float: "right",
  borderRadius: 5,
};
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
  color: "primary.main",
  fontSize: isMobile ? ".7rem":"1.5rem",
  fontFamily: "fraunces",
};
const titleMobile = {
  mt: 0,
  mb:  .5,
  color: "primary.main",
  fontSize:  ".7rem",
  fontFamily: "fraunces",
};
// Snackbar alert 
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert ref={ref} width="80%" variant="filled" {...props} />;
});
/*****STYLE-END*****/
/***** FUNCTION *****/
export default function AllAnimalsPage() {
  // useSelector
  const loading = useSelector((store) => store.loading); // loading spinner
  const allAnimals = useSelector((store) => store.allAnimals); // all animals from database
  // useDispatch
  const dispatch = useDispatch();
  // useHistory
  const history = useHistory();

  useEffect(() => {
    dispatch({type: "FETCH_ALL_ANIMALS"}); // fetch all animals from database
  }, []);

  // handleClick
  const handleClick = () => {
history.push('/registration')
  }

  return (
    <div className="all-animals-page">
      {/* Conditional rendering based on loading status */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Grid>
            <header className="App-header">
              <h2 className="animal-page-title">Available Animals</h2>
            </header>
          </Grid>
          <Grid></Grid>
          <Grid>
            {/* Display the animals */}
            <div className="all-animals">
              {allAnimals && (
                <div className="animals">
                  {allAnimals.map((animal, index) => (
                    <Tooltip title="Click For More Details" placement="top">
                      <Card
                        key={index}
                        className="card"
                        sx={isMobile ? styledCardMobile : styledCard}
                      >
                        {/* Image */}
                        {animal.photos && animal.photos.length > 0 ? (
                          <CardActionArea
                          
                          >
                            <CardMedia
                              sx={
                                isMobile
                                  ? styledCardMediaMobile
                                  : styledCardMedia
                              }
                              component="img"
                              image={animal.photos}
                              alt={animal.name}
                            />
                          </CardActionArea>
                        ) : (
                          // NOT AVAILABLE IMAGE
                          <CardActionArea
                       
                          >
                            <CardMedia
                              sx={
                                isMobile
                                  ? styledCardMediaNoImageMobile
                                  : styledCardMediaNoImage
                              }
                              component="img"
                              image={placeholderImage}
                              alt="not available"
                            />
                          </CardActionArea>
                        )}

                        {/* Favorite Button */}
      
                          <IconButton
                            sx={
                              isMobile
                                ? styledHeartButtonMobile
                                : styledHeartButton
                            }
                            onClick={handleClick}
                          >
                            <FavoriteBorderIcon
                              sx={
                                isMobile
                                  ? styledHeartIconMobile
                                  : styledHeartIcon
                              }
                            />
                          </IconButton>
                        {/* DETAILS */}
                        <CardContent>
                          {/* NAME */}
                          <Typography sx={isMobile ? titleMobile : title}>
                            {animal.name}
                          </Typography>
                          {/* AGE */}
                          <Typography sx={isMobile ? bodyMobile : body}>
                            {animal.age} &#x2022; {animal.breeds?.primary}
                          </Typography>
                          {/* LOCATION */}
                          <Typography sx={isMobile ? bodyMobile : body}>
                            {animal.location.city},{" "}
                            {animal.location.state}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Tooltip>
                  ))}
                </div>
              )}
            </div>
          </Grid>
        </>
      )}
    </div>
  );
}
