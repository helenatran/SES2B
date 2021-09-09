import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import "./Login.css";
import { Container, Row, Col, Button, Form, Label, Image } from "react-bootstrap";
import Loading from '../Utils/Loading.js'
import login from '../Assets/login.jpg'
import Logo from '../Assets/Logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';

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

      <div>
        <div className="App">
          {/* <div className="Home-header"> */}
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

                <div className="App">
                  <Container fluid >
                    <Row  > <Image style={{ height: '15%', width: '15%', paddingLeft: '3%', paddingTop: '2%' }} src={Logo} fluid /></Row>
                    <Row class="col-margin" justify-content-md-center className="position " >
                      <Col className="m-auto col1-padding" ><Image src={login} fluid /></Col>


                      {/* md = {{offset:1}}  */}
                      <Col className="m-auto col2-padding ">

                        <Form onSubmit={this.handleLogin}>
                          <h1 class="form-heading">Welcome Back!</h1>
                          <div class="form-text mb-3">Log in with your organisation username and password to begin.</div>
                          <Form.Group className="mb-4 form-input-headers " controlId="formBasicEmail">

                            <Form.Label >Email</Form.Label>

                            <Form.Control
                              style={{ background: "#F5F5F5 0% 0% no-repeat padding-box", opacity: "1", border: "10px", height: "64px" }}
                              class=" form-input pr-5 "
                              size="lg"
                              autoFocus
                              required
                              placeholder="name@student.uts.edu.au"
                              name="email"
                              type="email"
                              value={this.state.email} // Appending the value to the state
                              onChange={this.handleChange} // Calls the funcion that handles the validation check
                            />
                          </Form.Group>
                          <Form.Group className="mb-4 form-input-headers" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              style={{ background: "#F5F5F5 0% 0% no-repeat padding-box", opacity: "1", border: "10px", height: "64px" }}
                              size="lg"
                              autoFocus
                              required
                              placeholder="..............."
                              name="password"
                              type="password"
                              value={this.state.password} // Appending the value to the state
                              onChange={this.handleChange} // Calls the funcion that handles the validation check
                            />
                          </Form.Group>
                          <Container>
                            <Row>
                              <Button className="button btn-lg" type="submit">
                                Login
                              </Button>
                              <Col>2 of 2</Col>
                            </Row>
                          </Container>
                        </Form>
                      </Col>
                    </Row>
                  </Container>
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
          {/* </div> */}
        </div>
      </div>
    )
  }
}

export default withRouter(Login);
