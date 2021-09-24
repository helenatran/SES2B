import React, { Component } from "react";
import { Container, Row, Col, Image, Button, Stack } from "react-bootstrap"
import Iframe from "react-iframe"
import profilepic from "../Assets/profilepic.png"
import "./Exam.css";

class Exam extends Component {
	render() {
		return (
			<Container fluid>
  				<Row>
					<Col className="Sidebar" sm={2}>
						<Stack gap={4} className="mx-auto">
							<Image src={profilepic} fluid /* Replace with live video *//>
							<div className="timer-text">
								Time Left: 00:00:00
							</div>
							<hr/>
							<Button
                              	style={{ height: "50px" }}
                              	className="help-button buttons"
                              	type="submit"
                            >
                            	Request Help
                            </Button>
							<Button
                              	style={{ height: "50px" }}
                              	className="leave-button buttons"
                              	type="submit"
                            >
                            	Leave Exam
                            </Button>
						</Stack>	
					</Col>
					<Col className="Exam-colour" sm={10}>
						<Iframe url="https://canvas.uts.edu.au/courses/16320/quizzes/19649"
						sandbox="allow-same-origin allow-scripts allow-forms"
						width="100%"
						height="100%"
						display="initial"
        				position="relative"/>
							
			
					</Col>	
  				</Row>
			</Container>
		)
	}
}
export default Exam;