import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { ExclamationTriangleFill, XLg } from "react-bootstrap-icons";

const StudentCard = ({ student, updateZoomView, isInZoomView }) => {
  const [flagCount, setFlagCount] = useState(0);

  const handleFlag = () => {
    if (flagCount === 0) {
      setFlagCount(1);
    } else if (flagCount === 1) {
      setFlagCount(2);
      alert(
        student.firstName +
          " " +
          student.lastName +
          "'s exam has been terminated!"
      );
    }
  };

  const handleCardClick = () => {
    updateZoomView(true, student);
  };

  const handleCloseZoomView = () => {
    updateZoomView(false, student);
  };

  return (
    <Card
      className={isInZoomView ? "zoom-student-card" : "student-card"}
      key={student.id}
    >
      <div>
        <Card.Img
          className={isInZoomView ? "zoom-student-video" : "student-video"}
          variant="top"
          src={student.videoSrc}
          alt="student-video"
          onClick={handleCardClick}
        />
        {(flagCount == 1 || flagCount == 2) && (
          <ExclamationTriangleFill className="exclamation-triangle" size={25} />
        )}
        {flagCount == 2 && (
          <ExclamationTriangleFill
            className="second-exclamation-triangle"
            size={25}
          />
        )}
        {isInZoomView && (
          <XLg className="x-icon" onClick={handleCloseZoomView} />
        )}
      </div>
      <Card.Body className="student-details">
        <div className="student-name">
          {student.firstName} {student.lastName}
        </div>
        <Button
          variant="outline-danger"
          className="flag-button"
          onClick={handleFlag}
        >
          Flag
        </Button>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;
