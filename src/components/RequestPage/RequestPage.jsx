import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
/***** MUI *****/
import {
  Box,
  Typography,
  IconButton,
  Button,
  Fab,
  Stack,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
/***** COMPONENT *****/
import RequestForm from "../FormRequest/RequestForm";
import FavoriteAnimalItem from "../Animals/FavoriteAnimalItem";
/***** STYLE *****/
import "../App/App.css";
// Custom sx props
const styledCard = {
  width: "100%",
  maxWidth: 350,
  minHeight: 300,
  maxHeight: 400,
  borderRadius: 4,
  boxShadow: 3,
  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
  color: (theme) => (theme.palette.mode === "dark" ? "grey.200" : "grey.500"),
};
const styledCardMedia = {
  width: "100%",
  height: 250,
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

/***** FUNCTION *****/
export default function RequestPage() {
  // useSelector
  const petfinder = useSelector((store) => store.petfinder);
  const favorite = useSelector((store) => store.favorite);
  const loading = useSelector((store) => store.loading);
  // useDispatch
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    dispatch({ type: "FETCH_ANIMALS" });
  }, []);

  /***** RENDER *****/
  return (
    <div className="request-page">
      {/* Conditional rendering based on loading status */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <header className="App-header">
            <h2 className="review-page-title">Review Select Schedule</h2>
          </header><Stack sx={{ direction: "row" }}>
            {/* SCHEDULE REQUEST FORM */}
            <RequestForm />
          </Stack>
          <Box
            container
            sx={{
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            {/* FAVORITE ANIMAL DISPLAY */}
            <FavoriteAnimalItem
              styledCardMedia={styledCardMedia}
              styledCard={styledCard}
              textLink={textLink}
            />
          </Box>
          
        </>
      )}
    </div>
  );
}
