import React, { Component } from "react";
import "./AuthError.css";

// Importing router components
import { Link } from "react-router-dom";

//importing assets
import gandalf from "../Assets/gandalf.png";

class AuthError extends Component {

	render() {
		return (
			//Used to render the error page with the imagine of gandalf, change at will
			//Also contains a button for the user to return to login screen
			<div className="Auth-header">
				<img src={gandalf} alt="You shall not pass!" />
				<Link to="/login">
					<button>Go Back to Login</button>
				</Link>
			</div>
		)
	}
}

export default AuthError;
