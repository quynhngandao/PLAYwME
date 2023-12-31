import { useSelector, useDispatch } from "react-redux";
import RequestResult from "../RequestResultItem/RequestResult";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
/***** MUI *****/
import { Box, Button, Grid } from "@mui/material";
function UserPage() {
  // useSelector
  const user = useSelector((store) => store.user);
  // useHistory
  const history = useHistory();
  // useDispatch 
  const dispatch = useDispatch();

  // DISPLAY ALL REQUEST
  useEffect(() => {
    dispatch({ type: "FETCH_REQUESTS" });
  }, []);
// handleClick go to animals display page
  const handleClick = () => {
    history.push("/petfinder");
  };
  /***** RENDER *****/
  return (
      <Grid className="user-page">
        <Box >
          <h2 className="user-page-title">Welcome, {user.username}</h2>
        </Box>
        <Grid sx={{
      my: { xs: 1, sm: 2, md: 3 } }}>
          <Box
            sx={{
              alignContent: "center",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center", 
              borderRadius:"5px"
            }}
          >
            <Button
              variant="outlined"
              type="button"
              className="btn"
              buttonStyle="btn--primary"
              buttonSize="btn--large"
              onClick={() => handleClick()}
            >
              <span>
                SEE THE ANIMALS <i className="fa-solid fa-paw" />
              </span>
            </Button>
          </Box>
        </Grid>
        <Grid>
          {/* DISPLAY REQUEST RESULT */}
          <RequestResult />
        </Grid>
      </Grid>

  );
}
// this allows us to use <App /> in index.js
export default UserPage;
