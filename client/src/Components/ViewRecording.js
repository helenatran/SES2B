import React from "react";
import "./ViewRecording.css";

import { withRouter, useHistory } from "react-router-dom";

import { Button, Stack, Card, Badge } from "react-bootstrap";
import { XLg } from "react-bootstrap-icons";

//To be replaced with recording once that is completed
import videoSrc from "../Assets/profilepic.png";

const ViewRecording = (props) => {
  let history = useHistory();

  const studentName = props.location.state.studentName;
  const examName =
    props.location.state.exam.exam_name +
    " - Final Exam | " +
    props.location.state.exam.date_time;
  const misconducts = props.location.state.misconducts;

  const handleClose = () => {
    history.push({
      pathname: "/ExaminerRecordings",
      state: { examId: props.location.state.exam.exam_id },
    });
  };

  return (
    <div className="App">
      <Stack>
        <div className="bg-light border">
          <div className="exam-title">{examName}</div>
        </div>
        <div className="bg-light border recording-view-card">
          <Card>
            <Card.Img
              className="recording"
              variant="top"
              src={videoSrc}
              alt="student-recorded-video"
            />
            <Button className="misconduct" variant="outline-danger" disabled>
              Misconducts <Badge bg="danger">{misconducts}</Badge>
            </Button>
            <Card.Body className="student-details">
              <div className="student-name">{studentName}</div>
            </Card.Body>
            <XLg className="x-icon" onClick={handleClose} />
          </Card>
        </div>
      </Stack>
    </div>
  );
};

export default withRouter(ViewRecording);
