import React from 'react'

import axios from "axios";
import {APIROOT} from '../../config.js'
import { Redirect , NavLink} from "react-router-dom";

class OtherDashboard extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            user: {}
        }
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
  
    render(){ 
        if (!localStorage.getItem("user")) {
            return <Redirect to="/" />;
          }
        return <div>
            <h1>Dashboard for {this?.state?.user?.role?.toUpperCase()}</h1>
            <p>PAGE NOT ReADY</p>
            <h3>Username - {this?.state?.user?.name}</h3>
        <button onClick={this.onLogoutClick} >LOGOUT</button>
            </div>
    }
}

export default OtherDashboard