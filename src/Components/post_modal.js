import React from 'react';
import { APIROOT } from '../config';

import axios from "axios";
class PostModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            companies : [],
            question: '',
            selectedCompany : '',
            isLoading : false
        };
      }
      componentDidMount(){
        axios.get(`${APIROOT}/api/listcompanies`,
        {
          headers: {
            // Cookie: `auth=${localStorage.getItem('token')}`,
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }).then(res => {
            this.setState({
                companies : res.data
            })
        })
      }

      onInputChange = (e) => {
          this.setState({
              [e.target.name] : e.target.value
          })
      }

      onFormSubmit = (e) => {
          e.preventDefault()
          if(this.state.selectedCompany == '' || this.state.question == ''){
            window.alert('Fields cannot be empty ')
          }else{
            axios.post(`${APIROOT}/api/post-question`, {
                question : this.state.question,
                companyName: this.state.selectedCompany
            },
            {
              headers: {
                // Cookie: `auth=${localStorage.getItem('token')}`,
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }).then(res => {
                console.log(res)
                this.props.fetchQuestions();
                this.props.togglePopUp();
            })
          }
      }

      render(){
          return(
              <div className='modal-back'>
                  <div className='post-modal'>
                <div className='header-row'>
                <h3>Post your Question</h3>
                <button onClick={this.props.togglePopUp} className="close-btn">X</button>
                </div>
                  
                  <form onSubmit={this.onFormSubmit}>
                    <div className='form-group'>
                        <label>Select Company</label>
                        <select onChange={this.onInputChange} name="selectedCompany">
                            <option value="" >Select an option</option>
                            {
                                this.state.companies.map((company) => {
                                    return <option value={company}>{company}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Enter your Question</label>
                        <textarea onChange={this.onInputChange} name="question" placeholder='Question goes here......'></textarea>
                    </div>
                    <button className="post_button">POST</button>
                  </form>
              </div>
              </div>
          )
      }
}

export default PostModal