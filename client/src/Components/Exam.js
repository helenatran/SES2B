import React, { Component, useState } from "react";
import { Container, Row, Col, Image, Button, Stack } from "react-bootstrap";
import Iframe from "react-iframe";
import profilepic from "../Assets/profilepic.png";
import "./Exam.css";
import Modal from "./Modal";

function Exam() {
  const [modalOpen, setModalOpen] = useState(false);
  const [triggerModal, setTriggerModal] = useState(true);
  return (
    <Container fluid>
      <Row>
        <Col className="Sidebar" sm={2}>
          <Stack gap={4} className="mx-auto">
            <Image src={profilepic} fluid /* Replace with live video */ />
            <div className="timer-text">Time Left: 00:00:00</div>
            <hr />
            <Button
              style={{ height: "50px" }}
              className="help-button buttons"
              type="submit"
            >
              Request Help
            </Button>
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
