import React, { Component } from "react";
import "./Profile.css";
//import ProfilePic from "../Assets/profilepic.png";
import edit from "../Assets/edit.png";

class StudentProfile extends Component {
  // Uses Dummy Data git

  state = {
    ProfilePic:
      "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png",
  };

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
            <div class="container">
              <div className="app-wrapper">
                <form className="form=wrapper">
                  <div classname="FName">
                    <label for="FName" className="label">
                      {" "}
                      First Name
                    </label>
                    <input
                      id="FName"
                      className="input"
                      type="text"
                      placeholder="John"
                    ></input>
                  </div>

                  <div classname="LName">
                    <label for="LName" className="label">
                      {" "}
                      Last Name
                    </label>
                    <input
                      id="LName"
                      className="input"
                      type="text"
                      placeholder="Smith"
                    ></input>
                  </div>

                  <div classname="PName">
                    <label for="PName" className="label">
                      {" "}
                      Preferred Name
                    </label>
                    <input
                      id="PName"
                      className="input"
                      type="text"
                      placeholder="Jhonny"
                    ></input>
                  </div>

                  <div classname="StudentID">
                    <label for="StudentID" className="label">
                      {" "}
                      Student ID
                    </label>
                    <input
                      id="StudentID"
                      className="input"
                      type="text"
                      placeholder="13543234"
                    ></input>
                  </div>

                  <div classname="Email">
                    <label for="Email" className="label">
                      {" "}
                      Email &#8287; &#8287; &#8287;{" "}
                    </label>
                    <input
                      id="Email"
                      className="input"
                      type="email"
                      placeholder="JohnSmith@gmail.com"
                    ></input>
                  </div>

                  <div classname="PNumber">
                    <label for="PNumber" className="label">
                      {" "}
                      Phone Number
                    </label>
                    <input
                      id="PNumber"
                      className="input"
                      type="text"
                      placeholder="0404321567"
                    ></input>
                  </div>

                  <div>
                    <button className="submit">Save Changes</button>
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
