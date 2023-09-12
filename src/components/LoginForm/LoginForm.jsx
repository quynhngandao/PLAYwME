import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
/***** MUI ******/
import { Container, Button, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography } from "@mui/material";
/***** FUNCTION *****/
export default function LoginForm() {
  // useState
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // useSelector
  const errors = useSelector((store) => store.errors);
  // useDispatch
  const dispatch = useDispatch();

  // handle login action 
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

  const handleGuest = ( event) => {
    event.preventDefault();
    setUsername("guest")
    setPassword('123')
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
  }

/***** RENDER ******/
  return (
    <div className="">
    <Container color="#4e8897" component="main" justifyContent="center" verticalAlign="middle">
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
        <Grid container justifyContent="center" maxWidth="300">
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
                mx: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              
              }}
            >
              <Typography component="h1" variant="h4">
                Login
              </Typography>
               {/* FORM INPUT FIELDs */}
              <Box component="form" noValidate onSubmit={login} sx={{mt:2, mx:2}}>
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
                {/* LOG IN BUTTON */}
                <Box sx={{ textAlign: "center" , my:1}}>
                <Button
                  name="submit"
                  value="Log In"
                  type="submit"
           
                  alignItems="center"
                  variant="contained"
                  sx={{ mb: 2 }}
                >
                  Login
                </Button>
                </Box>

                <Grid container>
                  <Grid item xs>
                    <Link  value="Log In"
                  type="submit" onClick={handleGuest} variant="body2">
                     Log in as Guest?
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
    </div>
  );
}
