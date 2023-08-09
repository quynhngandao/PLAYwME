import { Typography, Grid, Pagination } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnimalItem from "../Animals/AnimalItem";

/*****STYLE*****/
import "../App/App.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import SearchBar from "../SearchBar/SearchBar";
// Custom sx props
const styledCardMediaNoImage = {
  width: "100%",
  height: 170,
objectFit: "fill",
  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
  color: (theme) => (theme.palette.mode === "dark" ? "grey.200" : "grey.500"),
};
const styledCard = {
  width: "100%",
  height: 300,
  borderRadius: 4,
  boxShadow: 3,
  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
  color: (theme) => (theme.palette.mode === "dark" ? "grey.200" : "grey.500"),
};
const styledCardMedia = {
  width: "100%",
  height: 170,
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
   const pagination = useSelector((store) => store.pagination);

  
const [current, setCurrentPage] = useState()
const [previous, setPreviousPage] = useState(current)
const [next, setNextPage] = useState(current)

  // handlePageChange when you click onto the next page
  const handlePageChange = (event, current, next, previous) => {
    event.preventDefault();
    setCurrentPage(current);
    setPreviousPage(previous)
    setNextPage(next)
   
    console.log(current ,"newpage set currenttpage")
    console.log(next ,"next set currenttpage")
    console.log(previous ,"previous set currenttpage")
    dispatch({ type: "SET_CURRENT_PAGE", payload: current})
  dispatch({type:"SET_PREVIOUS", payload: previous})
  dispatch({type:"SET_NEXT", payload: next})
  dispatch({type:"SET_LINKS"})
  };

  useEffect(() => {
    dispatch({ type: "FETCH_API" });
  }, [ ]);

  return (
    <div className="petfinder-page">
      {/* Conditional rendering based on loading status */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Grid>
            <header className="App-header">
              <h2
                className="animal-page-title"
              >
                Available Animals
              </h2>
            </header>
          </Grid>
          {/* SEARCH BAR */}
          <Grid>
            <SearchBar />
          </Grid>
          {/* PAGINATION */}
          <Grid item>
   
          <Pagination 
           page={pagination.currentPage}
           count={pagination.totalPages}
           previous={pagination._links}
           next={pagination._links}
           onChange={handlePageChange}
          sx={{justifyContent:"end"}} variant="outlined" color="primary" />
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
