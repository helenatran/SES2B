import React, { Component } from 'react';
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";


const MODEL_URL = './models';
const container = document.createElement('div');
const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
};

let img;
let canvas;

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL)
]).then(start);

class FaceDetect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: "",
            image: null,
            canvas: null,
            screenshot: null,
            showScreenshotButton: true,
            outcome: 0,
            boxColor: "",
            facesDetected: 0
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
    }
    capture = () => {
        this.setState({screenshot: this.webcam.getScreenshot()});
        this.stopWebCameraStream();
        this.setState( {disabled: !this.state.disabled} )
    };

    faceDetection = async event => {
        if(img) img.remove(); //TODO - remove this
        if(canvas) canvas.remove(); //TODO - remove this

        const labeledFaceDescriptors = await loadLableImages(this.state.user_id);
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

        let b64 = await fetch(this.state.screenshot); //TODO - Double check fetch purpose
        let blob = await b64.blob();

        img = await faceapi.bufferToImage(blob);
        img.style.position = 'absolute';
        container.append(img);

        const displaySize = {
            width: img.width,
            height: img.height
        };

        canvas = faceapi.createCanvasFromMedia(img);
        canvas.style.position = 'absolute';
        container.append(canvas);

        faceapi.matchDimensions(canvas, displaySize);
        this.setState({image: img}); //TODO - could remove this
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
            //TODO - Approve User
        }else{
            //TODO - Reject User
        }
    };

    render(){
        return(
        <div>
            <div className="webcam-container">
                <Webcam
                    audio={false}
                    height={200}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={220}
                    videoConstraints={videoConstraints}
                />
                <div>
                    <br></br>
                    <br></br>

                {this.state.showScreenshotButton && <button onClick={(e) => {
                    e.preventDefault();
                    this.toggle();
                    this.capture();
                    this.faceDetection()}}>
                Capture Image {this.state.showScreenshotButton}
                </button>}
                {!this.state.showScreenshotButton &&
                <div>
                    <button onClick={(event) => {
                        event.preventDefault();
                        document.location.reload();}}>
                    Retake Image</button>
                </div>}
                </div>
            </div>
        </div>
        )
    }
}

async function start() {
}


function loadLableImages(user_id){
    console.log(user_id)
    const labels = [user_id];
    const descriptions = [];
    return Promise.all(labels.map(async label => {
       for(let i = 1; i <= 1; i++){
           const img = await faceapi.fetchImage(`https://res.cloudinary.com/ddf9aci82/image/upload/v1632402873/students/${label}/${1}.jpg`);
           const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
           descriptions.push(detections.descriptor)
       }
       return new faceapi.LabeledFaceDescriptors(label, descriptions)
    }))
}

export default FaceDetect;