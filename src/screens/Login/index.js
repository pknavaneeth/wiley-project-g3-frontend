import React, { Component } from "react";
import "./Login.css";
import { APIROOT } from "../../config";
import { Redirect, NavLink } from "react-router-dom";
import axios from "axios";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogged: false,
      loginParams: {
        user_id: "",
        user_password: "",
      },
    };
  }
  handleFormChange = (event) => {
    let loginParamsNew = { ...this.state.loginParams };
    let val = event.target.value;
    loginParamsNew[event.target.name] = val;
    this.setState({
      loginParams: loginParamsNew,
    });
  };

  login = (event) => {
    let email = this.state.loginParams.user_id;
    let password = this.state.loginParams.user_password;
    axios
      .post(`${APIROOT}/api/login`, {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        if (!res?.data.isAuth) alert("Enter valid crendentails");
        else {
          localStorage.setItem("user", JSON.stringify(res.data));
          localStorage.setItem("token", res.data.token);
          if (res.data.role == "Junior") window.open("/junior", "_self");
          else if (res.data.role == "Senior") window.open("/senior", "_self");
          else if (res.data.role == "PO") window.open("/po", "_self");
          else if (res.data.role == "Lecturer")
            window.open("/lecturer", "_self");
          else window.open("/other", "_self");
        }
      });

    event.preventDefault();
  };
  render() {
    // if (localStorage.getItem("token")) {
    //   return <Redirect to="/" />;
    // }
    return (
      <div className="login-page">
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
      </div>
    );
  }
}
export default Login;
