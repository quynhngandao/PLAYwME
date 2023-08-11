import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnimalItem from "../Animals/AnimalItem";

/*****STYLE*****/
import "../App/App.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
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

export default function AnimalsPage() {
  const petfinder = useSelector((store) => store.petfinder);
  const loading = useSelector((store) => store.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_API" });
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
          {/* ANIMAL DISPLAY ITEM */}
          <Grid>
            <AnimalItem
              styledFab={styledFab}
              styledCardMedia={styledCardMedia}
              styledCard={styledCard}
              textLink={textLink}
              styledCardMediaNoImage={styledCardMediaNoImage}
              styledHeartIcon={styledHeartIcon}
              styledHeartButton={styledHeartButton}
            />
          </Grid>
        </>
      )}
    </div>
  );
}
