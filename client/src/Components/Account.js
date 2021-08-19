import React, { Component } from "react";
import "./Account.css";

// importing functional components
import Navbar from './Navbar.js';

// importing assets


class Account extends Component {
	// Placeholder code for Account page
	// Used during setup of react-router
	render(){
		return(
			<div>
				<Navbar />
				<div className="App-header">
					This is the Account page
				</div>
			</div>
		)
	}
}
	
export default Account;