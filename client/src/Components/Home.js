import React, { Component } from 'react';
import './Home.css';

//importing visual assets
import loading from '../Assets/loading-buffering.svg';

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
      loading: true
    };

    //Required, else the functions don't work, javascript nuances
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('/users/get-users')
      .then(res => res.json())
      .then(users => this.setState({ users })) //Simple assignment to the users state
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
    return (
      <div className="App">
        <div className="Home-header">
          <h1>Users</h1>
          <LoadingUserDetails Loading={this.state.loading} />
          {/*Simple list of users from database fetch*/}
          {this.state.users.map(user =>
            <div key={user.id}>{user.username}</div>
          )}
          <form onSubmit={this.handleSubmit}>
            <input
              autoFocus
              placeholder="Username"
              name="username"
              type="text"
              value={this.state.username} // Appending the value to the state
              onChange={this.handleChange} // Calls the funcion that handles the validation check
            />
            <button type="submit">
              Login
            </button>
          </form>
        </div>
      </div>

    );
  }
}

function LoadingUserDetails(props) {
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

export default Home;

