
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
/***** MUI *****/
import {
  Container,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Stack,
} from "@mui/material";
/***** FUNCTION ******/
export default function RegisterForm() {
  // useState
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // useSelector
  const errors = useSelector((store) => store.errors);
  // useDispatch
  const dispatch = useDispatch();
  // useHistory
  const history = useHistory()

  // handle registeruser action 
  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
        first_name: firstName,
        last_name: lastName,
        email: email,
      },
    });

     history.push("/petfinder"); // Redirect to /petfinder
   }; // end registerUser
/***** RENDER *****/
  return (
    <Container component="main" maxWidth="lg">
      {errors.registrationMessage && (
        <Typography variant="h5" className="alert" role="alert">
          {errors.registrationMessage}
        </Typography>
      )}
      <Box
        sx={{
          marginTop: 6,
        }}
      >
        <Grid container justifyContent="center">
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 6,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h4" >
              Create Your Account
                 
              </Typography>
              {/* REGISTRATION FORM INPUT FILED */}
              <Box 
                 component="form"
                noValidate
                onSubmit={registerUser}
                sx={{ m: 1, mt:3}}
              > 
                <Stack spacing={2} direction="row" alignItems="baseline" sx={{mb:2}}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="username"
                    type="username"
                    name="username"
                    autoFocus
                    onChange={(event) => setUsername(event.target.value)}
                    value={username}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Stack>
                <Stack spacing={2} direction="row" alignItems="baseline">
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="First Name"
                    type="text"
                    id="first-name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="Last Name"
                    type="text"
                    id="last-name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </Stack>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  type="text"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Remember me"
                />
                {/* REGISTRATION BUTTON */}
                <br/>
                <Box sx={{ textAlign: "center"}}>
                <Button
                  name="submit"
                  type="submit"
                  halfWidth
                  alignItems="center"
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                >
                  Sign Up
                </Button>
                </Box>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link href="#/login" variant="body2">
                      {"Already have an account? Login"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
