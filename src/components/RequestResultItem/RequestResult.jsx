import { useSelector, useDispatch } from "react-redux";
import React from "react";
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

const styledCard = {
  width: "100%",
  minWidth: 300,
  maxHeight: 600,
  borderRadius: 3,
  boxShadow: 3,
  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
  color: (theme) => (theme.palette.mode === "dark" ? "grey.200" : "grey.500"),
};

export default function RequestResult({ request }) {
  const user = useSelector((store) => store.user);
  const requests = useSelector((store) => store.requests);
  const favorite = useSelector((store) => store.favorite);
  const editRequest = useSelector((store) => store.editRequest);

  const dispatch = useDispatch();
  const history = useHistory();

  // handleEdit
  const handleEditClick = (requestId) => {
    console.log("Edit clicked for requestId:", requestId);
    // Dispatch the action to set editRequest with the specific request data
    dispatch({
      type: "SET_EDIT_REQUEST",
      payload: {
        id: requestId,
        first_name: request.user_info.first_name,
        last_name: request.user_info.last_name,
        email: request.user_info.email,
        date_time: request.user_info.date_time,
      },
    });
    history.push("/edit");
  };

  return (
    <>
      {requests && (
        <Box className="requests" display="flex">
          <Stack spacing={6} direction="row">
            {requests.map((request) => (
              <Card
                key={request.user_info.id}
                className="request"
                sx={styledCard}
              >
                <Box
                  sx={{
                    bgcolor: "background.paper",
                    color: "#305f82",
                  }}
                >
                  <Box sx={{ my: 2, mx: 1 }}>
                    <Grid container border="1px" alignItems="center">
                      <Grid item xs>
                        <Typography sx={{ m: 1 }} variant="h4" component="div">
                          Request Information
                        </Typography>
                      </Grid>
                      <Grid item></Grid>
                    </Grid>
                    <Typography
                      sx={{ m: 1 }}
                      color="text.secondary"
                      variant="body2"
                    >
                      {request.user_info.date_time}
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
                  <Box>
                    {/* EDIT BUTTON */}
                    <IconButton
                      sx={{ m: 1 }}
                      onClick={() => handleEditClick(request.user_info.id)}
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
          </Stack>
        </Box>
      )}
    </>
  );
}
