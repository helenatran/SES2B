import React, { Component } from 'react';
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import "./FaceDetect.css";
// import {WebCamera} from "../Utils/WebCamera" -> Put this in a utils class 


const MODEL_URL = './models';
const container = document.createElement('div');
const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
};

let img;
let canvas;

let test = null

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL)
]).then(start);

class FaceDetect extends Component ({test}) {
    constructor(props) {
        super(props);
        this.state = {
            boxColor: "",
            canvas: null,
            facesDetected: 0,
            outcome: 0,
            screenshot: null,
            showScreenshotButton: true,
            user_id: "",
            faceSuccess: null
        };
        this.faceDetection = this.faceDetection.bind(this); //TODO - convert to arrow function
    }

    componentDidMount() {
        fetch('/users/user_id')
            .then(res => res.json())
            .then(user_id => this.setState({user_id: user_id.user_id}))
    }

    toggle = () => this.setState(() => ({showScreenshotButton: false}));
    setRef = webcam => {
        this.webcam = webcam;
    };
    stopWebCameraStream = () => {
        let stream = this.webcam.video.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(track => track.stop());
        this.webcam.video.srcObject = null;
    };
    capture = () => {
        this.setState({screenshot: this.webcam.getScreenshot()});
        this.stopWebCameraStream();
    };


    faceDetection = async () => {
        const labeledFaceDescriptors = await loadLabelImages(this.state.user_id);
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

        let b64 = await fetch(this.state.screenshot); //TODO - Double check fetch purpose
        let blob = await b64.blob();

        img = await faceapi.bufferToImage(blob);
        img.style.position = 'absolute';
        img.style.left = '18.7%'
        img.style.bottom = '-5%'
        container.append(img);

        const displaySize = {
            width: img.width,
            height: img.height
        };

        canvas = faceapi.createCanvasFromMedia(img);
        canvas.style.position = 'absolute';
        canvas.style.left = '18.7%'
        canvas.style.bottom = '-5%'
        container.append(canvas);

        faceapi.matchDimensions(canvas, displaySize);
        const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors(); //TODO - could remove this
        this.setState({facesDetected: detections.length});
        document.body.append(detections.length + ": Face(s)");

        const resizeDetections = faceapi.resizeResults(detections, displaySize);
        const results = resizeDetections.map(d => faceMatcher.findBestMatch(d.descriptor)); // TODO - Check this
        results.forEach((result, i) => {
            this.setState({outcome: Math.round(Object.values(result)[1] * 100) / 100});

            if(this.state.outcome <= faceMatcher.distanceThreshold) {
                this.state.boxColor = "green";
            }else{
                this.state.boxColor = "red";
            }

            const box = resizeDetections[i].detection.box;
            const drawBox = new faceapi.draw.DrawBox(box, {label: result.toString(), boxColor: this.state.boxColor});
            drawBox.draw(canvas);
        });
        document.body.append(container);

        if(this.state.outcome <= faceMatcher.distanceThreshold && detections.length !== 0) {
            this.setState({faceSuccess: true})
        }else{
            this.setState({faceSuccess: false})
        }
    };

    render(){
        return(
        <div>
            <div className="exam-container">
                <Webcam
                    audio={false}
                    height={200}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={220}
                    videoConstraints={videoConstraints}
                    border-radius="25px"
                />
                <div className="vertical-center">
                    <br/>
                    <br/>
                    {this.state.showScreenshotButton && <button className="button-continue" 
                    style={{ width: "220px", borderRadius: "5px" }}
                    onClick={(e) => {
                        e.preventDefault();
                        this.toggle();
                        this.capture();
                        this.faceDetection()}}>
                        Capture Image {this.state.showScreenshotButton}
                    </button>}
                    {!this.state.showScreenshotButton &&
                        <div>
                            <button className="button-continue" 
                            style={{ width: "220px", borderRadius: "5px", color: "white" }}
                            onClick={(event) => {
                                event.preventDefault();
                                document.location.reload();}}>
                            Retake Image</button>
                        </div>
                    }
                </div>
            </div>
        </div>
        )
    }
}

async function start() {
}

let loadLabelImages = (user_id) => {
    const labels = [user_id];
    const descriptions = [];
    return Promise.all(labels.map(async label => {
       for(let i = 1; i <= 1; i++){
           const img = await faceapi.fetchImage(`https://res.cloudinary.com/ddf9aci82/image/upload/v1632402873/students/${label}/${1}.jpg`);
           const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
           descriptions.push(detections.descriptor)
       }
       return new faceapi.LabeledFaceDescriptors(label, descriptions)
    }))
};

export default FaceDetect;
