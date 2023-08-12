import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, InputBase, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.light, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.light, 0.35),
  },
  [theme.breakpoints.up("sm")]: {
    width: "40em",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "70ch",
    },
  },
}));

export default function SearchBar() {
  const dispatch = useDispatch();
  const [typeInput, setTypeInput] = useState("");

  const handleSearch = (typeInput, event) => {
    event.preventDefault();

    if (typeInput === "dog" || typeInput === "cat" || typeInput === "rabbit") {
      dispatch({ type: "FETCH_TYPE", payload: typeInput });
    } else if (typeInput === "") {
      dispatch({ type: "FETCH_ALL" });
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", margin: 4 }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search for..." }}
          value={typeInput}
          onChange={(event) => setTypeInput(event.target.value)}
        />
      </Search>
      <Button
        variant="contained"
        color="primary"
        onClick={(event) => handleSearch(typeInput, event)}
      >
        Search
      </Button>
    </Box>
  );
}
