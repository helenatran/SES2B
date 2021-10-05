import React, { useState } from "react";
import StudentCard from "./StudentCard";

const StudentsCards = ({
  students,
  slideNumber,
  studentsPerSlide,
  updateZoomView,
}) => {
  const indexOfLastStudent = slideNumber * studentsPerSlide;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerSlide;
  const [currentStudents] = useState(
    students.slice(indexOfFirstStudent, indexOfLastStudent)
  );

  return (
    <div className="bg-light border students-cards">
      {currentStudents.map((student) => (
        <StudentCard
          student={student}
          updateZoomView={updateZoomView}
          isInZoomView={false}
        />
      ))}
    </div>
  );
};

export default StudentsCards;
