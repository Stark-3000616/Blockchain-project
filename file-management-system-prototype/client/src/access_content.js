import React, { Component } from 'react'
import Content from './content'

class Access_content extends Component {
  render() {
    return (
        <div>
        <Content name = "Marksheet"/>
        <Content name = "Birth Certificate" />
        <Content name = "Passbook"/>
        </div>
    )
  }
}

export default Access_content