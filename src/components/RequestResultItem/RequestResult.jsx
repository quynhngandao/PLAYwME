import { useSelector, useDispatch } from "react-redux";
import React from "react";
import dayjs from "dayjs";
import {
  Box,
  Card,
  IconButton,
  Button,
  Stack,
  Divider,
  Typography,
  Grid,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { Dayjs } from "dayjs";

const styledCard = {
  width: "100%",
  maxWidth: 300,
  minHeight: 330,
  borderRadius: 3,
  boxShadow: 3,
  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
  color: (theme) => (theme.palette.mode === "dark" ? "grey.200" : "grey.500"),
  ml: 1,
  mr: 5,
  mb: 5,
};

export default function RequestResult({ request }) {
  const user = useSelector((store) => store.user);
  const requests = useSelector((store) => store.requests);

  const dispatch = useDispatch();
  const history = useHistory();

  // handleEdit
  const handleEditClick = (requestId) => {
    console.log("Edit clicked for requestId:", requestId);
    console.log("Requests object:", requests);

    // Find the specific request object with the given requestId
    const request = requests.find(
      (req) => req.user_info.request_id === requestId
    );
    console.log("Selected Request object in requestresult:", request);

    if (request && request.user_info) {
      const { email, last_name, first_name } = request.user_info;

      // Dispatch the action to set editRequest with the specific request data
      dispatch({
        type: "SET_EDIT_REQUEST",
        payload: {
          id: requestId,
          first_name: first_name || "",
          last_name: last_name || "",
          email: email || "",
        },
      });

      // Navigate to the edit page for each animal
      history.push("/edit");
    } else {
      console.log("Request not found or user_info is missing!");
      // Redirect to some error page or show an error message to the user
    }
  };

  return (
    <Box alignContent="center">
      {requests && (

        <Box
          className="request-result"
          sx={{
            display: "flex",
            direction: "row",
            alignItems: "center",
            flexWrap: "wrap",
            alignContent: "center",
          }}
        >
          {requests.map((request, index) => (
            <Card
              key={request.user_info.request_id}
              className="request"
              sx={[styledCard]}
              style={{
                
                backgroundColor: index % 2 ? "#f5f8ff" : "#eef3ff",
              }}
            >
            
               
              <Box
                sx={{
                  bgcolor: "background.paper",
                  color: "#305f82",
                }}
                style={{
                  backgroundColor: index % 2 ? "#f5f8ff" : "#eef3ff",
                }}
              >
                <Box sx={{ my: 2, mx: 1 }}>
                  <Grid container border="1px" alignItems="center">
                    <Grid item xs>
                      <Typography sx={{ m: 1 }} variant="h4" component="div">
                        Request Information: #{request.user_info.request_id}
                      </Typography>
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                  <Typography
                    sx={{ m: 1 }}
                    color="text.secondary"
                    variant="body2"
                  >
              {dayjs(request.user_info.date_time).format("MMMM D, YYYY h:mm A")}
                  </Typography>
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
                    <ListItemText
                      primary={`${request.user_info.first_name} ${request.user_info.last_name}`}
                      secondary={request.user_info.email}
                    />
                  </ListItem>
                </Box>
                <Divider variant="middle" />
                {/* Animals Info */}
                {request.animals_info.map((animal) => (
                  <div key={animal.id}>
                    <Stack spacing={1} direction="row">
                      <Typography
                        marginLeft="10px"
                        fontWeight="bold"
                        variant="h5"
                      >
                        Animal Name:{" "}
                      </Typography>
                      <Typography variant="h5">{animal.animal.name}</Typography>
                    </Stack>
                  </div>
                ))}
                <Box>
                  {/* EDIT BUTTON */}
                  <IconButton
                    sx={{ m: 1 }}
                    onClick={() =>
                      handleEditClick(request.user_info.request_id)
                    }
                    // Pass the userInfo object to handleEditClick
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<EditNoteIcon />}
                    >
                      Edit
                    </Button>
                  </IconButton>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
