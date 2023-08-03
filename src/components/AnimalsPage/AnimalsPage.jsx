import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnimalItem from "../Animals/AnimalItem";

/*****STYLE*****/
import "../App/App.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import SearchBar from "../SearchBar/SearchBar";
// Custom sx props
const styledCardMediaNoImage = {
  width: "100%",
  height: 250,
  objectFit: "fill",
  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
  color: (theme) => (theme.palette.mode === "dark" ? "grey.200" : "grey.500"),
};
const styledCard = {
  width: "100%",
  height: 400,
  borderRadius: 3,
  boxShadow: 5,
  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
  color: (theme) => (theme.palette.mode === "dark" ? "grey.200" : "grey.500"),
};
const styledCardMedia = {
  width: "100%",
  height: 250,
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
  ariaLabel: "favorite",
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
  }, [dispatch]);

  return (
    <div>
      {/* Conditional rendering based on loading status */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <header className="App-header">
            <Typography variant="h2" color="primary.main" className="page-tile">
              Available Animals
            </Typography>
          </header>
          {/* SEARCH BAR */}
          <SearchBar />
          <AnimalItem
            styledFab={styledFab}
            styledCardMedia={styledCardMedia}
            styledCard={styledCard}
            textLink={textLink}
            styledCardMediaNoImage={styledCardMediaNoImage}
            styledHeartIcon={styledHeartIcon}
            styledHeartButton={styledHeartButton}
          />
        </>
      )}
    </div>
  );
}
