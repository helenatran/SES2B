import React, { Component } from "react";
import "./StudentDashboard.css";
import { Container, Row, Col, Button } from "react-bootstrap";

class StudentDashboard extends Component {
  render() {
    return (
      <div className="App ">
        <Container fluid>
          <Row>
            <Col className=" col1 ">
              <div className="column1-contents ">
                <h1>Exam Details</h1>
                <br />
                <br />

                <h2>Name</h2>

                <p class = "p-bold">Software Studio - Final Exam</p>
                <br />
                <h2>Time</h2>
                <p class = "p-bold">1st October 2021 - 2PM</p>
                <br />
                <h2>Duration</h2>
                <p class = "p-bold">2.5 hrs</p>
                <br />
                <div class="padding-top-button1">
                  <Button
                    style={{ height: "60px" }}
                    className="  button-requestHelp"
                  >
                    Request Help
                  </Button>
                </div>
              </div>
            </Col>

            <Col xs={7}>
            <div class="column2-contents">
            <h2>Instructions</h2>
            <p>This is the instructions for the exam from the tutor</p>
            <div class="padding-top-button2">
            <Button
                    style={{ height: "60px" }}
                    className="  button-startExam"
                  >
                    Start Exam
                  </Button>
                  </div>
            </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default StudentDashboard;
