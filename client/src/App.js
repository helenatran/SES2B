// Global bootstrap CSS import
import "bootstrap/dist/css/bootstrap.min.css";

import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Importing Components
import Navbar from "./Components/Navbar.js";
import Login from "./Components/Login.js";
import SignUp from "./Components/Register.js";
import WebcamTest from "./Components/WebcamTest.js";
import Home from "./Components/Home.js";

class App extends Component {
  // Simple 3 page React Router Setup
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/webcam-test">
            <WebcamTest />
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
