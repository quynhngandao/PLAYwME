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
import ContactForm from "../ContactForm/ContactForm";
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
  color: (theme) => theme.palette.primary.dark,
};
const styledFab = {
  margin: 0,
  ariaLabel: "send",
  size: "medium",
};

export default function AnimalsPage() {
  const petfinder = useSelector((store) => store.petfinder);
  const favorite = useSelector((store) => store.favorite);
  const loading = useSelector((store) => store.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_ANIMALS" });
  }, []);

  return (
    <div>
      {/* Conditional rendering based on loading status */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Box sx={{ml:5}}>
          <header className="App-header">
            <Typography
              variant="h2"
              color="primary.main"
              className="page-title"
            >
              Review Page
            </Typography>
          </header>
          <Box minHeight="350px">
            {/* ANIMAL DISPLAY */}
            <FavoriteAnimalItem
              styledCardMedia={styledCardMedia}
              styledCard={styledCard}
              textLink={textLink}
            />
          </Box>
          <Stack sx={{direction:"row", mb:5}}>

            {/* REQUEST FORM */}
            <ContactForm />
           
          </Stack>
        </Box>
      )}
    </div>
  );
}
