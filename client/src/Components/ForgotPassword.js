import React, { Component } from "react";
import "./ForgotPassword.css";
import axios from "axios";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ImagePW from "../Assets/forgotpw.jpg";
import { Link } from "react-router-dom";
import Logo from "../Assets/Logo.png";

class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      showError: false,
      messageFromServer: "",
      showNullError: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendEmail = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    if (email === "") {
      this.setState({
        showError: false,
        messageFromServer: "",
        showNullError: true,
      });
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3003/forgotPassword",
          {
            email,
          }
        );
        console.log(response.data);
        if (response.data === "recovery email sent") {
          this.setState({
            showError: false,
            messageFromServer: "recovery email sent",
            showNullError: false,
          });
        }
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data === "email not in db") {
          this.setState({
            showError: true,
            messageFromServer: "",
            showNullError: false,
          });
        }
      }
    }
  };

  render() {
    const { messageFromServer, showNullError, showError } = this.state;

    return (
      <div className="App">
        <Container fluid style={{ marginRight: "50%" }}>
          <Row>
            {" "}
            <Image
              style={{
                height: "15%",
                width: "15%",
                paddingLeft: "3%",
                paddingTop: "2%",
              }}
              src={Logo}
              fluid
            />
          </Row>
          <Row
            class="col-margin"
            justify-content-md-center
            className="position "
          >
            <Col className="m-auto col1-padding">
              <Image src={ImagePW} fluid style={{ marginLeft: "20%" }} />
            </Col>
            <Col className="m-auto col2-padding ">
              <Form onSubmit={this.handleLogin}>
                <h1 class="form-heading">Trouble Logging In?</h1>
                <div class="form-text mb-5">
                  We just need your registered email address to send you a
                  password reset email.
                </div>
                <Form.Group
                  className="mb-4 form-input-headers "
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email Address </Form.Label>
                  <Form.Control
                    style={{
                      background: "#F5F5F5 0% 0% no-repeat padding-box",
                      opacity: "1",
                      border: "10px",
                      height: "60px",
                    }}
                    class=" form-input pr-5 "
                    size="lg"
                    autoFocus
                    required
                    placeholder="name@student.uts.edu.au"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChange("email")}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-5 form-input-headers"
                  controlId="formBasicPassword"
                ></Form.Group>
                <Row className="align-items-center" style={{ margin: "0px" }}>
                  <Button
                    style={{ height: "50px", width: "200px" }}
                    className="button"
                    type="submit"
                  >
                    Send Email Link
                  </Button>
                  <Button
                    style={{ marginLeft: "2%", height: "50px", width: "200px" }}
                    className="button"
                    // type="submit"
                  >
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Login Page
                    </Link>
                  </Button>
                </Row>
              </Form>
              {showNullError && (
                <div>
                  <p>The email address cannot be null.</p>
                </div>
              )}
              {showError && (
                <div>
                  <p>
                    That email address isn&apos;t recognized. Please try again
                    or register for a new account.
                  </p>
                </div>
              )}
              {messageFromServer === "recovery email sent" && (
                <div>
                  <h3>Password Reset Email Successfully Sent!</h3>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ForgotPassword;
