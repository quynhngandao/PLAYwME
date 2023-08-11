import { useSelector, useDispatch } from "react-redux";
import React from "react";
import dayjs from "dayjs";
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
  ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import PetsIcon from "@mui/icons-material/Pets";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { Dayjs } from "dayjs";

const styledCard = {
  width: "100%",
  maxWidth: 330,
  minHeight: 330,
  borderRadius: 5,
  boxShadow: 2,
  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
  color: (theme) => (theme.palette.mode === "dark" ? "grey.200" : "grey.500"),
  m: 3,
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

  const colors = [
    "#ebeefc",
    "#fbe2dd",
    "#ecf6f2",
    "#f6ecf0",
    "#e4f3fa",
    "#ffefd3",
    "#fefef4",
    "#ecf2f9",
  ];

  return (
    <Box alignContent="center">
      {requests && (
        <Box
          className="request-result"
          sx={{
            display: "flex",
            direction: "row",
            // alignItems: "center",
            flexWrap: "wrap",
            alignContent: "stretch",
            justifyContent: "center",
          }}
        >
          {requests.map((request, index) => (
            <Card
              key={request.user_info.request_id}
              className="request"
              sx={[styledCard]}
              style={{
                backgroundColor: colors[index % colors.length],
              }}
            >
              <Box
                sx={{
                  bgcolor: "background.paper",
                  color: "#305f82",
                }}
                style={{
                  backgroundColor: colors[index % colors.length],
                }}
              >
                <Box sx={{ my: 2, mx: 1 }}>
                  <Grid container border="1px" alignItems="center">
                    <Grid item xs>
                      <Typography
                        sx={{
                          m: 1,
                          fontFamily: "varela round",
                          fontWeight: "800",
                          fontSize: "1.3em",
                        }}
                        variant="h4"
                        component="div"
                      >
                        Request #{request.user_info.request_id}
                      </Typography>
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                  <Typography
                    sx={{ m: 1, fontFamily: "varela round", fontWeight: "500" }}
                    color="text.secondary"
                    variant="body2"
                  >
                    {dayjs(request.user_info.date_time).format(
                      "MMMM D, YYYY h:mm A"
                    )}
                  </Typography>
                </Box>
                <Divider variant="middle" />
                <Box>
                  <ListItem sx={{ ml: 1 }}>
                    <ListItemAvatar>
                      <AccountCircleIcon
                        sx={{ width: 45, height: 45, verticalAlign: "middle" }}
                      />
                      {/* <Avatar ><img src={"images/dog1.png"}/></Avatar> */}
                    </ListItemAvatar>
                    <ListItem sx={{ p: 0, ml: 1 }}>
                      <ListItemText
                        primary={`${request.user_info.first_name} ${request.user_info.last_name}`}
                        secondary={request.user_info.email}
                      />
                    </ListItem>
                  </ListItem>
                </Box>
                <Divider variant="middle" />
                {/* Animals Info */}
                {request.animals_info.map((animal) => (
                  <ListItem sx={{ ml: 2 }}>
                    <ListItemAvatar>
                      <PetsIcon
                        sx={{ width: 30, height: 30, verticalAlign: "middle" }}
                      />
                    </ListItemAvatar>
                    <ListItem sx={{ py: 0, px: 0 }} key={animal.id}>
                      <ListItemText
                        primary={`${animal.animal.name}`}
                      ></ListItemText>
                    </ListItem>
                  </ListItem>
                ))}
                <Divider variant="middle" />

                <Grid
                  sx={{
                    display: "flex",
                    direction: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
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
                      sx={{
                        fontFamily: "varela round",
                        fontSize: ".5em",
                        fontWeight: "900",
                        borderRadius: "10px",
                        padding: "10px",
                        color: "primary",
                      }}
                      startIcon={<EditNoteIcon />}
                    >
                      Update
                    </Button>
                  </IconButton>
                  <FilterVintageIcon
                    sx={{ width: 30, height: 30, verticalAlign: "middle" }}
                  />
                  {/* DELETE BUTTON */}
                  <IconButton
                    sx={{ mx: 1 }}
                    onClick={() => {
                      dispatch({
                        type: "DELETE_REQUEST",
                        payload: request.user_info.request_id,
                      });
                    }}
                    // Pass the userInfo object to handleEditClick
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        fontFamily: "varela round",
                        fontSize: ".5em",
                        fontWeight: "900",
                        borderRadius: "10px",
                        padding: "10px",
                        color: "primary",
                      }}
                      startIcon={<DeleteOutlineRounded />}
                    >
                      Delete
                    </Button>
                  </IconButton>
                </Grid>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
