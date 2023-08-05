import { useSelector, useDispatch } from "react-redux";
import React from "react";
import {
  Box,
  Card,
  IconButton,
  Chip,
  Button,
  Stack,
  Divider,
  Typography,
  Grid,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CardMedia,
  CardContent,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ExpandItem from "./ExpandItem";
import { useEffect } from "react";

const styledCard = {
  width: "100%",
  maxWidth: 400,
  maxHeight: 600,
  borderRadius: 3,
  boxShadow: 3,
  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
  color: (theme) => (theme.palette.mode === "dark" ? "grey.200" : "grey.500"),
};

export default function RequestResult() {
  const user = useSelector((store) => store.user);
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  console.log("requests", requests);
  useEffect(() => {
    dispatch({ type: "FETCH_REQUESTS" });
  }, []);

  return (
    <>
      {requests && (
        <Box className="requests" display="flex">
          <Stack spacing={5} direction="row">
            {requests?.map((request) => (
              <Card key={request.id} className="request" sx={styledCard}>
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
                      {request.user_info.playtime}
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
                        primary={request.user_info.first_name}
                        secondary={request.user_info.email}
                      />
                    </ListItem>
                  </Box>
                  <Divider variant="middle" />
                  <Box>
                    {/* EDIT BUTTON */}
                    <IconButton sx={{ m: 1 }}>
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
