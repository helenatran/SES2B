import React, { Component } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap"
import Stack from 'react-bootstrap/Stack'
import profilepic from "../Assets/profilepic.png"
import "./Exam.css";
import { io } from "socket.io-client";

function Exam(){
	const MISCONDUCT_ENDPOINT = "/misconduct"
	var userId;

	React.useEffect(() => {
		const socket = io(MISCONDUCT_ENDPOINT);
		fetch('/users/user_id')
		.then(res => res.json())
		.then(user => {
			userId = user.id
			socket.emit("start-listening", userId);
			socket.on("misconduct", (data) => {
			// Sukhpreet do what you need here
				console.log(data);
			})
		})
	},[]);

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
					Exam
				</Col>	
			</Row>
		</Container>
	)
	
}
export default Exam;