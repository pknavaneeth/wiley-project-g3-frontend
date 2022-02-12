import React from "react";
import axios from "axios";
import {APIROOT} from '../../config.js'
import PostModal from '../../Components/post_modal'
import { Redirect , NavLink} from "react-router-dom";
class juniorDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { questions: [], noOfPages: 0, currentPage: 1 , user : {}, isModalShown : false};
  }

  fetchQuestions = () => {
    axios
    .get( 
        "https://wiley-grp3-backend.herokuapp.com/api/get-question-answers?showAll=true&sortBy=createdAt&sortOrder=des&pageNo=1&perPage=10",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
    )
    .then((res) => {
      console.log(res);
      this.setState({ questions: res.data.questions });
    });
  }

  onLogoutClick = () => {
    axios
      .get( 
          `${APIROOT}/api/logout`,
          {
            headers: {
              // Cookie: `auth=${localStorage.getItem('token')}`,
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
      ).then(res => {
        console.log(res)

      window.open('/', '_self')
      })
  }
  componentDidMount() {

 axios
      .get( 
          `${APIROOT}/api/profile`,
          {
            headers: {
              // Cookie: `auth=${localStorage.getItem('token')}`,
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
      )
      .then((res) => {
        console.log(res);
        this.setState({ user: res.data});
      }); 
    this.fetchQuestions()
  }

  togglePopUp = () => {
    this.setState({
      isModalShown : !this.state.isModalShown
    })
  }

  render() {
    if (!localStorage.getItem("user")) {
        return <Redirect to="/" />;
      }
    return (
      <div>
        {
          this.state.isModalShown 
            ? <PostModal fetchQuestions={() => this.fetchQuestions()} togglePopUp={() => this.togglePopUp()}/>
            : <></>
        }
      <div className="card" style={{ background: "yellow" }}>
        
        <div className="header-row">
          <div></div>
        <h3 align="center">Question and Answers</h3>
        <div className="row-column">
        <h3>{this.state.user.name}</h3>
        <h4>{this.state.user.role}</h4>
        <button onClick={this.onLogoutClick} >LOGOUT</button>
        </div>
       
        </div>
        
        <button onClick={this.togglePopUp} className="post-btn">POST QUESTION</button>
        <ol>
          {this.state.questions.map((question, index) => {
            return (
              <div className="card-body">
                <li>
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
                    </div>
                    <div className="card-body">
                      <ol type="a">
                        {question.answers.map((answer, i) => {
                          return (
                            <div className="col">
                              <li>
                                <div className="col">{answer.answer}</div>
                                <div className="col">
                                  Replayed By :{" "}
                                  {answer.authorId.firstname +
                                    " " +
                                    answer.authorId.lastname}
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

export default juniorDashboard;
