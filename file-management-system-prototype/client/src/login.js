import React, { Component } from 'react'
import {Link} from "react-router-dom"
import "./login.css";


class login extends Component {


  // componentDidUpdate() {
  //   window.history.pushState(null, document.title, window.location.href);
  //   window.addEventListener('popstate', function(event) {
  //     window.history.pushState(null, document.title, window.location.href);
  //   });
  // }

  render() {
    return (
        <div className="login">
        
        
        <div className="login__container">
          <h1>Sign-In</h1>
          <form>
            <h5>User Name</h5>
            <input
              type="text"
              
            />
  
            <h5>Password</h5>
            <input
              type="password"
              
            />
            <Link to="/user">
            <button className="login__signInButton" >
              Sign In As User
            </button>
            </Link>
            <Link to="/upload">
            <button className="login__signInButton" >
              Sign In As Data Upload Authority
            </button>
            </Link>
            <Link  to="/access">
            <button className="login__signInButton">
              Sign In As Data Access Authority
            </button>
            </Link>
          </form>
          <p>
            By signing-in you agree to the Data Sharing and management Conditions of Use 
            . Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>
          <button className="login__registerButton" >
            Create your Account
          </button>
        </div>
      </div>
    )
  }
}

export default login;