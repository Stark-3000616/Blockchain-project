import React, { Component } from "react";
import Nav from "./nav";
import Content from "./content";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import ipfs from "./ipfs";
import getWeb3 from "./getWeb3";

import "./user.css"

export class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doc: null,
      web3: null,
      account: null,
    };
    this.grantAccess = this.grantAccess.bind(this);
    this.revokeAccess = this.revokeAccess.bind(this);
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

        this.simpleStorageInstance.get({ from: this.state.account }).then((data) => {
          // Update state with the result.
          console.log(data);
          this.setState({ doc: data });
        });
      });
    });
  }

  grantAccess(){
    this.simpleStorageInstance.grant({from: this.state.account});
    alert("Granted access to Access Authority");
  }

  revokeAccess(){
    this.simpleStorageInstance.revoke({from: this.state.account});
    alert("Access Revoked from Access Authority");
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    if (!this.state.doc) {
      return (
        <div>
          <Nav name="USER" address={this.state.account} />
          No Content.........
        </div>
      );
    }
    return (
      <div>
        <Nav name="USER" address={this.state.account} />
        {this.state.doc.map((temp) => (
          <Content name={temp.name} ipfsHash={temp.ipfsHash} />
        ))}

        <button id="grant-permission" onClick={this.grantAccess}>
          Grant permission
        </button>

        <button id="grant-permission" onClick={this.revokeAccess}>
          Revoke permission
        </button>

      </div>
    );
  }
}

export default User;
