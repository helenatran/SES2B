import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment-timezone";
import "./StudentDashboard.css";
import "./recordingsDashboard.css";
import { Container, Row, Col, Table, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const RecordingsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [pastExams, setPastExams] = useState([]);

  React.useEffect(async () => {
    await fetch("exam/get-exams")
      .then((response) => response.json())
      .then((results) => {
        var hasPast = results.filter((result) =>
          moment(result.date_time, "DD/MM/YYYY")
            .locale("en-au")
            .isBefore(moment(), "day")
        );
        var upcoming = results.filter((result) =>
          moment(result.date_time, "DD/MM/YYYY")
            .locale("en-au")
            .isAfter(moment(), "day")
        );
        setUpcomingExams(upcoming);
        setPastExams(hasPast);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Spinner animation="border" role="status" className="spinner">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div className="App ">
      <Container fluid>
        <Row>
          <Col className="col-admin-dashboard">
            <div className="col-content">
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
                  {pastExams.map((exam) => {
                    return (
                      <tr key={exam.exam_id}>
                        <Link
                          to={{
                            pathname: "/ExaminerRecordings",
                            state: {
                              examId: exam.exam_id,
                            },
                          }}
                        >
                          {exam.exam_name}
                        </Link>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <br />
            </div>
          </Col>
          <Col className="col-admin-dashboard">
            <div className="col-content">
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
                  {upcomingExams.map((exam) => {
                    return (
                      <tr key={exam.exam_id}>
                        <Link
                          to={{
                            pathname: "/ExaminerRecordings",
                            state: {
                              examId: exam.exam_id,
                            },
                          }}
                        >
                          {exam.exam_name}
                        </Link>
                      </tr>
                    );
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
};

export default RecordingsDashboard;
