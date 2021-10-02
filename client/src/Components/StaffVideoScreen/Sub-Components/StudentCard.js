import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { ExclamationTriangleFill, XLg } from "react-bootstrap-icons";

const StudentCard = ({ student, updateZoomView, isInZoomView }) => {
  const [flag, setFlag] = useState(false);

  const handleFlag = () => {
    setFlag(flag ? false : true);
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
        {flag && (
          <ExclamationTriangleFill className="exclamation-triangle" size={25} />
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
