//Required Imports for Modules
import React, { Component } from 'react';

import './Navbar.css';
import { Link } from "react-router-dom";

//Importing Assets
import logo from "../TeamLogo.png";
import enter from "../Assets/enter.svg";
import follow from "../Assets/follow.svg";
import profile from "../Assets/profile.png";

class Navbar extends Component {
  
  componentDidMount() {
    //use for fetch statements here
  }

  render() {
    return (
      <div>
        <div className="Cluster">
          <Link to="/home">
            <img src={logo} className="App-logo-left" alt="logo"/>
          </Link>
          <nav>
            <Link to="/signup">
              <img src={follow} className="App-logo" alt="Sign Up"/>
            </Link>
            <Link to="/StudentProfile">
              <img src={profile} className="App-logo" alt="Student Profile"/>
            </Link>
            <Link to="/login">
              <img src={enter} className="App-logo" alt="about"/>
            </Link>
          </nav>
        </div>

      </div>
    );
  }
}


export default Navbar;
