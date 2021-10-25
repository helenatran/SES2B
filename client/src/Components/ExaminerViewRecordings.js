import React, { useState } from "react";
import { Button, Container, Col, Spinner } from "react-bootstrap";
import { Link, useHistory, withRouter } from "react-router-dom";
import "./ExaminerViewRecordings.css";

const ExaminerViewRecordings = (props) => {
  let history = useHistory();
  const exam_id = props.location.state.examId;

  const [exam, setExam] = useState({
    exam_name: "",
    date_to_display: "",
  });
  const [examAllocations, setExamAllocations] = useState([
    {
      _id: "",
      exam_id: "",
      user_id: "",
      warnings: 0,
      user_fullName: "",
    },
  ]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      // Fetch the current exam
      await fetch("/exam/get-exam/" + exam_id)
        .then((response) => response.json())
        .then((exam) => {
          setExam(exam);
        });

      // Fetch all the exam allocations for the given exam
      await fetch("/exam_allocation/get-exam-allocations-by-exam/" + exam_id)
        .then((response) => response.json())
        .then(async (examAllocations) => {
          let updatedExamAllocations = [];
          const examAllocationsMapping = examAllocations.map(
            async (examAllocation) => {
              await fetch("/users/get-user-by-id/" + examAllocation.user_id)
                .then((response) => response.json())
                .then((user) => {
                  // Update exam allocations information to contain the student name
                  updatedExamAllocations = [
                    ...updatedExamAllocations,
                    {
                      ...examAllocation,
                      user_fullName: user.first_name + " " + user.last_name,
                    },
                  ];
                });
            }
          );
          await Promise.all(examAllocationsMapping).then(() => {
            setExamAllocations(updatedExamAllocations);
          });
        });

      setLoading(false);
    };
    fetchData();
  }, []);

  const handleBackToDashboard = () => {
    history.push("/adminDashboard");
  };

  if (loading) {
    return (
      <Spinner animation="border" role="status" className="spinner">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Container fluid>
      <div className="row">
        <div className="col-lg-1 col-centered">
          <div className="title">
            <h1>{exam.exam_name}</h1>
            <h2> {exam.date_to_display}</h2>
          </div>
          <Col className=" col " style={{ padding: "3%" }}>
            <div className="column-contents ">
              {examAllocations.map((examAllocation) => (
                <div key={examAllocation._id}>
                  <h1 style={{ font: "bold 25.5px/34px Montserrat" }}>
                    {examAllocation.user_fullName}
                  </h1>
                  <h2
                    style={{
                      font: "bold 13.5px/18px Montserrat",
                      color: "black",
                    }}
                  >
                    {examAllocation.warnings} Misconduct
                    {examAllocation.warnings > 1 ? " Alerts" : " Alert"}
                  </h2>
                  <Link
                    to={{
                      pathname: "/view-recording",
                      state: {
                        studentName: examAllocation.user_fullName,
                        misconducts: examAllocation.warnings,
                        exam: exam,
                      },
                    }}
                  >
                    <h2
                      style={{
                        font: "bold 13.5px/18px Montserrat",
                        color: "black",
                        textDecoration: "underline",
                      }}
                    >
                      View Recordings
                    </h2>
                  </Link>
                  <br />
                  <hr />
                </div>
              ))}
              <Button
                className="back-button"
                variant="light"
                onClick={handleBackToDashboard}
              >
                Back to dashboard
              </Button>
            </div>
          </Col>
        </div>
      </div>
    </Container>
  );
};
export default withRouter(ExaminerViewRecordings);
