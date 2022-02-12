import React, { Component } from "react";
import "./Login.css";
import { Redirect , NavLink} from "react-router-dom";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogged: false,
      loginParams: {
        user_id: "",
        user_password: ""
      }
    };
  }
  handleFormChange = event => {
    let loginParamsNew = { ...this.state.loginParams };
    let val = event.target.value;
    loginParamsNew[event.target.name] = val;
    this.setState({
      loginParams: loginParamsNew
    });
  };
 
  login = event => {
    
    let email = this.state.loginParams.user_id;
    let password = this.state.loginParams.user_password;
    fetch("http://localhost:3000/api/login",{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({email, password})})
      .then(res => res.json())
      .then(
        (result) => {
          if(!result?.isAuth)
          alert("Enter valid crendentails");
          else
          alert("Success")
        },
        (error) => {
          console.log("Unable to login");
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
        <form onSubmit={this.login} className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <div className="row">
            <div className="col">
              <input
                type="text"
                name="user_id"
                onChange={this.handleFormChange}
                placeholder="Enter Username"
              />
              <input
                type="password"
                name="user_password"
                onChange={this.handleFormChange}
                placeholder="Enter Password"
              />
              <input type="submit" value="Login" />

              <div className="nav">
              <NavLink to="/signup">Sign Up</NavLink> 
              </div>

            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Login;