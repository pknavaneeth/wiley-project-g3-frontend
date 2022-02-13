import React from "react";
import { APIROOT } from "../config";

import axios from "axios";
class PostAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      questionId: this.props.question.id,
      isLoading: false,
      answer: "",
    };
  }
  componentDidMount() {
    axios
      .get(`${APIROOT}/api/listcompanies`, {
        headers: {
          // Cookie: `auth=${localStorage.getItem('token')}`,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        this.setState({
          companies: res.data,
        });
      });
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.selectedCompany == "" || this.state.question == "") {
      window.alert("Fields cannot be empty ");
    } else {
      axios
        .post(
          `${APIROOT}/api/post-answer`,
          {
            questionId: this.state.questionId,
            answer: this.state.answer,
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
          this.props.fetchQuestions();
          this.props.togglePopUp();
        });
    }
  };

  render() {
    return (
      <div className="modal-back">
        <div className="post-modal">
          <div className="header-row">
            <h3>Post your Answer</h3>
            <button onClick={this.props.togglePopUp} className="close-btn">
              X
            </button>
          </div>

          <form onSubmit={this.onFormSubmit}>
            <div className="form-group">
              <label>Question</label>
              <label> {this.props.question.question}</label>
            </div>
            <div className="form-group">
              <label>Enter your Answer</label>
              <textarea
                onChange={this.onInputChange}
                name="answer"
                placeholder="Your response goes here......"
              ></textarea>
            </div>
            <button className="post_button">POST</button>
          </form>
        </div>
      </div>
    );
  }
}

export default PostAnswer;
