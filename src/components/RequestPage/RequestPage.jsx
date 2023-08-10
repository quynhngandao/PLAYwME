import {
  Box,
  Typography,
  IconButton,
  Button,
  Fab,
  Stack,
  Divider,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteAnimalItem from "../Animals/FavoriteAnimalItem";
import SendIcon from "@mui/icons-material/Send";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

// Style
import "../App/App.css";
import RequestForm from  '../FormRequest/RequestForm'
// Custom sx props
const styledCard = {
  width: "100%",
  maxWidth: 300,
  height: 400,
  borderRadius: 5,
  boxShadow: 4,
  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
  color: (theme) => (theme.palette.mode === "dark" ? "grey.200" : "grey.500"),
};
const styledCardMedia = {
  width: "100%",
  height: 180,
  objectFit: "fill",
  mb: 1
};
const textLink = {
  variant: "h6",
  color: (theme) => theme.palette.primary.dark,
};
const styledFab = {
  margin: 0,
  ariaLabel: "send",
  size: "medium",
};

export default function RequestPage() {
  const petfinder = useSelector((store) => store.petfinder);
  const favorite = useSelector((store) => store.favorite);
  const loading = useSelector((store) => store.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_ANIMALS" });
  }, []);

  return (
    <div className="request-page">
      {/* Conditional rendering based on loading status */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Box sx={{mx:5}}>
          <header className="App-header">
            <h2
              className="review-page-title"
            >
              Review Page
            </h2>
          </header>
          <Box container sx={{justifyContent: "center", alignContent: "center"}}>
            {/* ANIMAL DISPLAY */}
            <FavoriteAnimalItem
              styledCardMedia={styledCardMedia}
              styledCard={styledCard}
              textLink={textLink}
            />
          </Box>
          <Stack sx={{direction:"row"}}>

            {/* REQUEST FORM */}
            <RequestForm />
           
          </Stack>
        </Box>
      )}
    </div>
  );
}
