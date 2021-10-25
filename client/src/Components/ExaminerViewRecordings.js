import React, { Component, useState, TouchableOpacity } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Stack,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import {Link} from "react-router-dom";
import profilepic from "../Assets/profilepic.png";
import "./ExaminerViewRecordings.css";
import Badge from 'react-bootstrap/Badge'
import { io } from "socket.io-client";
// var misconductAlert = 0;

function ExaminerViewRecordings() {
  return (
    <Container fluid>
<div class="row">
    <div class="col-lg-1 col-centered">
        <div className="title">
            <h1>Engineering Project Management</h1>
            <h2> 1st October 2021 - 2:00 PM</h2>
            </div>
        <br/>
        <Col className=" col " style={{padding:"3%"}}>
              <div className="column-contents ">
                <h1 style={{font:"bold 25.5px/34px Montserrat"}}>John Smith</h1>
                <h2 style={{font:"bold 13.5px/18px Montserrat", color:"black"}}> 2 Misconduct Alerts</h2>
                <Link><h2 style={{font:"bold 13.5px/18px Montserrat", color:"black", textDecoration:"underline"}}>View Recordings</h2></Link>
                <br/>
                <hr/>
              </div>
              <br/>
              <div className="column-contents ">
                <h1 style={{font:"bold 25.5px/34px Montserrat"}}>John Smith</h1>
                <h2 style={{font:"bold 13.5px/18px Montserrat", color:"black"}}> 2 Misconduct Alerts</h2>
                <Link><h2 style={{font:"bold 13.5px/18px Montserrat", color:"black", textDecoration:"underline"}}>View Recordings</h2></Link>
                <br/>
                <hr/>
              </div>
              <br/>
              <div className="column-contents ">
                <h1 style={{font:"bold 25.5px/34px Montserrat"}}>John Smith</h1>
                <h2 style={{font:"bold 13.5px/18px Montserrat", color:"black"}}> 2 Misconduct Alerts</h2>
                <Link><h2 style={{font:"bold 13.5px/18px Montserrat", color:"black", textDecoration:"underline"}}>View Recordings</h2></Link>
                <br/>
                <hr/>
              </div>
              <br/>
              <div className="column-contents ">
                <h1 style={{font:"bold 25.5px/34px Montserrat"}}>John Smith</h1>
                <h2 style={{font:"bold 13.5px/18px Montserrat", color:"black"}}> 2 Misconduct Alerts</h2>
                <Link><h2 style={{font:"bold 13.5px/18px Montserrat", color:"black", textDecoration:"underline"}}>View Recordings</h2></Link>
                <br/>
                <hr/>
              </div>
              <br/>
             
             
            </Col>
    </div>
</div>
    </Container>
  );
}
export default ExaminerViewRecordings;
