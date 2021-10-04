import React, { Component } from "react";
import "./Pre-examChecklist1.css";
import {
  Container,
  Row,
  Col,
  Button,
 
  Image,
} from "react-bootstrap";
import PlaceHolderImage from "../Assets/profile.png";

class PreExamChecklist1 extends Component {
  render(
  
  ) {
    return (
      <div className="App ">
        <Container fluid>
          <Row>
            <Col>
              <div className="column1-contents ">
                <h1>Pre-Exam Checklist</h1>
                <ul class="blackCheck">
                  <li>
                    <p className="li-bold">Examinee Identification</p>
                  </li>
                  <li>
                    <p className="li-bold">Object detection</p>
                  </li>
                  <li>
                    <p className="li-bold">Start exam</p>
                  </li>
                </ul>
                <p>
                  Adjust your camera so full face can be seen then click
                  continue.
                </p>
              </div>
            </Col>

            <Col className="  col2 ">
              <div class="column2-contents ">
                <Image className="PlaceHolderImage" src={PlaceHolderImage} />

                <div class="padding-top-button">
                  <Button
                    style={{ height: "60px" }}
                    className="  button-startExam"
                  >
                    Continue
                  </Button>
                  <div class="go-back-link">
                    <a>Go back</a>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default PreExamChecklist1;
