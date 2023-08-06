import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Box,
  Card,
  IconButton,
  Button,
  Divider,
  Typography,
  Grid,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CardContent,
  TextField, 
  Stack
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import CancelScheduleSend from "@mui/icons-material/CancelScheduleSend";

const styledCard = {
  width: "100%",
  maxWidth: 400,
  maxHeight: 1000,
  borderRadius: 3,
  boxShadow: 3,
  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
  color: (theme) => (theme.palette.mode === "dark" ? "grey.200" : "grey.500"),
};

export default function EditRequest() {
  const editRequest = useSelector((store) => store.editRequest);
  const user = useSelector((store) => store.user);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (e, propertyToChange) => {
    dispatch({
      type: "EDIT_ONCHANGE",
      payload: {
        property: propertyToChange,
        value: e.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT_EDIT_REQUEST", payload: editRequest });
    history.push("/");
  };

  const cancelEdit = () => {
    history.push("/");
  };

  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: '100vh' }}
  >
      <Card className="request" sx={styledCard}> 
      <form onSubmit={handleSubmit}>
        <Box sx={{ bgcolor: "background.paper", color: "#305f82" }}>
          <Box sx={{ my: 2, mx: 1 }}>
            <Grid container border="1px" alignItems="center">
              <Grid item xs>
                <Typography sx={{ m: 1 }} variant="h4" component="div">
                  Edit Your Information
                </Typography>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Box>
          <Divider variant="middle" />
          <Box>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ maxWidth: 35, maxHeight: 35 }}>
                  <AccountCircleIcon
                    sx={{ width: 40, height: 40, fill: "#305f82" }}
                  />
                </Avatar>
              </ListItemAvatar>
              <Stack spacing={2}>
              <TextField type="datetime-local" value={editRequest.date_time}
                placeholder="Playtime"
                onChange={(e) => handleChange(e, "date_time")}/>
              <TextField
                value={editRequest.first_name}
                placeholder="First name"
                onChange={(e) => handleChange(e, "first_name")}
              />
              <TextField
                value={editRequest.email}
                placeholder="Email"
                onChange={(e) => handleChange(e, "email")}
              />
              </Stack>
            </ListItem>
          </Box>
          <Divider variant="middle" />
          <Box>
            {/* SUBMIT BUTTON */}
            <IconButton type="submit" sx={{ m: 1 }}>
              <Button variant="outlined" color="primary" startIcon={<SendIcon />}>
                Submit
              </Button>
            </IconButton>
            {/* CANCEL BUTTON */}
            <IconButton onClick={cancelEdit} sx={{ m: 1 }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<CancelScheduleSend />}
              >
                Cancel
              </Button>
            </IconButton>
          </Box>
        </Box> 
        </form>
      </Card>
   </Grid>
  );
}
