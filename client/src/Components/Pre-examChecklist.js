import React, { useEffect, useState, useRef } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./Pre-examChecklist.css";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import PlaceHolderImage from "../Assets/profile.png";
import Loading from '../Utils/Loading.js'
import { useHistory } from "react-router";

function PreExamChecklist() {
  const [isFaceRecognitionSuccesful, setIsFaceRecognitionSuccesful] = useState(false);
  const [isObjectDetectionClear, setIsObjectDetectionClear] = useState(false);
  const [model, setModel] = useState();
  const [loading, setLoading] = useState(true);
  const [continueText, setContinueText] = useState("Identify Me")

  // Webcam stuff
  const webcamRef = React.useRef(null);
  const [videoWidth, setVideoWidth] = useState(960);
  const [videoHeight, setVideoHeight] = useState(640);

  const videoConstraints = {
    height: 640,
    width: 760,
    facingMode: "environment",
  };

  const history = useHistory();

  async function loadModel() {
    try {
      const model = await cocoSsd.load();
      setModel(model);
      console.log("set loaded Model");
      setLoading(false);
    } 
    catch (err) {
      console.log(err);
      console.log("failed load model");
    }
  }

  useEffect(() => {
    tf.ready().then(() => {
      loadModel();
    });
  }, []);

  async function predictionFunction() {
    //Clear the canvas for each prediction
    var cnvs = document.getElementById("myCanvas");
    var ctx = cnvs.getContext("2d");
    ctx.clearRect(0,0, webcamRef.current.video.videoWidth,webcamRef.current.video.videoHeight);
    //Start prediction
    const predictions = await model.detect(document.getElementById("img"));
    if (predictions.length > 0) {
      for (let n = 0; n < predictions.length; n++) {
        if (predictions[n].score > 0.7) {
          //Threshold is 0.8 or 80%
          //Extracting the coordinate and the bounding box information
          let bboxLeft = predictions[n].bbox[0];
          let bboxTop = predictions[n].bbox[1];
          let bboxWidth = predictions[n].bbox[2];
          let bboxHeight = predictions[n].bbox[3] - bboxTop;
          //Drawing begin
          ctx.beginPath();
          ctx.font = "28px Arial";
          ctx.fillStyle = "red";
          ctx.fillText(predictions[n].class +": " + Math.round(parseFloat(predictions[n].score) * 100) + "%", bboxLeft,bboxTop);
          ctx.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
          ctx.strokeStyle = "#FF0000";
          ctx.lineWidth = 3;
          ctx.stroke();
        }
        return predictions
      }
    }
    else {
      return "Nothing Detected"
    }
  }

  const onContinueClick = (e) => {
    if (!isFaceRecognitionSuccesful){
      // TODO: Check if face recognition is successful
      setIsFaceRecognitionSuccesful(true);
      setContinueText("Check Surroundings")
    }
    else {
      if (!isObjectDetectionClear) {
        predictionFunction().then(res => {
          if (res === "Nothing Detected"){
            setIsObjectDetectionClear(true);
            setContinueText("Start Exam")
          }
          else{
            res.forEach(obj => {
              if (obj.class == "cell phone"){
                window.alert("Please remove your cell phone and rescan your surroundings")
              }
            })
            if (res.filter(obj => obj.class === "cell phone").length === 0){
              setIsObjectDetectionClear(true);
              setContinueText("Start Exam")
            }
          }
        })
      }
      else{
        history.push("/exam")
      }
    }
  };

  const onClickGoBack = (e) => {
    setIsFaceRecognitionSuccesful(false)
    setIsObjectDetectionClear(false)
  };

  return (
    <div className="App ">
      <Container fluid>
        <Row>
          <Col className="col-sm-4"> 
            <div className="column1-contents ">
              <Loading Loading={loading} />
              <h1>Pre-Exam Checklist</h1>
              {/* If both face rec and object detection pass */}
              {isFaceRecognitionSuccesful && isObjectDetectionClear ? (
                <ul className="blackCheck objFaceGreenCheck greenCheck">
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
              ) : ( isFaceRecognitionSuccesful ? (
                  <ul className="blackCheck greenCheck">
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
                ) : (
                <ul className="blackCheck">
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
              ))}
              
              <p>
                Ensure all non permitted items for the exam are removed from
                your surroundings.
                <br /> These include mobile phones, textbooks etc.
                <br />
                <br />
                {/* <b> Once you click continue, exam will start.</b> */}
              </p>
            </div>
          </Col>

          <Col className="  col2 ">
            <div className="column2-contents ">
              {isFaceRecognitionSuccesful && !isObjectDetectionClear ? (
                <div style={{height:" 640px"}}>
                  <div style={{position: "absolute", top: "100px", left: "40%"}}>
                    <Webcam
                      audio={false}
                      id="img"
                      ref={webcamRef}
                      screenshotQuality={1}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                    /> 
                  </div>
                  <div style={{position: "absolute", top: "100px", left: "40%", zIndex: "9999" }}>
                    <canvas
                    id="myCanvas"
                    width={videoWidth}
                    height={videoHeight}
                    style={{ backgroundColor: "transparent" }}
                    />
                  </div>
                </div>
              ):(
                <Image className="PlaceHolderImage" src={PlaceHolderImage} />
              )}

              <div className="padding-top-button">
                <Button
                  style={{ height: "60px", width: "fit-content" }}
                  className="  button-continue"
                  onClick={(e) => onContinueClick(e)}
                >
                  {continueText}
                </Button>
                <div className="go-back-link">
                  <a onClick={(e) => onClickGoBack(e)}>Go back</a>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default PreExamChecklist;
