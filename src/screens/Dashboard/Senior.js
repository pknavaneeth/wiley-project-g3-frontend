import React from "react";
import axios from "axios";
import PostAnswer from "../../Components/post_answer";
import { Redirect, NavLink } from "react-router-dom";
import { APIROOT } from "../../config.js";
class seniorDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      noOfPages: 0,
      currentPage: 1,
      user: {},
      isModalShown: false,
      questionId: {},
    };
  }

  fetchQuestions = () => {
    axios
      .get(
        APIROOT +
          "/api/senior/view-questions?sortBy=createdAt&sortOrder=desc&pageNo=1&perPage=100",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        this.setState({ questions: res.data.questions });
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
    this.fetchQuestions();
  }

  togglePopUp = (event) => {
    if (event) console.log(event.target.value);
    this.setState({
      isModalShown: !this.state.isModalShown,
    });
    if (event)
      this.setState({
        questionId: JSON.parse(event.target.value),
      });
  };

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
            <h3 align="center">Senior Dashboard</h3>
            <div className="row-column">
              <h3>{this.state.user.name}</h3>
              <h4>{this.state.user.role}</h4>
              <button onClick={this.onLogoutClick}>LOGOUT</button>
            </div>
          </div>

          <ol>
            {this.state.questions.map((question, index) => {
              return (
                <div className="card-body">
                  <li key={index}>
                    <div className="row">
                      <div className="col">
                        {question.question}
                        <div className="col">
                          Company Name: {question.companyName}
                        </div>
                        <div className="col">
                          Raised By :
                          {" " +
                            question.raisedBy.firstname +
                            " " +
                            question.raisedBy.lastname}
                        </div>
                        <button
                          value={JSON.stringify({
                            id: question._id,
                            question: question.question,
                          })}
                          onClick={this.togglePopUp}
                          className="btn btn-primary btn-sm"
                        >
                          REPLY
                        </button>
                      </div>
                      <div className="card-body">
                        <ol type="a">
                          {question.answers.map((answer, i) => {
                            return (
                              <div className="col">
                                <li key={i}>
                                  <div className="col">{answer.answer}</div>
                                  <div className="col">
                                    <div className="row">
                                      Replyed By :
                                      {answer.authorId.firstname +
                                        " " +
                                        answer.authorId.lastname}
                                    </div>
                                    <div className="row">
                                      Status : {answer.status}
                                    </div>
                                  </div>
                                </li>
                              </div>
                            );
                          })}
                        </ol>
                      </div>
                    </div>
                  </li>
                </div>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default seniorDashboard;
