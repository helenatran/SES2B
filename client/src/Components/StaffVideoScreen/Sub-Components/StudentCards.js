import React from "react";
import StudentCard from "./StudentCard";

const StudentsCards = ({
  students,
  examId,
  slideNumber,
  studentsPerSlide,
  updateZoomView,
}) => {
  const indexOfLastStudent = slideNumber * studentsPerSlide;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerSlide;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  return (
    <div className="bg-light border students-cards">
      {currentStudents.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          examId={examId}
          updateZoomView={updateZoomView}
          isInZoomView={false}
        />
      ))}
    </div>
  );
};

export default StudentsCards;
