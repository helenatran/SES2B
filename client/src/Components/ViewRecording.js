import React, { Component } from "react";
import "./ViewRecording.css";

import { withRouter } from "react-router-dom";

import { Button, Stack, Card, Badge } from "react-bootstrap";
import { XLg } from "react-bootstrap-icons";
import { io } from "socket.io-client";

//To be replaced with recording once that is completed
import videoSrc from "../Assets/profilepic.png";

class ViewRecording extends Component {
  state = {
    MisconductAlert: "0",
  };

  componentDidMount() {
    const MISCONDUCT_ENDPOINT = "/misconduct";
    const socket = io(MISCONDUCT_ENDPOINT);
    fetch("/users/user_id")
      .then((res) => res.json())
      .then((user) => {
        socket.emit("start-listening", user.id);
        socket.on("misconduct", (data) => {
          this.setState({ MisconductAlert: data });
        });
      });
  }

  handleClose = () => {
    //need to change to view a list of recordings page once that's done
    this.props.history.push("/home");
  };

  render() {
    return (
      <div className="App">
        <Stack>
          <div className="bg-light border">
            <div className="exam-title">
              Software studio 2B - final Exam | 1st October 2021 - 2:00 PM
            </div>
          </div>
          <div className="bg-light border recording-view-card">
            <Card>
              <Card.Img
                className="recording"
                variant="top"
                src={videoSrc}
                alt="student-recorded-video"
              />
              <Button className="misconduct" variant="outline-danger" disabled>
                Misconducts{" "}
                <Badge bg="danger">{this.state.MisconductAlert} </Badge>
              </Button>
              <Card.Body className="student-details">
                <div className="student-name">John Smith</div>
              </Card.Body>
              <a onClick={this.handleClose} className="x-icon">
                <XLg />
              </a>
            </Card>
          </div>
        </Stack>
      </div>
    );
  }
}

export default withRouter(ViewRecording);
