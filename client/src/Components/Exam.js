import React, { Component, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Stack,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import Iframe from "react-iframe";
import "./Exam.css";
import Badge from "react-bootstrap/Badge";
import { io } from "socket.io-client";
import StudentWebcam from "./StudentWebcam.js";

import Modal from "./Modal";
// var misconductAlert = 0;

function Exam() {
  const [modalOpen, setModalOpen] = useState(false);
  const [triggerModal, setTriggerModal] = useState(true);
  const MISCONDUCT_ENDPOINT = "/misconduct";
  const [misconductAlert, setMisconductAlert] = useState("0");
  const [userId, setuserId] = useState("0");
  const [examId, setExamId] = useState("");

  const popover = (
    <Popover class="popover" id="popover-basic">
      {/* <Popover.Header as="h3">Popover right</Popover.Header> */}
      <Popover.Body>
        <strong>
          Having trouble during the exam? or exam details are incorrect?{" "}
        </strong>
        <hr /> Contact instructor on <br /> xx xxxx xxxx
      </Popover.Body>
    </Popover>
  );

  React.useEffect(() => {
    const socket = io(MISCONDUCT_ENDPOINT);
    fetch("/users/user_id")
      .then((res) => res.json())
      .then((user) => {
        socket.emit("start-listening", user.id);
        socket.on("misconduct", (data) => {
          // Sukhpreet do what you need here
          setMisconductAlert(data);
        });
      });

    fetch("users/get-current-user")
      .then((res) => res.json())
      .then((data) => {
        setuserId(data.id_number);
        fetch("exam_allocation/get-exam-allocations-by-user/" + userId)
          .then((response) => response.json())
          .then((data) => {
            setExamId(data[0].exam_id);
          })
          .catch(() => {
            setExamId("123123123232");
          });
      })
      .catch(() => {
        return <h1>Loading...</h1>;
      });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col className="Sidebar" sm={2}>
          <Stack gap={4} className="mx-auto">
            <StudentWebcam examId={userId} userId={examId} />

            <div className="timer-text">
              Time Left: 00:00:00{" "}
            </div>
            <hr />
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
              <Button
                style={{ height: "50px" }}
                className="help-button buttons"
                type="submit"
              >
                Request Help
              </Button>
            </OverlayTrigger>
            <Button
              style={{ height: "50px" }}
              className="leave-button buttons"
              type="submit"
              onClick={() => {
                setTriggerModal(!triggerModal);
                setModalOpen(true);
              }}
            >
              Leave Exam
            </Button>
            <Button variant="outline-danger" disabled>
              Misconduct Alert <Badge bg="danger">{misconductAlert} </Badge>
              <span className="visually-hidden">misconduct alerts</span>
            </Button>
          </Stack>
        </Col>
        <Col style={{ position: "relative" }} className="Exam-colour" sm={10}>
          <Iframe
            style={{ height: "100%", width: "100%" }}
            url="https://canvas.uts.edu.au/courses/16320/quizzes/19649"
            sandbox="allow-same-origin allow-scripts allow-forms"
            width="100%"
            height="100%"
            display="initial"
            position="relative"
          ></Iframe>
          <div style={{ position: "absolute", top: "21%", left: "30%" }}>
            {modalOpen && <Modal triggerModal={!triggerModal} />}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default Exam;
