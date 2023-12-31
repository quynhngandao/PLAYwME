import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
// Import styling
import Nav from "../Nav/Nav";
import "./App.css";
// Import protected route
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
// Import pages
import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import AnimalsPage from "../AnimalsPage/AnimalsPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import RequestPage from "../RequestPage/RequestPage";
import ThankYouPage from "../ThankYouPage/ThankYouPage";
import EditRequest from "../EditRequest/EditRequest";
import AllAnimalsPage from "../AnimalsPage/AllAnimalsPage";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>
          <Route
            // shows AllAnimalsPage at all times (logged in or not)
            exact
            path="/display"
          >
            <AllAnimalsPage />
          </Route>


          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
           <ProtectedRoute
            // logged in shows AnimalsPage else shows LoginPage
            exact
            path="/petfinder"
          >
            <AnimalsPage />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            //  logged in shows shows UserRequestPage else shows LoginPage
            exact
            path="/review"
          >
            <RequestPage />
          </ProtectedRoute>

         

          <ProtectedRoute
            //  logged in shows shows ThankYouPage else shows LoginPage
            exact
            path="/thankyou"
          >
            <ThankYouPage />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows Edit Route
            exact
            path="/edit"
          >
            <EditRequest />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id? (
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // redirect them to the /petfinder
              <Redirect to="/petfinder" />
            ) : (
             <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /petfinder
              <Redirect to="/petfinder" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
