import React, { Component } from "react";
import "./StudentDashboard.css";
import {
  Container,
  Row,
  Col,
  Button,
  Popover,
  OverlayTrigger,
  Table
} from "react-bootstrap";
import dayjs from "dayjs";
import { Link, withRouter } from "react-router-dom";

class RecordingsDashboard extends Component {
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

    await fetch("/exam/get-exam/" + this.state.examAllocation.exam_id)
      .then((response) => response.json())
      .then((data) => this.setState({ examDetails: data, loading: false }));
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
                <h1>Assessed Exams</h1>
                <br />
                <br />
                <Table borderless>
  <thead>
    <tr>
      <th>Exam</th>
     
    </tr>
  </thead>
  <tbody>
    <tr>
      <Link to="/home"> <td>Engineering Economics & Finance </td></Link>
    </tr>
    <tr>
    <Link to="/home"> <td>Network Fundamentals</td></Link>
    </tr>
    <tr>
    <Link to="/home"> <td>Network Fundamentals Supplementary</td></Link>
    </tr>
  </tbody>
</Table>
                <br />
              </div>
            </Col>
            <Col className=" col1 ">
              <div className="column1-contents ">
                <h1>Upcoming Exams</h1>
                <br />
                <br />
                <Table borderless>
  <thead>
    <tr>
      <th>Exam</th>
     
    </tr>
  </thead>
  <tbody>
    <tr>
    <Link to="/home"> <td>Engineering Economics & Finance </td></Link>
    </tr>
    <tr>
    <Link to="/home"> <td>Engineering Economics & Finance </td></Link>
    </tr>
    <tr>
    <Link to="/home"> <td>Engineering Economics & Finance </td></Link>
    </tr>
  </tbody>
</Table>
                {/* <h2>Name</h2>
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
                </p> */}
                <br />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default RecordingsDashboard;
