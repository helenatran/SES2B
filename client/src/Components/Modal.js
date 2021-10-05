import React, { useState, useEffect } from "react";
import "./Modal.css";
import { Link } from "react-router-dom";

function Modal(props) {
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    setModalOpen(true);
  }, [props.triggerModal]);

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
              <Link  to="/Home"> 
              <button
                style={{ backgroundColor: "#28DDA0", color: "white" }}
                onClick={() => {
                  setModalOpen(false);
                 
                }}
              >
                Confirm
              </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
