import React, { Component } from "react";
import "./Profile.css";
//import ProfilePic from "../Assets/profilepic.png";
import edit from "../Assets/edit.png";

class StudentProfile extends Component {
  // Uses Dummy Data git
  constructor(props){
    super(props);
    this.state = {
      ProfilePic:
        "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png",
      user: {
        first_name: "",
        last_name:"",
        preferred_name:"",
        id_number:"",
        email:"",
        mobile:""
      },
      updatedPreferredName:"",
      updatedMobile:""
    };

    this.imageHandler = this.imageHandler.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (e) => {
    switch(e.target.id){
      case "PName":
        var user = this.state.user;
        user.preferred_name = e.target.value;
        this.setState(user)
        this.setState({updatedPreferredName: e.target.value});
        break;
      case "PNumber":
        var user = this.state.user;
        user.mobile = e.target.value;
        this.setState(user)
        this.setState({updatedMobile: e.target.value})
        break;
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var postBody = {
      email: this.state.user.email
    }
    if (this.state.updatedPreferredName !== ""){
      postBody.preferred_name = this.state.updatedPreferredName
    }
    if (this.state.updatedMobile !== ""){
      postBody.mobile = this.state.updatedMobile
    }

    const requestMetadata = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postBody)
    }

    fetch("/users/update-user", requestMetadata)
      .then(res => res.json())
      .then((result) => {
        if (result.success) {
          window.alert("user successfully updated!")
        }
        else{
          window.alert("error updating user")
        }
      })

  }

  componentDidMount = () => {
    fetch('/users/get-current-user')
      .then(res => res.json())
      .then(user => this.setState({user}))
  }

  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ ProfilePic: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  render() {
    const { ProfilePic } = this.state;
    return (
      <div className="page">
        <div className="right">
          <div className="top">
            <div className="col">
              <div className="Image">
                <div className="profile-wrapper">
                  <img
                    src={ProfilePic}
                    id="img"
                    alt="img"
                    className="Img"
                  ></img>
                </div>
                <div className="bottom">
                  <div className="file">
                    <input
                      type="file"
                      name="image-upload"
                      id="input"
                      accept="image/*"
                      onChange={this.imageHandler}
                    />
                    <div className="label">
                      <label htmlFor="input" className="image-upload">
                        <i className="material-icons">add_photo_alternate</i>
                        Update Photo
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="left">
          <div className="App-header">
            <div className="container">
              <div className="app-wrapper">
                <form className="form=wrapper">
                  <div className="FName">
                    <label htmlFor="FName" className="label">
                      {" "}
                      First Name
                    </label>
                    <input
                      id="FName"
                      className="input"
                      type="text"
                      value={this.state.user.first_name}
                      readOnly
                    ></input>
                  </div>

                  <div className="LName">
                    <label htmlFor="LName" className="label">
                      {" "}
                      Last Name
                    </label>
                    <input
                      id="LName"
                      className="input"
                      type="text"
                      value={this.state.user.last_name}
                      readOnly
                    ></input>
                  </div>

                  <div className="PName">
                    <label htmlFor="PName" className="label">
                      {" "}
                      Preferred Name
                    </label>
                    <input
                      id="PName"
                      className="input"
                      type="text"
                      value={this.state.user.preferred_name}
                      onChange={this.handleChange}
                    ></input>
                  </div>

                  <div className="StudentID">
                    <label htmlFor="StudentID" className="label">
                      {" "}
                      Student ID
                    </label>
                    <input
                      id="StudentID"
                      className="input"
                      type="text"
                      value={this.state.user.id_number}
                      readOnly
                    ></input>
                  </div>

                  <div className="Email">
                    <label htmlFor="Email" className="label">
                      {" "}
                      Email &#8287; &#8287; &#8287;{" "}
                    </label>
                    <input
                      id="Email"
                      className="input"
                      type="email"
                      value={this.state.user.email}
                      readOnly
                    ></input>
                  </div>

                  <div className="PNumber">
                    <label htmlFor="PNumber" className="label">
                      {" "}
                      Phone Number
                    </label>
                    <input
                      id="PNumber"
                      className="input"
                      type="text"
                      value={this.state.user.mobile}
                      onChange={this.handleChange}
                    ></input>
                  </div>

                  <div>
                    <button className="submit" onClick={(e) => this.handleSubmit(e)}>Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentProfile;
