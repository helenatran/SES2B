
import "./Exam.css";
//import { Button } from "react-bootstrap";
import React, { Component } from 'react';

//importing visual assets
import loading from '../Assets/loading-buffering.svg';

class Exam extends Component {
  constructor(props){
    super(props);
    // Data to be submitted and used need to be states to 
    // ensure we don't reload the page every time there is a state change 
    this.state = {
      exams: [],
      errorMessage: false,
      examName: 'Math9999',
      examDate: '30/01/2022',
      examID: 60,
      examUsers: [13,177, 90],
      validForm: false,
      loading: true
    };

    //Required, else the functions don't work, javascript nuances
    this.handleSubmit = this.handleSubmit.bind(this);
   // this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    fetch('/exam/get-exams')
      .then(res => res.json())
      .then(exams => this.setState({ exams })) //Simple assignment to the exams state
      .then(exams => console.log(exams))
      .then(loading => this.setState({ loading: false })); //disables the loading spinner
      

      fetch('/exam/get-exam/60')
      .then(res => res.json())
      //.then(exams => this.setState({ exams })) //Simple assignment to the exams state
      .then(exam => {
        console.log(exam.exam_name)
        console.log(">>>>>>>>>"+exam)})
     // .then(exam => console.log(">>>>>>>>>"+exam.exam_name))
     // .then(loading => this.setState({ loading: false })); //disables the loading spinner
      
  }

  handleSubmit(event) {
    console.log(event); //Currently for development purposes
    const url = "/exam/create-exam";
    var postBody = {
      exam_id: this.state.examID,
      exam_name: this.state.examName,
      date_time: this.state.examDate,
      user_ids: this.state.examUsers
    };
    const requestMetadata = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(postBody)
    }
    fetch(url, requestMetadata)
      .then(res => res.json())
      // Reassigning user state to trigger 
      // update in react and to update the displayed data
      .then(exams => this.setState({ exams })) 
      //.then(this.setState({ username: '' })) //Clearing user input
      .then(
        (result) => {
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      );
    event.preventDefault();
  }

  handleUpdate(event) {
    console.log(event); //Currently for development purposes
    const url = "/exam/update-exam/60";
    var postBody = {
      exam_id: 60,
      exam_name: 'math99999999'
    };
    const requestMetadata = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(postBody)
    }
    fetch(url, requestMetadata)
      .then(res => res.json())
      // Reassigning user state to trigger 
      // update in react and to update the displayed data
      //.then(exams => this.setState({ exams })) 
      //.then(this.setState({ username: '' })) //Clearing user input
      .then(
        (result) => {
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      );
    event.preventDefault();
  }

  handleChange(event) {
    // //Checking if the user input is not empty, pre-handles
    // const target = event.target;
    // const name = target.name;
    // this.setState({
    //   [name]: target.value
    // });
    // if (this.state.username && this.state.username > 0){
    //   this.setState({validForm: true});
    // }
    // else{
    //   this.setState({validForm: false});
    // }
  }

  render() {
    console.log("hey  i am running"+this.state.exams);
    return (
      <div className="App">
        <div className="Home-header">
          <h1>Exam</h1>
          <LoadingExamDetails Loading={this.state.loading} />
          {/*Simple list of users from database fetch*/}
          {this.state.exams.map((val, key) =>
            <div>{val.exam_name}
            <p>{val.exam_id}</p>
            <p>{val.user_ids}</p>
            <button >delete</button>

            </div>


          )}
          {<h1>{console.log(this.state.exams)}</h1>} 
          <form onSubmit={this.handleSubmit}>                                
            <button type="submit">
              Test create sample exam
            </button>
          </form>
          <form onSubmit={this.handleUpdate}>                                
            <button type="submit">
              update sample  exam
            </button>
          </form>
  
        </div>
      </div>

    );
  }
}

function LoadingExamDetails(props) {
  // Renders the loading spinner until
  // database served data has been rendered
  const Loading = props.Loading;
  if (Loading) {
    return (
      <div>
        <img src={loading} className="loading spinner" alt="loading..." />
      </div>
    );
  }
  else return <div></div> ;
}

export default Exam;
