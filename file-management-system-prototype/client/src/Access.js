import React, { Component } from 'react';
import "./Access.css";
import Nav from './nav';
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import Content from './content';

class Access extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       listShow: 0,
       doc: null,
       account: null,
       web3: null,
       search: ''
    }
    this.listDisplay = this.listDisplay.bind(this);
    this.closeList = this.closeList.bind(this);
    this.setUser = this.setUser.bind(this);
  }


  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
      .then((results) => {
        this.setState({
          web3: results.web3,
        });

        // Instantiate contract once web3 provided.
        this.instantiateContract();
      })
      .catch(() => {
        console.log("Error finding web3.");
      });
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require("truffle-contract");
    const simpleStorage = contract(SimpleStorageContract);
    simpleStorage.setProvider(this.state.web3.currentProvider);

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      console.log(accounts);
      simpleStorage.deployed().then((instance) => {
        this.simpleStorageInstance = instance;
        this.setState({ account: accounts[0] });
        // Get the value from the contract to prove it worked.

        this.simpleStorageInstance.getForAuthority({ from: this.state.account }).then((data) => {
          // Update state with the result.
          console.log(data);
          this.setState({ doc: data });
        });
      });
    });
  }

  listDisplay(event){
    event.preventDefault()
    if(this.state.search == "0xcC65489E408640587AAB88c0ec6dD769B6Da9fd7")
      this.setState({listShow: 1})
    else alert("No user Exist")

  }
  closeList(event){
    event.preventDefault()
    this.setState({listShow: 0})
  }

  setUser(event){
    event.preventDefault();
    const search = event.target.value;
    this.setState({search: search});
  }

  render() {
    if (this.state.listShow) {
      return <div>
        <Nav name = "Data Access" address = {this.state.account} />
        {this.state.doc.map(temp =>(
          <Content name={temp.name} ipfsHash={temp.ipfsHash} />
        ))}
      <button id='close-button' onClick={this.closeList}>
        Back
      </button>
      </div>;
    }
    return (
      <div>
        <Nav name = "Data Access" address = {this.state.account} />
        <div id='search-box'>
          <input type="text" placeholder='User Account Address' id="input-area" onChange={this.setUser}/>
          <div>
          <button id='submit-button' onClick={this.listDisplay}>
            Submit
          </button>
          </div>
        </div>
        
      </div>
    )
  }
}

export default Access;