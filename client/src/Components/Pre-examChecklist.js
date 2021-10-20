import React, { Component } from "react";
import "./Pre-examChecklist.css";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import PlaceHolderImage from "../Assets/profile.png";
import FaceDetect from "./FaceDetect";

class PreExamChecklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFaceRecognitionSuccesful: false,
    };
  }

  onContinueClick = () => {
    this.setState({
      isFaceRecognitionSuccesful: true,
    });
    // if (this.state.isFaceRecognitionSuccesful){
    //   this.props.history.push("/exam")
    // }
  };

  onClickGoBack = () => {
    this.setState({
      isFaceRecognitionSuccesful: false,
    });
  };

  // checkLoginSuccess = (loginOutcome) => {

  //   this.setState({isFaceRecognitionSuccesful: loginOutcome})
  //   console.log("isFaceRecognitionSuccesful: " + this.state.isFaceRecognitionSuccesful)
  // }


  render() {
    return this.state.isFaceRecognitionSuccesful ? (
      <div className="App ">
        <Container fluid>
          <Row>
            <Col>
              <div className="column1-contents ">
                <h1>Pre-Exam Checklist</h1>
                <ul class="blackCheck greenCheck">
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
                  Ensure all non permitted items for the exam are removed from
                  your surroundings.
                  <br /> These include mobile phones, textbooks etc.
                  <br />
                  <br />
                  <b> Once you click continue, exam will start.</b>
                </p>
              </div>
            </Col>

            <Col className="col2 ">
              <div class="column2-contents ">
                <Image className="PlaceHolderImage" src={PlaceHolderImage} />

                <div class="padding-top-button">
                  <Button
                    style={{ height: "60px" }}
                    className="  button-continue"
                    onClick={this.onContinueClick}
                  >
                    Continue
                  </Button>
                  <div class="go-back-link">
                    <a onClick={this.onClickGoBack}>Go back</a>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    ) : (
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
                  continue. Please ensure there is good lighting for face 
                  detection system to recognise your face.
                </p>
                <FaceDetect/>
                {/* <FaceDetect checkLoginSuccess={this.checkLoginSuccess()}/> */}
              </div>
            </Col>

            <Col className="  col2 ">
              <div class="column2-contents ">
                <Image className="PlaceHolderImage" src={PlaceHolderImage} />

                <div class="padding-top-button">
                  <Button
                    onClick={this.onContinueClick}
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

export default PreExamChecklist;
