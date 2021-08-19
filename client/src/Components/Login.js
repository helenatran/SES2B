import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import "./Login.css";

class Login extends Component {
	constructor(props){
    super(props);
    // Data to be submitted and used need to be states to 
    // ensure we don't reload the page every time there is a state change 
    this.state = {
      users: [],
      errorMessage: false,
      email: '',
      password: '',
      validForm: false,
      loading: true,
			loginStatus: false
    };

    //Required, else the functions don't work, javascript nuances
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

	handleLogin(event) {
    console.log(event); //Currently for development purposes
    const url = "/users/handle-login";
    var postBody = {
      email: this.state.email,
			password: this.state.password
    };
    const requestMetadata = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(postBody)
    }
    fetch(url, requestMetadata)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
					this.props.history.push('/home');
          this.setState({ loginStatus: result });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      );
			// .then(() => this.props.history.push('/home'));
    event.preventDefault();
  }

  handleChange(event) {
    //Checking if the user input is not empty, pre-handles
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
    if (this.state.email && this.state.email > 0 && this.state.password && this.state.password){
      this.setState({validForm: true});
    }
    else{
      this.setState({validForm: false});
    }
  }

	render() {
		return (
			<div className="App">
        <div className="Home-header">
          <form onSubmit={this.handleLogin}>
            <input
              autoFocus
							required
              placeholder="Email"
              name="email"
              type="email"
              value={this.state.email} // Appending the value to the state
              onChange={this.handleChange} // Calls the funcion that handles the validation check
            />
						<input
              autoFocus
							required
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password} // Appending the value to the state
              onChange={this.handleChange} // Calls the funcion that handles the validation check
            />
            <button type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
			)
		}
	}
	
export default withRouter(Login);