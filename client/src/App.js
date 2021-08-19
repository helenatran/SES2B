import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//Importing Components
import Login from "./Components/Login.js";
import Account from "./Components/Account.js";
import Home from "./Components/Home.js";
import AuthError from "./Errors/AuthError.js";



class App extends Component {
  // Simple 3 page React Router Setup
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/home">
            <Home />
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
