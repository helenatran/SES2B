import React, { Component } from 'react';
import './Home.css';
import {withRouter} from 'react-router-dom';

//importing functional components
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Loading from '../Utils/Loading.js'

class Home extends Component {
  constructor(props){
    super(props);
    // Data to be submitted and used need to be states to 
    // ensure we don't reload the page every time there is a state change 
    this.state = {
      users: [],
      errorMessage: false,
      username: '',
      password: '',
      validForm: false,
      loading: true,
      status: null
    };

    //Required, else the functions don't work, javascript nuances
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // fetch('/users/get-users')
    //   .then(res => res.json())
    //   .then(users => this.setState({ users })) //Simple assignment to the users state
    fetch('/users/login-status')
      .then(res => res.json())
      .then(status => this.setState({ status }))
      .then(loading => this.setState({ loading: false })); //disables the loading spinner
  }

  handleSubmit(event) {
    console.log(event); //Currently for development purposes
    const url = "/users/insert-user";
    var postBody = {
      username: this.state.username
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
      .then(users => this.setState({ users })) 
      .then(this.setState({ username: '' })) //Clearing user input
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
    //Checking if the user input is not empty, pre-handles
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
    if (this.state.username && this.state.username > 0){
      this.setState({validForm: true});
    }
    else{
      this.setState({validForm: false});
    }
  }
  

  render() {
    return(
      <div>
        <Navbar />
        <div className="App">
          <div className="Home-header">
            {/* 
              Simple rendering of the loading menu while the server updates 
              the state of the application
            */}
            {this.state.loading ? (
              // This is an inline if statement from react -> 
              // https://reactjs.org/docs/conditional-rendering.html
              <Loading Loading = {this.state.loading} />
            ) : (
              <div>
                {/* 
                  Handles logon states and returns the auth error 
                  page if user is not logged in, else returns the 
                  home screen
                */}
                {this.state.status ? ( 
                  //This is also another inline if statement
                  <div className="App"> 
                    <div className="Home-header"> 
                      Welcome User
                    </div>
                  </div>
                ) : (
                  <div>{this.props.history.push('/autherr')}</div> //Pushing to error page if user not logged in
                )}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Home);

