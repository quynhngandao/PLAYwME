import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteAnimal from "../Animals/FavoriteAnimal";

// Style
import "../App/App.css";
// Custom sx props
const styledCard = {
  width: "100%",
  height: 350,
  borderRadius: 5,
  boxShadow: 5,
  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
  color: (theme) => (theme.palette.mode === "dark" ? "grey.200" : "grey.500"),
};
const styledCardMedia = {
  width: "100%",
  height: 200,
  objectFit: "fill",
};
const textLink = {
  variant: "h6",
  color: (theme) => (theme.palette.primary.dark),
}

export default function AnimalsPage() {
  const petfinder = useSelector((store) => store.petfinder);
const favorite = useSelector(store => store.favorite)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_ANIMALS" });
  }, []);

  return (
    <div>
      <header className="App-header">
        <h1 className="available-animal">Review Page</h1>
      </header>
      <FavoriteAnimal
        styledCardMedia={styledCardMedia}
        styledCard={styledCard}
        textLink={textLink}
      />
    </div>
  );
}
