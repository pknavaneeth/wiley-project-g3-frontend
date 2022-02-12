import React, { Component } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
// import Home from "./Components/home";
import Login from "./screens/Dashboard/Dashboard";

export default class Router extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
