import React, { Component } from "react";
import "./SignUp.css";
import { Redirect, withRouter } from "react-router-dom";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      islogged: false,
      signUpParams: {
        user_fname: "",
        user_lname: "",
        user_email: "",
        user_password: "",
        user_confirmPassword: "",
        user_role: "",
        user_yearsOfExp: "",
        user_companyName: ""
      }
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
    let password2 = this.state.signUpParams.user_confirmPassword;
    let role = this.state.signUpParams.user_role;
    let companyname = this.state.signUpParams.user_companyName;
    let yearsOfExp = this.state.signUpParams.user_yearsOfExp

    fetch("http://localhost:3000/api/register",{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({firstname, lastname, email, password, password2, role, companyname, yearsOfExp})})
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
  render() {
    if (localStorage.getItem("token")) {
      return <Redirect to="/" />;
    }
    return (
      <div className="mycontainer">
        <form onSubmit={this.signUp} className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
          <div className="row">
            <div className="col">
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
              <input
                type="password"
                name="user_confirmPassword"
                onChange={this.handleFormChange}
                placeholder="Enter Confirm Password"
              />
              <select name="user_role" id="user_role" onChange={this.handleFormChange}>
                <option value="select">Choose Role</option>
                <option value="senior">Senior</option>
                <option value="lecturer">Lecturer</option>
              </select>

              {
                  this.state.signUpParams.user_role === "lecturer" && <input
                  type="text"
                  name="user_yearsOfExp"
                  onChange={this.handleFormChange}
                  placeholder="Enter Years of Experience"
                 />
              }
              {
                 this.state.signUpParams.user_role === "senior" && <input
                  type="text"
                  name="user_companyName"
                  onChange={this.handleFormChange}
                  placeholder="Enter Company name"
                 />
              }

              <input type="submit" value="Sign Up" />

              
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(Signup);