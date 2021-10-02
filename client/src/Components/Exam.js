import React, { useState } from "react";
import { Container, Row, Col, Image, Button, Stack } from "react-bootstrap";
import Iframe from "react-iframe";
import profilepic from "../Assets/profilepic.png";
import "./Exam.css";
import Modal from "./Modal.js";
import Timer from "react-compound-timer";

const Exam = () => {
  const initialExamState = {
    exam_id: null,
    exam_name: "",
    exam_duration: "",
    exam_url: "",
    exam_instructions: ""
  };
  const [exam, setExam] = useState(initialExamState);
  const id = document.URL.substring(document.URL.lastIndexOf('/') + 1);
  console.log(id);
  console.log(exam);

  if (exam.exam_id == null) {
      fetch('/exam/get-exam/' + id)
      .then(res => res.json())
      .then((result) => {
        setExam(result);
      })
  }
 
  const examCompleted = () => {
    console.log("Exam completed")
  }
  
  const [modalOpen, setModalOpen] = useState(false);
  const [triggerModal, setTriggerModal] = useState(true);
  const timeleft = exam.exam_duration * 3600000;
  console.log(timeleft);

  if (timeleft === 0) {
    return (
      <div>
        Exam not loaded.
      </div>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col className="Sidebar" sm={2}>
          <Stack gap={4} className="mx-auto">
            <Image src={profilepic} fluid /* Replace with live video */ />
            <div className="timer-text">Time Left:&nbsp;
              <Timer formatValue={(value) => `${(value < 10 ? `0${value}` : value)} `}
                initialTime={timeleft}
                direction="backward"
                startImmediately="true"
                checkpoints={[
                  {
                      time: 300000,
                      callback: () => console.log('5 minutes left'),
                  },
                  {
                      time: 0,
                      callback: () => examCompleted(),
                  }
              ]}
              >
                {() => (
                  <React.Fragment>
                    <Timer.Hours formatValue={value => `${value}:`}/>
                    <Timer.Minutes formatValue={value => `${value}:`} />
                    <Timer.Seconds />
                  </React.Fragment>
                )}
              </Timer>
            </div>
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
          <Stack gap={1} style={{ height: "100vh"}}>
            <div className="exam-name">
              {exam.exam_name}
            </div>
            <div className="exam-instructions">
              Instructions: {exam.exam_instructions}
            </div>
            <Iframe
              style={{ height: "100%", width: "100%" }}
              url={exam.exam_url}
              sandbox="allow-same-origin allow-scripts allow-forms"
              width="100%"
              height="100%"
              display="initial"
              position="relative"
            ></Iframe>
          </Stack>
          <div style={{ position: "absolute", top: "21%", left: "30%" }}>
            {modalOpen && <Modal triggerModal={!triggerModal} />}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default Exam;
