import React, { Component } from 'react';
import * as faceapi from "face-api.js";

import Webcam from "react-webcam";
const WebcamComponent = () => <Webcam />;

const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
};

const MODEL_URL = './models';
const container = document.createElement('div');

let img
let canvas

const mystyle = {
    body: "0px",
    padding: "0px",
    width: "100vw",
    height: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    zIndex: -1
};

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL), //detect where characters face is
    faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL)
]).then(start)

class FaceDetect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            canvas: null,
            screenshot: null

        };
        this.imageUpload = this.imageUpload.bind(this);
    }

    setRef = webcam => {
        this.webcam = webcam;
    };

    capture = () => {
        this.setState({screenshot: this.webcam.getScreenshot()});
    };


    imageUpload = async event => {
        if(img) img.remove();
        if(canvas) canvas.remove();

        const labeledFaceDescriptors = await loadLableImages();
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

        let b64 = await fetch(this.state.screenshot);
        let blob = await b64.blob();

        img = await faceapi.bufferToImage(blob);
        img.style.position = 'absolute';
        container.append(img);

        canvas = faceapi.createCanvasFromMedia(img);
        canvas.style.position = 'absolute';
        container.append(canvas);

        const displaySize = {
            width: img.width,
            height: img.height
        };

        faceapi.matchDimensions(canvas, displaySize);
        this.setState({image: img});
        const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
        document.body.append(detections.length);
        const resizeDetections = faceapi.resizeResults(detections, displaySize);
        const results = resizeDetections.map(d => faceMatcher.findBestMatch(d.descriptor));
        results.forEach((result, i) => {
            const box = resizeDetections[i].detection.box;
            const drawBox = new faceapi.draw.DrawBox(box, {label: result.toString()});
            drawBox.draw(canvas)
        });
        document.body.append(container)
    };

    render(){
        return(
        <div className={mystyle}>
            <div className="webcam-container">
                <Webcam
                    audio={false}
                    height={200}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={220}
                    videoConstraints={videoConstraints}
                />
                <button onClick={(e) => {
                    e.preventDefault();
                    this.capture()
                    this.imageUpload()}
                }>capture screenshot</button>
            </div>
            {/*<body>*/}
            {/*    <input*/}
            {/*        accept="image/*"*/}
            {/*        className="input"*/}
            {/*        id="icon-button-file"*/}
            {/*        type="file"*/}
            {/*        onChange={this.imageUpload}*/}
            {/*    />Chooose File*/}
            {/*</body>*/}
        </div>
        )
    }
}

async function start() {
    document.body.append('Loaded');
}

function loadLableImages(){
    const labels = ['NickTest'];
    const descriptions = [];
    return Promise.all(labels.map(async label => {
       for(let i = 1; i <= 1; i++){
           const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/Nickg1995/image-upload/main/labeled_images/${label}/${i}.jpg`)
           const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
           descriptions.push(detections.descriptor)
       }
       return new faceapi.LabeledFaceDescriptors(label, descriptions)
    }))
}

export default FaceDetect;