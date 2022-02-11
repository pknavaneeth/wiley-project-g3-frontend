import React from "react";
import axios from "axios";

class studentqa extends React.Component {
  constructor(props) {
    super(props);
    this.state = { questions: [], noOfPages: 0, currentPage: 1 };
  }
  componentDidMount() {
    axios
      .get(
        "https://wiley-grp3-backend.herokuapp.com/api/get-question-answers?showAll=true&sortBy=createdAt&sortOrder=des&pageNo=1&perPage=10",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.NjFmZDQyMDBlYjVlY2ViMDI1ZDJjM2Fk.bzGtb8jBAmEl0DjJnzQvvf1RJlv4Z1QjfwO5loKm0ec`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        this.setState({
          questions: res.data.questions,
          noOfPages: res.data.noOfPages,
          currentPage: res.data.pageNo,
        });
      });
  }
  render() {
    return (
      <div className="card" style={{ background: "yellow" }}>
        <h3 align="center">Question and Answers</h3>
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
    );
  }
}

export default juniorDashboard;
