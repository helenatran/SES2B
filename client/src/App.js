import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      errorMessage: false,
      username: '',
      password: '',
      validForm: false,
      edit: [1, 2, 3]
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('/users/get-users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  handleSubmit(event) {
    console.log(event);
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
      .then(users => this.setState({ users }))
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
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
    if (this.state.username && this.state.username > 0){
        this.setState({validForm: true});
    }else{
        this.setState({validForm: false});
    }
  }
  

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
        <form onSubmit={this.handleSubmit}>
          <input
            autoFocus
            placeholder="Username"
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <button type="submit">
            Login
          </button>
        </form>
        {this.state.edit}
      </div>

    );
  }
}

export default App;

