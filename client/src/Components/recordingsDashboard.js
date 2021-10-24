import React, { Component } from "react";
import moment from 'moment';
import 'moment-timezone';
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
    upcomingExams:[],
    pastExams:[]
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

    await fetch(
      "exam/get-exams"
    )
      .then(response => response.json())
      .then(results => 
        { 
          var hasPast = results.filter(result => moment(result.date_time,"DD/MM/YYYY").locale('en-au').isBefore(moment(), "day"));
          var upcoming = results.filter(result => moment(result.date_time,"DD/MM/YYYY").locale('en-au').isAfter(moment(), "day"));
          this.setState({upcomingExams: upcoming, pastExams: hasPast, loading: false})
        }
      )

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
                    { this.state.pastExams.map(exam => {
                      return (
                        <tr>
                          <Link to="/home"> <td>{exam.exam_name}</td></Link>
                        </tr>
                      )
                    })}
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
                  { this.state.upcomingExams.map(exam => {
                      return (
                        <tr>
                          <Link to="/home"> <td>{exam.exam_name}</td></Link>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
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
