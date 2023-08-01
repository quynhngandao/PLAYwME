import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnimalItem from "../Animals/AnimalItem";

// Style
import "../App/App.css";
// Custom sx props
const cardShadow = {
  boxShadow: 5,
  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
  color: (theme) => (theme.palette.mode === "dark" ? "grey.200" : "grey.500"),
};
const styledCard = {
  width: "100%",
  height: 400,
  borderRadius: 5,
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
};
const textLink = {
  variant: "h6",
  color: (theme) => (theme.palette.primary.dark),
}

export default function AnimalsPage() {
  const petfinder = useSelector((store) => store.petfinder);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_API" });
  }, []);

  return (
    <div>
      <header className="App-header">
        <h1 className="available-animal">Available Animals</h1>
      </header>
      <AnimalItem
        styledFab={styledFab}
        styledCardMedia={styledCardMedia}
        styledCard={styledCard}
        cardShadow={cardShadow}
        textLink={textLink}
      />
    </div>
  );
}
