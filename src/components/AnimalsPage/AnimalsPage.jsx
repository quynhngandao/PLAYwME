import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import axios from "axios";
/*****STYLE and IMPORT*****/
import "../App/App.css";
import AnimalItem from "../Animals/AnimalItem";
import SearchAnimal from "../Animals/SearchAnimal";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import SearchBar from "../SearchBar/SearchBar";
import { Grid } from "@mui/material";
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
const textLink = {
  variant: "h6",
  color: (theme) => theme.palette.primary.dark,
};
/*****STYLE-END*****/
/***** FUNCTION *****/
export default function AnimalsPage() {
  // useSelector
  const loading = useSelector((store) => store.loading); // loading spinner
  const searchResult = useSelector((store) => store.searchResult); // animal type
  const petfinder = useSelector((store) => store.petfinder.animals); // all animals
  // useDispatch
  const dispatch = useDispatch();

  // Function to execute update the token on refresh 
  const handlePutToken = async () => {
    try {
      await axios.put("/api/animal/update-token"); // Post the token to the backend
      const responseData = await postToken();
    } catch (error) {
      console.error("Error posting token:", error);
    }
  };

  useEffect(() => {
    // Execute 
    handlePutToken();
    // Fetch based on the condition (FETCH_TYPE for SearchAnimal, FETCH_ALL for AnimalItem)
    if (searchResult.length > 0) {
      dispatch({ type: "FETCH_TYPE" });
    } else {
      dispatch({ type: "FETCH_ALL" });
    }
  }, []);

  return (
    <div className="petfinder-page">
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
          <Grid>
            {/* SearchBar */}
            <SearchBar />
          </Grid>
          <Grid>
            {/* Display this for dog, cat, bird, rabbit */}
            {searchResult.animals?.length > 0 ? (
              <SearchAnimal
              styledCardMedia={styledCardMedia}
              styledCardMediaMobile={styledCardMediaMobile}
              styledCard={styledCard}
              styledCardMobile={styledCardMobile}
              textLink={textLink}
              styledCardMediaNoImage={styledCardMediaNoImage}
              styledCardMediaNoImageMobile={styledCardMediaNoImageMobile}
              styledHeartIcon={styledHeartIcon}
              styledHeartButton={styledHeartButton}
              styledHeartIconMobile={styledHeartIconMobile}
              styledHeartButtonMobile={styledHeartButtonMobile}
              />
            ) : (
              <AnimalItem
                styledCardMedia={styledCardMedia}
                styledCardMediaMobile={styledCardMediaMobile}
                styledCard={styledCard}
                styledCardMobile={styledCardMobile}
                textLink={textLink}
                styledCardMediaNoImage={styledCardMediaNoImage}
                styledCardMediaNoImageMobile={styledCardMediaNoImageMobile}
                styledHeartIcon={styledHeartIcon}
                styledHeartButton={styledHeartButton}
                styledHeartIconMobile={styledHeartIconMobile}
                styledHeartButtonMobile={styledHeartButtonMobile}
              />
            )}
          </Grid>
        </>
      )}
    </div>
  );
}
