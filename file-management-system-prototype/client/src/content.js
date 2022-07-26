import React, { Component } from 'react'
import "./content.css"

class Content extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
    
      }
    }
  render() {
    return (
      <div className='content'>
          <div className='content__items'>
              <div className='content__name'>
                  {this.props.name}
              </div>
              <div className='content__image'>
                  <img src={`https://ipfs.io/ipfs/${this.props.ipfsHash}`} alt=''></img>
              </div>
          </div>
      </div>
    )
  }
}

export default Content