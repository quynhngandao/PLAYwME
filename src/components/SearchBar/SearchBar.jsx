
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useState } from "react";
/***** MUI *****/
import { styled, alpha } from "@mui/material/styles";
import { Box, InputBase, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "70ch",
    },
  },
}));

/***** FUNCTION *****/
export default function SearchBar() {
  const dispatch = useDispatch();

  let searchResults = useSelector((store) => store.petfinder);

  const [typeInput, setTypeInput] = useState("");

  const handleSearch = (event, result) => {
    event.preventDefault();
    dispatch({ type: "FETCH_API", payload: typeInput });
  };

/***** RENDER *****/
  return (
    <Box sx={{ display: "flex", justifyContent: "center", margin: 4 }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search for..." }}
          onChange={(event) => setTypeInput(event.target.value)}
        />
      </Search>
      <Button
        variant="contained"
        color="primary"
        onClick={(event) => {
            handleSearch(event);
          }}
        >
        Search
      </Button>
    </Box>
  );
}