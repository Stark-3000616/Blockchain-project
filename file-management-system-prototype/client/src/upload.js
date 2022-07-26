import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import ipfs from "./ipfs";
import Nav from "./nav";
import "./upload.css";

class Upload extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      doc: null,
      web3: null,
      buffer: null,
      account: null
    }
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setName = this.setName.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)
    
    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      console.log(accounts)
      simpleStorage.deployed().then((instance) => {
        this.simpleStorageInstance = instance
        this.setState({ account: accounts[0] })
        // Get the value from the contract to prove it worked.
        
      })
    })
  }

  captureFile(event) {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  setName(event){
    event.preventDefault()
    const name = event.target.value
    this.setState({name: name})
  }

  onSubmit(event) {
    event.preventDefault()
    ipfs.files.add(this.state.buffer, (error, result) => {
      if(error) {
        console.error(error)
        return
      }
      console.log('ipfsHash', result[0].hash)
      this.simpleStorageInstance.set(this.state.name, result[0].hash, { from: this.state.account }).then((r) => {

      })
    })
  }


  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div className="App">
        <Nav name = "Data Upload" address =  {this.state.account} />
        <h1>Data Upload Authority</h1>
        <p>This file is stored on ipfs and the Ethereum Blockchain for the user!</p>

        <h2>Upload File</h2>
        <form id="form-main" onSubmit={this.onSubmit}>
          <input type='text' id="file-name" placeholder='File name'  onChange={this.setName} />
          <div id="select" >
          <input type='file' onChange={this.captureFile} />
          </div>
          <input type='submit' id="submit" />

        </form>
        
      </div>
    );
  }
}

export default Upload;
