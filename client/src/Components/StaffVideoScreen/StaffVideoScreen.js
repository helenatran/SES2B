import React, { useState } from "react";
import "./StaffVideoScreen.css";
import profilepic from "../../Assets/profilepic.png";
import { Card, Button, Container, Stack, Row, Col } from "react-bootstrap";

const mockStudents = [
  { firstName: "John", lastName: "Smith", videoSrc: profilepic },
  { firstName: "John", lastName: "Smith", videoSrc: profilepic },
  { firstName: "John", lastName: "Smith", videoSrc: profilepic },
  { firstName: "John", lastName: "Smith", videoSrc: profilepic },
  { firstName: "John", lastName: "Smith", videoSrc: profilepic },
  { firstName: "John", lastName: "Smith", videoSrc: profilepic },
];

const mockExam = {
  name: "Software Studio 2B - Final Exam",
  date: "1st October 2021 - 2:00 PM",
  duration: "2.5",
};

const StaffVideoScreen = () => {
  const [students, setStudents] = useState([]);
  const [exam, setExam] = useState({
    name: "",
    date: "",
    duration: "",
  });

  React.useEffect(() => {
    setStudents(mockStudents);
    setExam(mockExam);
  });

  return (
    <div className="App">
      <Stack>
        <div className="bg-light border">
          <div className="exam-title">
            {exam.name} | {exam.date} | {exam.duration} Hours
          </div>
        </div>
        <div className="bg-light border students-cards">
          {students.map((student) => (
            <Card className="student-card">
              <Card.Img
                className="student-video"
                variant="top"
                src={student.videoSrc}
                alt="student-video"
              />
              <Card.Body className="student-details">
                <div className="student-name">
                  {student.firstName} {student.lastName}
                </div>
                <Button variant="outline-danger" className="flag-button">
                  Flag
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>

        <div className="bottom-stack">
          <Container fluid>
            <Row className="row">
              <Col className="col1">
                <div className="time-left">Time left: 1:59:35</div>
              </Col>
              <Col className="col2">
                <Button variant="danger" className="end-recording-button">
                  End Recording
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </Stack>
    </div>
  );
};

export default StaffVideoScreen;
