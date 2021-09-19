import React, { Component, Canvas } from 'react';
import ReactDOM from "react-dom";
import * as faceapi from "face-api.js";

const imageUpload = document.getElementById('imageUpload')
const MODEL_URL = '/models'
const container = document.createElement('div') //1

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

class FaceDetect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            canvas: null
        };

        this.imageUpload = this.imageUpload.bind(this);
    }

    imageUpload = async event => {
        console.log(typeof document.getElementById('root'))

        let img = await faceapi.bufferToImage(event.target.files[0])
        img.style.position = 'absolute'
        container.append(img)

        const canvas = faceapi.createCanvasFromMedia(img)
        canvas.style.position = 'absolute'
        container.append(canvas)

        const displaySize = {
            width: img.width,
            height: img.height
        }

        faceapi.matchDimensions(canvas, displaySize)
        this.setState({image: img})
        const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors()
        const resizeDetections = faceapi.resizeResults(detections, displaySize)
        resizeDetections.forEach(detection => {
            const box = detection.detection.box
            const drawBox = new faceapi.draw.DrawBox(box, {label: 'Face'})
            drawBox.draw(canvas)
        })

        document.body.append(container)

    };

    render(){
        return(
        <div style={mystyle}>
            Face Detection
            <body>
                <input
                    accept="image/*"
                    className="input"
                    id="icon-button-file"
                    type="file"
                    onChange={this.imageUpload}
                />
            </body>
        </div>
        )
    }
}

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL)
]).then(start)

async function start() {
    document.body.append('Loaded')
}

export default FaceDetect;