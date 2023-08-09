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
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

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
  }; // end registerUser

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
              <Typography component="h1" variant="h4">
                Create Account
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={registerUser}
                sx={{ mt: 1 }}
              >
                <Stack spacing={2} direction="row" alignItems="baseline">
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
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  name="submit"
           
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
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
