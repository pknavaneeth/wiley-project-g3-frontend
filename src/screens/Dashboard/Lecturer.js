import React from "react";
import axios from "axios";
import PostAnswer from "../../Components/onboard_junior";
import { Redirect, NavLink } from "react-router-dom";
import { APIROOT } from "../../config.js";
class lecturerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      noOfPages: 0,
      currentPage: 1,
      user: {},
      isModalShown: false,
      answerId: {},
    };
  }

  fetchAnswers = () => {
    axios
      .get(
        APIROOT +
          "/api/faculty/view-answers?status=Pending&sortBy=createdAt&pageNo=1&perPage=100",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        this.setState({ answers: res.data.answers });
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
  
  togglePopUp = () => {
    this.setState({
      isModalShown: !this.state.isModalShown,
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
    this.fetchAnswers();
  }

  approveAnswer = (event) => {
    if (event){
    let answerId = JSON.parse(event.target.value)
    axios
    .post(
      `${APIROOT}/api/faculty/answer-change-status`,
      {
        answerId: answerId.id,
        status:"Approved",
      },
      {
        headers: {
          // Cookie: `auth=${localStorage.getItem('token')}`,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((res) => {
      console.log(res);
      this.fetchAnswers();
    });
  }
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
            question={this.state.answerId}
          />
        ) : (
          <></>
        )}

        
        <div className="card" style={{ background: "yellow" }}>
          <div className="header-row">
            <div></div>
            <h3 align="center">Lecturer Dashboard</h3>
             <div className="row-column">
              <h3>{this.state.user.name}</h3>
              <h4>{this.state.user.role}</h4>
              <h4>{this.state.user.companyName}</h4>
              <button onClick={this.onLogoutClick}>LOGOUT</button>
            </div>
          </div>

          <button onClick={this.togglePopUp} className="post-btn">
            onBoard Junior
          </button>
          <ol>
            {this.state.answers.map((answer, index) => {
              return (
                <div className="card-body">
                  <li key={index}>
                    <div className="row">
                      <div className="col">
                        {answer.answer}
                        <div className="col">
                          Status: {answer.status}
                        </div>
                        <div className="col">
                          Author : 
                          {" " +
                            answer.authorId.firstname +
                            " " +
                            answer.authorId.lastname}
                        </div>
                        <button
                          value={JSON.stringify({
                            id: answer._id,
                         })}
                          onClick={this.approveAnswer}
                          className="btn btn-primary btn-sm"
                        >
                          Approve
                        </button>
                      </div>
                      <div className="card-body">
                        <ol type="a">
                         
                              <div className="col">
                                
                                  <div className="col">{answer.questionId.question}</div>
                                  <div className="col">
                                    <div className="row">
                                      Raised By :
                                      {answer.questionId.raisedBy.firstname +
                                        " " +
                                        answer.questionId.raisedBy.lastname}
                                    </div>
                                    <div className="row">
                                      companyName : {answer.questionId.companyName}
                                    </div>
                                  </div>
                                
                              </div>
                          
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

export default lecturerDashboard;
