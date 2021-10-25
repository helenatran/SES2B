// Global bootstrap CSS import
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Importing Components
import Navbar from "./Components/Navbar.js";
import Login from "./Components/Login.js";
import StudentWebcam from "./Components/StudentWebcam.js";
import SpyOnStudents from "./Components/SpyOnStudents.js";
import Home from "./Components/Home.js";
import Exam from "./Components/Exam.js";
import StudentProfile from "./Components/StudentProfile.js";
import AuthError from "./Errors/AuthError.js";
import ForgotPassword from "./Components/ForgotPassword.js";
import ExaminerViewRecordings from "./Components/ExaminerViewRecordings.js";

import PreExamChecklist from "./Components/Pre-examChecklist";

import StudentDashboard from "./Components/StudentDashboard";
import StaffVideoScreen from "./Components/StaffVideoScreen/StaffVideoScreen";
import ViewRecording from "./Components/ViewRecording";
import SpyOnStudents from "./Components/SpyOnStudents";

import RecordingsDashboard from "./Components/recordingsDashboard";

class App extends Component {
  // Simple 3 page React Router Setup
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/forgotpassword">
            <ForgotPassword />
          </Route>
          <Route path="/studentDashboard">
            <StudentDashboard />
          </Route>
          <Route path="/adminDashboard">
            <RecordingsDashboard />
          </Route>
          <Route path="/StudentProfile">
            <StudentProfile />
          </Route>
          <Route path="/Pre-examChecklist">
            <PreExamChecklist />
          </Route>
          <Route path="/view-recording">
            <ViewRecording />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/webcam-test">
            <StudentWebcam
              examId="TEST_EXAM_ID"
              userId={Math.floor(Math.random() * 1000)}
            />
          </Route>
          <Route path="/spy-on-students-test">
            <SpyOnStudents examId="TEST_EXAM_ID" />
          </Route>
          <Route path="/staff-video-screen">
            <StaffVideoScreen />
          </Route>
          <Route path="/autherr">
            <AuthError />
          </Route>
          <Route path="/exam">
            <Exam />
          </Route>
          <Route path="/ExaminerRecordings">
            <ExaminerViewRecordings />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
