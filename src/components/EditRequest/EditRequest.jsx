import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
/* MUI */
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
  TextField,
  Stack,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import CancelScheduleSend from "@mui/icons-material/CancelScheduleSend";
import EditCustomDateTimePicker from "../CustomDateTimePicker/EditCustomDateTimePicker";
/* STYLE */
const styledCard = {
  width: "100%",
  maxWidth: 400,
  maxHeight: 1000,
  borderRadius: 4,
  boxShadow: 2,
  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
  color: (theme) => (theme.palette.mode === "dark" ? "grey.200" : "grey.500"),
};

export default function EditRequest() {
  // useSelector
  const editRequest = useSelector((store) => store.editRequest);
  const user = useSelector((store) => store.user);
  // useHistory
  const history = useHistory();
  // useDispatch
  const dispatch = useDispatch();

  // handleChange: capture edit input
  const handleChange = (e, propertyToChange) => {
    dispatch({
      type: "EDIT_ONCHANGE",
      payload: {
        property: propertyToChange,
        value: e.target.value,
      },
    });
  };

  // handleDateTimeChange: update the date_time property when date and time are selected
  const handleDateTimeChange = (formattedDateTime) => {
    // Update the date_time state in the parent component
    dispatch({
      type: "EDIT_ONCHANGE",
      payload: {
        property: "date_time",
        value: formattedDateTime,
      },
    });
  };

  // handleSubmit: submit request and go back to user page
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("editRequest before submitting in editrequest", editRequest);

    dispatch({
      type: "SUBMIT_EDIT_REQUEST",
      payload: editRequest,
    });
    // Reset the editRequest state after submitting
    dispatch({
      type: "RESET_EDIT_REQUEST",
    });
    // go to user page
    history.push("/user");
  };

  // cancelEdit: undo request and go back home
  const cancelEdit = () => {
    // Reset the editRequest state after submitting
    dispatch({
      type: "RESET_EDIT_REQUEST",
    });
    // go to user page
    history.push("/user");
  };

  /* DISPLAY */
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "80vh" }}
      textAlign="center"
    >
      <Card className="request-card" sx={styledCard}>
        <Box sx={{ bgcolor: "background.paper", color: "#305f82" }}>
          <Grid container border="1px">
            <Grid item sx={{ my: 2 }}>
              <ListItemAvatar>
                <Avatar sx={{ mx: 4, p: 0, maxWidth: 35, maxHeight: 35 }}>
                  <AccountCircleIcon
                    sx={{ width: 40, height: 40, fill: "#305f82" }}
                  />
                </Avatar>
              </ListItemAvatar>
            </Grid>
            <Grid item sx={{ my: 2 }}>
              <Typography variant="h4" component="div">
                Edit Your Information
              </Typography>
            </Grid>
          </Grid>
          <Divider variant="middle" />
          <Grid 
            container
            sx={{ alignContent: "center", justifyContent: "center", p:3, mb:1}}
          >
            <Grid item>
              <ListItem sx={{width:230}}>
            {/* CUSTOMDATETIMEPICKER */}
            <EditCustomDateTimePicker
              handleDateTimeChange={handleDateTimeChange}
              date_time={editRequest.date_time}
              setDate_time={(formattedDateTime) =>
                handleChange(
                  { target: { value: formattedDateTime } },
                  "date_time"
                )
              }
            />
            </ListItem>
            </Grid>
<Grid item >
  <ListItem >
            <TextField
              label="First Name"
              value={editRequest.first_name}
              placeholder="First name"
              onChange={(e) => handleChange(e, "first_name")}
            /></ListItem></Grid>
<Grid item >
<ListItem>
            <TextField
              label="Last Name"
              value={editRequest.last_name}
              placeholder="Last name"
              onChange={(e) => handleChange(e, "last_name")}
            /></ListItem></Grid>
<Grid item >
<ListItem>
            <TextField
              label="Email"
              value={editRequest.email}
              placeholder="Email"
              onChange={(e) => handleChange(e, "email")}
            /></ListItem></Grid>
          </Grid>
          <Divider variant="middle" />
          {/* SUBMIT BUTTON */}
          <IconButton onClick={handleSubmit} sx={{ m: 1 }}>
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
      </Card>
    </Grid>
  );
}
