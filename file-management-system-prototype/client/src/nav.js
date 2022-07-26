import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./nav.css"

class Nav extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      
    }
  }
  render() {
    return (
        <div className="header">
        
         <div className="header__option">
           {this.props.name}
         </div>
        
  
    
        <div className='account__address'>
          {this.props.address}
        </div>
        <div className="header__nav">
          
            <div className="header__option" >
              <span className="header__optionLineOne">
                Hello User
              </span>
              <Link to="/login">
              <span className="header__optionLineTwo">
                sign out
              </span>
              </Link>
            </div>
          
          
            <div className="header__option">
              <span className="header__optionLineOne">About</span>
              <span className="header__optionLineTwo">& Details</span>
            </div>
          
  
          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Account</span>
          </div>
          

        </div>
      </div>
    )
  }
}

export default Nav;