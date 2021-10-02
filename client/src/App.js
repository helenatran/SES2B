// Global bootstrap CSS import
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Importing Components
import Navbar from "./Components/Navbar.js";
import Login from "./Components/Login.js";
import StudentWebcam from "./Components/StudentWebcam.js";
import SpyOnStudents from "./Components/SpyOnStudents.js";
import Account from "./Components/Account.js";
import Home from "./Components/Home.js";
import StudentProfile from "./Components/StudentProfile.js";
import AuthError from "./Errors/AuthError.js";
import ForgotPassword from "./Components/ForgotPassword.js";

class App extends Component {
  // Simple 3 page React Router Setup
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/forgotpassword">
            <ForgotPassword />
          </Route>
          <Route path="/StudentProfile">
            <StudentProfile />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/webcam-test">
            <StudentWebcam
              examId="TEST_EXAM_ID"
              userId={Math.floor(Math.random() * 1000)}
            />
          </Route>
          <Route path="/spy-on-students-test">
            <SpyOnStudents examId="TEST_EXAM_ID" />
          </Route>
          <Route path="/autherr">
            <AuthError />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
