import React from "react";
import axios from "axios";
import PostAnswer from "../../Components/post_answer";
import { Redirect, NavLink } from "react-router-dom";
import { APIROOT } from "../../config.js";
class seniorDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      driveCompanies: [],
      user: {},
      renderManageDrive: true,
      renderUpgradeJunior: false,
    };
  }

  fetchCompanies = () => {
    axios
      .get(APIROOT + "/api/allcompanies", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({ companies: res.data.companyList });
      });
  };
  fetchDriveCompanies = () => {
    axios
      .get(APIROOT + "/api/listcompanies", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({ driveCompanies: res.data });
      });
  };

  onManageDriveClick = () => {
    this.setState({
      renderManageDrive: true,
      renderUpgradeJunior: false,
    });
  };

  onUpgradeJuniorClick = () => {
    this.setState({
      renderManageDrive: false,
      renderUpgradeJunior: true,
    });
  };

  onLogoutClick = () => {
    axios
      .get(`${APIROOT}/api/logout`, {
        headers: {
          // Cookie: `auth=${localStorage.getItem('token')}`,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        window.open("/", "_self");
      });
  };
  componentDidMount() {
    axios
      .get(`${APIROOT}/api/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({ user: res.data });
      });
    this.fetchCompanies();
    this.fetchDriveCompanies();
  }

  render() {
    if (!localStorage.getItem("user")) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        {this.state.isModalShown ? (
          <PostAnswer
            fetchQuestions={() => this.fetchQuestions()}
            togglePopUp={() => this.togglePopUp()}
            question={this.state.questionId}
          />
        ) : (
          <></>
        )}
        <div className="card" style={{ background: "yellow" }}>
          <div className="header-row">
            <div></div>
            <h3 align="center">PO Dashboard</h3>
            <div className="row-column">
              <h3>{this.state.user.name}</h3>
              <h4>{this.state.user.role}</h4>
              <h4>{this.state.user.companyName}</h4>
              <button onClick={this.onLogoutClick}>LOGOUT</button>
            </div>
          </div>
          <div className="Menu Bars">
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="button"
              aria-pressed="false"
              autocomplete="off"
              onClick={this.onManageDriveClick}
            >
              Manage Drive Companies
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="button"
              aria-pressed="false"
              autocomplete="off"
              onClick={this.onUpgradeJuniorClick}
            >
              Upgrade Juniors
            </button>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

export default seniorDashboard;
