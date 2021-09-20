import React, { Component } from 'react';
import * as faceapi from "face-api.js";

const imageUpload = document.getElementById('imageUpload')
const MODEL_URL = './models'
const container = document.createElement('div') //1

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
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL), //detect where characters face is
    faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL)
]).then(start)

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
        if(img) img.remove()
        if(canvas) canvas.remove()
        const labeledFaceDescriptors = await loadLableImages()
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
        console.log(typeof document.getElementById('root'))

        img = await faceapi.bufferToImage(event.target.files[0])
        img.style.position = 'absolute'
        container.append(img)

        canvas = faceapi.createCanvasFromMedia(img)
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
        const results = resizeDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
        results.forEach((result, i) => {
            const box = resizeDetections[i].detection.box
            const drawBox = new faceapi.draw.DrawBox(box, {label: result.toString()})
            drawBox.draw(canvas)
        })

        document.body.append(container)

    };

    render(){
        return(
        <div style={mystyle}>
            <script src="face-api.min.js" defer></script>
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


async function start() {
    document.body.append('Loaded')
}

function loadLableImages(){
    const labels = ['Black Widow'];
    const descriptions = [];
    return Promise.all(labels.map(async label => {
       for(let i = 1; i <= 5; i++){
           const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/Nickg1995/image-upload/main/labeled_images/${label}/${i}.jpg`)
           const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
           descriptions.push(detections.descriptor)
       }
       return new faceapi.LabeledFaceDescriptors(label, descriptions)
    }))
}

export default FaceDetect;