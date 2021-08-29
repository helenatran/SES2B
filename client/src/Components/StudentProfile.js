import React, { Component } from "react";
import "./Profile.css";
import ProfilePic from "../Assets/profilepic.png";
import edit from "../Assets/edit.png";

class StudentProfile extends Component {
    // Uses Dummy Data 
    render(){
        return(

           <div className="App-header"> 
                 
               <div class="container">

                    <div className="app-wrapper">
                        <div>
                            <h2 className="title">Profile Page</h2>

                        </div>

                        <form className="form=wrapper">
                            <div classname="FName">
                                <label className="label"> First Name</label>
                                <input className="input" type="text" placeholder="John"></input>
                            </div>

                            <div classname="LName">
                                <label className="label"> Last Name</label>
                                <input className="input" type="text" placeholder="Smith"></input>
                            </div>

                            <div classname="StudentID">
                                <label className="label"> Student ID</label>
                                <input className="input" type="text" placeholder="13543234"></input>
                            </div>

                            <div classname="Email">
                                <label className="label"> Email</label>
                                <input className="input" type="text" placeholder="JohnSmith@gmail.com"></input>
                            </div>

                            <div classname="PNumber">
                                <label className="label"> Phone Number</label>
                                <input className="input" type="text" placeholder="0404321567"></input>
                            </div>

                            <div>
                                <button className="submit">Save Changes</button>
                            </div>


                        </form>

                        
                </div></div>
                        
                   
            </div>
      

                     
                     
             
           
        )
    }
}

export default StudentProfile;