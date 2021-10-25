import React, { useState } from "react";
import { io } from "socket.io-client";
import "./StaffVideoScreen.css";
import { Button, Container, Stack, Row, Col, Carousel } from "react-bootstrap";
import StudentsCards from "./Sub-Components/StudentCards";
import StudentCard from "./Sub-Components/StudentCard";
import { useParams } from "react-router";

const VIDEO_ENDPOINT = "/video";

const mockExam = {
  name: "Software Studio 2B - Final Exam",
  date: "1st October 2021 - 2:00 PM",
  duration: "2.5",
};

const StaffVideoScreen = () => {
  const { examId } = useParams();
  const [students, setStudents] = useState([]);
  const [exam] = useState(mockExam);
  const [zoomView, setZoomView] = useState(false);
  const [zoomedStudent, setZoomedStudent] = useState({
    firstName: "",
    lastName: "",
    videoSrc: "",
    id: 0,
  });
  // Request and listen to webcam frames being sent from server
  React.useEffect(() => {
    const socket = io(VIDEO_ENDPOINT);
    let prevExamFrames = {};
    socket.emit("request-webcam-frames", examId);
    socket.on("send-frames", (serverExamFrames) => {
      setStudents(() => {
        // Merge with previous set of frames, so that skipped frames don't make feeds disappear temporarily
        const examFrames = {
          ...prevExamFrames,
          ...serverExamFrames,
        };
        const students = Object.entries(examFrames).map(([userId, frame]) => ({
          id: userId,
          firstName: `Student ${userId}`,
          lastName: "",
          videoSrc: frame,
        }));
        prevExamFrames = examFrames;
        return students;
      });
      setZoomedStudent((student) => ({
        ...student,
        videoSrc: serverExamFrames[student.id] || student.videoSrc,
      }));
    });
    return () => {
      socket.close();
    };
  }, [examId]);

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
    <div className="App">
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
              examId={examId}
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
                  examId={examId}
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
