//Required Imports for Modules
import React, { Component } from 'react';
import './Navbar.css';
import { Link, withRouter } from "react-router-dom";

//Importing Assets
import logo from "../Assets/logoA.png";
import enter from "../Assets/enter.svg";
import follow from "../Assets/follow.svg";
import profile from "../Assets/profile.png";

class Navbar extends Component {
  constructor(props) {
    super(props);
    //Binding function to the context of the class
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {
    console.log(event); //Currently for development purposes
    const url = "/users/logout";
    var postBody = {};
    const requestMetadata = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postBody)
    }
    fetch(url, requestMetadata)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.props.history.push('/login'); //Redirect after logout from app
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      );
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="Cluster">
          <Link to="/home">
            <img src={logo} className="App-logo-left" alt="Atlas Logo" />
          </Link>
          <nav>
            <Link to="/signup">
              <img src={follow} className="App-logo" alt="Sign Up"/>
            </Link>
            {/* <Link to="/account">
              <img src={follow} className="App-logo" alt="Account" />
            </Link> */}
            <Link to="/StudentProfile">
              <img src={profile} className="App-logo" alt="Student Profile"/>
            </Link>
            <Link to="/login">
              <img src={enter} className="App-logo" alt="about"/>
            </Link>            
            <img
              src={enter}
              className="App-logo"
              alt="Logout"
              onClick={this.handleLogout} //Calling the logout function which also handles the redirect
            />
          </nav>
        </div>

      </div>
    );
  }
}

export default withRouter(Navbar);
