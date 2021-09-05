import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import "./Login.css";
import { Button, Form } from "react-bootstrap";
import Loading from '../Utils/Loading.js'

class Login extends Component {
  constructor(props) {
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postBody)
    }
    fetch(url, requestMetadata)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({ loginStatus: result.loginStatus });
          console.log(this.state.loginStatus);
          //If else block is for validation, if logged in then push to home, else display the error message
          if (this.state.loginStatus) {
            this.props.history.push('/home');
          }
          else {
            this.setState({ errorMessage: true });
          }
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

  handleChange(event) {
    //Checking if the user input is not empty, pre-handles
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
    if (this.state.email > 0 && this.state.password > 0) {
      this.setState({ validForm: true });
    }
    else {
      this.setState({ validForm: false });
    }
  }

  componentDidMount() {
    fetch('/users/login-status')
      .then(res => res.json())
      .then(status => this.setState({ status }))
      .then(loading => this.setState({ loading: false })); //disables the loading spinner
  }

  render() {
    return (
      <div className="App">
        <div className="Home-header">
          {this.state.loading ? (
            // This is an inline if statement from react -> 
            // https://reactjs.org/docs/conditional-rendering.html
            <Loading Loading={this.state.loading} />
          ) : (
            <div>
              {/* 
                Handles logon states and returns the auth error 
                page if user is not logged in, else returns the 
                home screen
              */}
              {this.state.status ? (
                //This is also another inline if statement
                <div>{this.props.history.push('/home')}</div> //Pushing to error page if user not logged in
              ) : (
                <div>
                  <Form onSubmit={this.handleLogin}>
                    <Form.Control
                      autoFocus
                      required
                      placeholder="Email"
                      name="email"
                      type="email"
                      value={this.state.email} // Appending the value to the state
                      onChange={this.handleChange} // Calls the funcion that handles the validation check
                    />
                    <Form.Control
                      autoFocus
                      required
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={this.state.password} // Appending the value to the state
                      onChange={this.handleChange} // Calls the funcion that handles the validation check
                    />
                    <Button type="submit">
                      Login
                    </Button>
                  </Form>
                  {this.state.errorMessage ? (
                    //This is also another inline if statement to show the error message if the state is set to true
                    <div>We encountered an error when processing your details! Please try again...</div>
                  ) : (
                    null
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Login);
