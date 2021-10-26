import React, { Component } from "react";
import "./StudentDashboard.css";
import {
  Container,
  Row,
  Col,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import dayjs from "dayjs";

class StudentDashboard extends Component {
  state = {
    loading: true,
    user: null,
    examAllocation: null,
    examDetails: "",
  };

  async componentDidMount() {
    await fetch("users/get-current-user")
      .then((response) => response.json())
      .then((data) => this.setState({ user: data.id_number, loading: false }));

    await fetch(
      "exam_allocation/get-exam-allocations-by-user/" + this.state.user
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({ examAllocation: data[0], loading: false })
      );

    if (this.state.examAllocation) {
      await fetch("/exam/get-exam/" + this.state.examAllocation.exam_id)
        .then((response) => response.json())
        .then((data) => this.setState({ examDetails: data, loading: false }));
    }
  }

  render(
    popover = (
      <Popover class="popover" id="popover-basic">
        <Popover.Body>
          <strong>
            Having trouble starting the exam? or exam details are incorrect?{" "}
          </strong>
          <hr /> Contact instructor on <br /> xx xxxx xxxx
        </Popover.Body>
      </Popover>
    )
  ) {
    if (this.state.loading || !this.state.examAllocation) {
      return <div>loading...</div>;
    }

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
                <p class="p-bold">{this.state.examDetails.exam_name}</p>
                <br />
                <h2>Time</h2>
                <p class="p-bold date">
                  {dayjs(this.state.examAllocation.started_at).format(
                    "DD MMM YYYY - h:mm A"
                  )}
                </p>
                <br />
                <h2>Duration</h2>
                <p class="p-bold">
                  {this.state.examDetails.exam_duration} hours
                </p>
                <br />
                <div class="padding-top-button1">
                  <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={popover}
                  >
                    <Button
                      style={{ height: "60px" }}
                      className="  button-requestHelp"
                    >
                      Request Help
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
            </Col>

            <Col xs={7}>
              <div class="column2-contents">
                <h2>Instructions</h2>
                <p>{this.state.examDetails.exam_instructions}</p>
                <div class="padding-top-button2">
                  <Button
                    style={{ height: "60px" }}
                    className="  button-startExam"
                  >
                    <a href="/exam"> Start Exam</a>
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
