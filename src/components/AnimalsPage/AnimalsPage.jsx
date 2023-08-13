
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  minheight: 150,
  height: 200,
  objectFit: "fill",
  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
  color: (theme) => (theme.palette.mode === "dark" ? "grey.200" : "grey.500"),
};
const styledCard = {
  width: "100%",
  minheight: 380,
  maxHeight: 400,
  borderRadius: 4,
  boxShadow: 3,
  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
  color: (theme) => (theme.palette.mode === "dark" ? "grey.200" : "grey.500"),
};
const styledCardMedia = {
  width: "100%",
  minheight: 150,
  height: 200,
  objectFit: "fill",
};
const styledFab = {
  position: "absolute",
  transform: "translate(450%, -100%)",
  opacity: "0.7",
  size: "medium",
};
const styledHeartIcon = {
  marginRight: 1,
  htmlColor: "#ff95a6",
  fontSize: "1.5em",
  color: "pink",
};
const styledHeartButton = {
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
  const loading = useSelector((store) => store.loading) // loading spinner
  const searchResult = useSelector((store) => store.searchResult); // animal type
  const petfinder = useSelector((store) => store.petfinder.animals); // all animals
  // useDispatch
  const dispatch = useDispatch();
  useEffect(() => {
    // Fetch based on the condition (FETCH_TYPE for SearchAnimal, FETCH_ALL for AnimalItem)
    if (searchResult.length > 0) {
      dispatch({ type: "FETCH_TYPE" });
    } else {
      dispatch({ type: "FETCH_ALL" });
    }

  }, [dispatch, searchResult]);

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
                styledFab={styledFab}
                styledCardMedia={styledCardMedia}
                styledCard={styledCard}
                textLink={textLink}
                styledCardMediaNoImage={styledCardMediaNoImage}
                styledHeartIcon={styledHeartIcon}
                styledHeartButton={styledHeartButton}
              />
            ) : (
              <AnimalItem
                styledFab={styledFab}
                styledCardMedia={styledCardMedia}
                styledCard={styledCard}
                textLink={textLink}
                styledCardMediaNoImage={styledCardMediaNoImage}
                styledHeartIcon={styledHeartIcon}
                styledHeartButton={styledHeartButton}
              />
            )}
          </Grid>
        </>
      )}
    </div>
  );
}
