import React from "react";
import { APIROOT } from "../config";

import axios from "axios";
class OnboardJunior extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user_fname: "",
        user_lname: "",
        user_email: "",
        user_password: "",
        
    };
  }
  handleFormChange = event => {
    let signUpParamsNew = { ...this.state.signUpParams };
    let val = event.target.value;
    signUpParamsNew[event.target.name] = val;
    this.setState({
      signUpParams: signUpParamsNew
    });
    
  };

  signUp = event => {
    let firstname = this.state.signUpParams.user_fname;
    let lastname = this.state.signUpParams.user_lname;
    let email = this.state.signUpParams.user_email;
    let password = this.state.signUpParams.user_password;
    

    fetch(`${APIROOT}/api/lecturer/onboard-junior`,{
      method: 'post',
      headers: {
        // Cookie: `auth=${localStorage.getItem('token')}`,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({firstname, lastname, email, password})})
      .then(res => res.json())
      .then(
        (result) => {
          if(result?.succes){
             console.log(this.props);
             this.props.history.push("/");
          }
          else
          alert(result.message)
        },
        (error) => {
          console.log("Unable to signin");
        }
      )

    event.preventDefault();
  };
  

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  

  render() {
    return (
      <div className="modal-back">
        <div className="post-modal">
          <div className="header-row">
          <form onSubmit={this.signUp} className="form-signin">
    
          <input
                type="text"
                name="user_fname"
                onChange={this.handleFormChange}
                placeholder="Enter First name"
           />
           <input
                type="text"
                name="user_lname"
                onChange={this.handleFormChange}
                placeholder="Enter Last name"
              />
            <input
                type="text"
                name="user_email"
                onChange={this.handleFormChange}
                placeholder="Enter email"
            />
            <input
                type="password"
                name="user_password"
                onChange={this.handleFormChange}
                placeholder="Enter Password"
              />  
           <input type="submit" value="Sign Up" />
           </form>
          </div>
       </div>
     </div>
    );
  }
}

export default OnboardJunior;
