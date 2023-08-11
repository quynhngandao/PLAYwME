import { Container, Button, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (
    <Container color="#4e8897" component="main" maxWidth="lg">
      {errors.loginMessage && (
        <Typography variant="h5" className="alert" role="alert">
          {errors.loginMessage}
        </Typography>
      )}
      <Box
        sx={{
          marginTop: 8,
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
                Login
              </Typography>
              <Box component="form" noValidate onSubmit={login} sx={{mt:1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  type="username"
                  name="username"
                  autoComplete="username"
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
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  name="submit"
                  value="Log In"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link  variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                  <Link href='#/registration' variant="body2">
                      {"Don't have an account? Sign Up"}
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
