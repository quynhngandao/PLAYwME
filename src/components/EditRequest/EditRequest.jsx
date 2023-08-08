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
import CustomDateTimePicker from "../CustomDateTimePicker/CustomDateTimePicker";
/* STYLE */
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
    >
      <Card className="request-card" sx={styledCard}>
        
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
                  {/* CUSTOMDATETIMEPICKER */}
                  <CustomDateTimePicker
                    onDateTimeChange={handleDateTimeChange} // Pass the function to update user_info.date_time
                    date_time={editRequest.date_time} // Pass the current user_info.date_time value
                    setDate_time={(formattedDateTime) =>
                      handleChange({ target: { value: formattedDateTime } }, "date_time")
                    }
                  />

                  <TextField
                    value={editRequest.first_name}
                    placeholder="First name"
                    onChange={(e) => handleChange(e, "first_name")}
                  />
                  <TextField
                    value={editRequest.last_name}
                    placeholder="Last name"
                    onChange={(e) => handleChange(e, "last_name")}
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
              <IconButton onClick={handleSubmit} sx={{ m: 1 }}>
                <Button 
                  variant="outlined"
                  color="primary"
                  startIcon={<SendIcon />}
                >
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
        
      </Card>
    </Grid>
  );
}
