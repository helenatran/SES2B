import React, { useState, useEffect } from "react";
import "./Modal.css";
import { Link } from "react-router-dom";

function Modal(props) {
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    setModalOpen(true);
  }, [props.triggerModal]);

  async function handleClick() {
    var user = null;
    var examAllocation = null;
    var examDetails = "";

    await fetch("users/get-current-user")
      .then((response) => response.json())
      .then((data) => {
        user = data.id_number;
      });
    
    await fetch("exam_allocation/get-exam-allocations-by-user/" + user)
      .then((response) => response.json())
      .then((data) => {
        examAllocation = data[0];
      });
    
    await fetch("/exam/get-exam/" + examAllocation.exam_id)
      .then((response) => response.json())
      .then((data) => { 
        examDetails = data;
      });

    var currentTime = new Date().toISOString();

    fetch("exam_allocation/write-end-time/" + user + "/" + examDetails.exam_id, {
      method: "PATCH",
      headers: {
        "Contents-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "ended_at": currentTime
        }
      )
    })
      .then(res => res.json())
      .then((res) =>{
        console.log(res);
        window.location.href="/home";
      },
      (err) => {
        console.log(err);
      });
    };

  return (
    <div>
      {modalOpen && (
        <div>
          <div className="modalContainer">
            <div className="titleCloseBtn">
              <button
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                X
              </button>
            </div>
            <div className="title">
              <h1 style={{ fontSize: "1.8rem", marginBottom: "5%" }}>
                Leave This Exam?
              </h1>
              <div className="body">
                <p>
                  If you wish to proceed, answers will be submitted and cannot
                  be changed any further.
                </p>
              </div>
            </div>
            <div className="footer">
              <button
                style={{ backgroundColor: "#FF4B4B", color: "white" }}
                onClick={() => {
                  setModalOpen(false);
                }}
                id="cancelBtn"
              >
                Cancel
              </button>
              {/* Need to link it to dashboard when it is merged */}
              <button
                style={{ backgroundColor: "#28DDA0", color: "white" }}
                onClick={() => {
                  setModalOpen(false);
                  handleClick();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
