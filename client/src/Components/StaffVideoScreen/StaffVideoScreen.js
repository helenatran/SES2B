import React, { useState } from "react";
import "./StaffVideoScreen.css";
import profilepic from "../../Assets/profilepic.png";
import { Button, Container, Stack, Row, Col, Carousel } from "react-bootstrap";
import StudentsCards from "./Sub-Components/StudentCards";
import StudentCard from "./Sub-Components/StudentCard";

const mockStudents = [
  { firstName: "John", lastName: "Smith", videoSrc: profilepic, id: 1 },
  { firstName: "Sarah", lastName: "Smith", videoSrc: profilepic, id: 2 },
  { firstName: "Marc", lastName: "Smith", videoSrc: profilepic, id: 3 },
  { firstName: "Marie", lastName: "Smith", videoSrc: profilepic, id: 4 },
  { firstName: "Fred", lastName: "Smith", videoSrc: profilepic, id: 5 },
  { firstName: "Susan", lastName: "Smith", videoSrc: profilepic, id: 6 },
  { firstName: "Carl", lastName: "Smith", videoSrc: profilepic, id: 7 },
  { firstName: "Jennifer", lastName: "Smith", videoSrc: profilepic, id: 8 },
  { firstName: "Paul", lastName: "Smith", videoSrc: profilepic, id: 9 },
  { firstName: "Laura", lastName: "Smith", videoSrc: profilepic, id: 10 },
  { firstName: "Max", lastName: "Smith", videoSrc: profilepic, id: 11 },
];

const mockExam = {
  name: "Software Studio 2B - Final Exam",
  date: "1st October 2021 - 2:00 PM",
  duration: "2.5",
};

const StaffVideoScreen = () => {
  const [students, setStudents] = useState(mockStudents);
  const [exam, setExam] = useState(mockExam);
  const [zoomView, setZoomView] = useState(false);
  const [zoomedStudent, setZoomedStudent] = useState({
    firstName: "",
    lastName: "",
    videoSrc: "",
    id: 0,
  });
  const STUDENTS_PER_SLIDE = 6;
  const numberOfSlides = [];

  for (let i = 1; i <= Math.ceil(students.length / STUDENTS_PER_SLIDE); i++) {
    numberOfSlides.push(i);
  }

  const handleZoomView = (zoomView, student) => {
    setZoomView(zoomView);
    setZoomedStudent(student);
  };

  return (
    <div className="staff-video-screen">
      <Stack>
        <div className="bg-light border">
          <div className="exam-title">
            {exam.name} | {exam.date} | {exam.duration} Hours
          </div>
        </div>
        {zoomView ? (
          <div className="bg-light border zoom-view">
            <StudentCard
              student={zoomedStudent}
              isInZoomView={true}
              updateZoomView={handleZoomView}
            />
          </div>
        ) : (
          <Carousel indicators={false} interval={null}>
            {numberOfSlides.map((i) => (
              <Carousel.Item key={i}>
                <StudentsCards
                  students={students}
                  slideNumber={i}
                  studentsPerSlide={STUDENTS_PER_SLIDE}
                  updateZoomView={handleZoomView}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        )}
        <div className="bottom-stack">
          <Container fluid>
            <Row className="row">
              <Col className="staff-video-screen-col1">
                <div className="time-left">Time left: 1:59:35</div>
              </Col>
              <Col className="staff-video-screen-col2">
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
