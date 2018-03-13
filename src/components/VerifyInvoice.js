import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Modal, Form } from 'semantic-ui-react';
import { keccak256 } from 'js-sha3';
var Web3 = require('web3');

// custom images
let request = require("../images/request.png");

// connect to ethereum network (local ganache) and access the contract
// var web3 = new Web3("ws://localhost:7545"); // local ganache
// const jsonInterface = JSON.parse('[ { "constant": false, "inputs": [ { "name": "_requestorRequestId", "type": "address" }, { "name": "_invoiceHash", "type": "uint256" } ], "name": "validateInvoice", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "invoiceHashToPayeeId", "outputs": [ { "name": "requestId", "type": "address" }, { "name": "isValue", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "constructorString", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "invoiceHashToPayerId", "outputs": [ { "name": "requestId", "type": "address" }, { "name": "isValue", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_payeeRequestId", "type": "address" }, { "name": "_payerRequestId", "type": "address" }, { "name": "_invoiceHash", "type": "uint256" } ], "name": "storeInvoiceSimple", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "bStored", "type": "bool" } ], "name": "InvoiceStored", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "bValid", "type": "bool" } ], "name": "InvoiceValid", "type": "event" } ]');
// const address = "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe";
// var InvoicingContract = new web3.eth.Contract(jsonInterface, address);
// InvoicingContract.deploy();

let web3;
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
const jsonInterface = JSON.parse('[ { "constant": false, "inputs": [ { "name": "_requestorRequestId", "type": "address" }, { "name": "_invoiceHash", "type": "uint256" } ], "name": "validateInvoice", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "invoiceHashToPayeeId", "outputs": [ { "name": "requestId", "type": "address" }, { "name": "isValue", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "invoiceHashToPayerId", "outputs": [ { "name": "requestId", "type": "address" }, { "name": "isValue", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_payeeRequestId", "type": "address" }, { "name": "_payerRequestId", "type": "address" }, { "name": "_invoiceHash", "type": "uint256" } ], "name": "storeInvoiceSimple", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "bStored", "type": "bool" } ], "name": "InvoiceStored", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "bValid", "type": "bool" } ], "name": "InvoiceValid", "type": "event" } ]');
var InvoicingContract = web3.eth.contract(jsonInterface);

// InvoicingContract.events.InvoiceValid(function(error, result) {
//     if (!error) {
//         console.log(result);
//     } else {
//         console.log("Error: " + error);
//     }
// });

class VerifyInvoice extends React.Component {
  constructor() {
    super();
    this.state = {
      sRequestId: "",
      bRequestorIdModalOpen: false,
      bMessageModalOpen: false,
      sMessage: "",
      bRequestorIdError: false,
      oInvoiceFile: {},
      bContractInputError: false
    }
    this.onChangeInvoiceFileInput = this.onChangeInvoiceFileInput.bind(this);
    this.onCloseRequestorIdModal = this.onCloseRequestorIdModal.bind(this);
    this.verifyInvoice = this.verifyInvoice.bind(this);
    this.onChangeRequestId = this.onChangeRequestId.bind(this);
    this.onCloseMessageModal = this.onCloseMessageModal.bind(this);
    this.handleChangeContractAddress = this.handleChangeContractAddress.bind(this);
    this.closeRequestorIdModal = this.closeRequestorIdModal.bind(this);
  }
  handleChangeContractAddress(event){
    this.setState({contractAddress: event.target.value});
  }
  onChangeInvoiceFileInput(event) {
    if (web3.isAddress(this.state.contractAddress)) {
      this.setState({bContractInputError: true});
      return; // can't go any further without a proper contract address
    }
    this.setState({bRequestorIdModalOpen: true, oInvoiceFile: event.target.files[0]});
  }
  closeRequestorIdModal() {
    this.setState({bRequestorIdModalOpen: false});
  }
  onCloseRequestorIdModal() {
    if (this.state.sRequestId !== "") {
      this.setState({bRequestorIdError: false});
      this.verifyInvoice(); // we can go ahead and attempt to verify the uploaded invoice
    } else {
      this.setState({bRequestorIdError: true});
    }
  }
  onCloseMessageModal() {
    this.setState({bMessageModalOpen: false});
  }
  verifyInvoice() {
     var reader = new FileReader();
     var InvoicingContractInstance = InvoicingContract.at(this.state.contractAddress);
     var invoiceValidEvent = InvoicingContractInstance.InvoiceValid();
     // register event before calling function
     invoiceValidEvent.watch(function(error, result) {
       console.log(error);
       console.log(result);
       if (!error) {
         if (result.args.bValid) {
           that.setState({sMessage: "This is a valid invoice for the given Request ID!"});
         } else {
           that.setState({sMessage: "The invoice could not be found or you are not an owner of the invoice."});
         }
       } else {
         that.setState({sMessage: error});
       }
       that.setState({bRequestorIdModalOpen: false, bMessageModalOpen: true, sRequestId: ""});
     });
     var that = this;
     reader.readAsDataURL(this.state.oInvoiceFile);
     reader.onload = function () {
       console.log(reader.result);
       let base64Hash = web3.sha3(reader.result);
       console.log(that.state.oInvoiceFile.fileName);
       console.log(base64Hash);
       InvoicingContractInstance.validateInvoice.sendTransaction(that.state.sRequestId, base64Hash, {from: that.state.sRequestId});
     };
     reader.onerror = function (error) {
       console.log('Error: ', error);
     };
  }
  onChangeRequestId(event) {
    this.setState({sRequestId: event.target.value});
  }
  render () {
    var oRequestorIdModal = <Modal size="small" open={this.state.bRequestorIdModalOpen}>
      <Modal.Header>Request ID</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Group widths='equal'>
                <Form.Input
                  label="Your Request ID as payee or payer"
                  placeholder="0xd707fc7be44ef31b7dc7ff5715fe7a5e1fcd6f74"
                  value={this.state.sRequestId}
                  onChange={this.onChangeRequestId}
                  error={this.state.bRequestorIdError}
                  />
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
      <Modal.Actions>
        <Button secondary onClick={this.closeRequestorIdModal}>
          Cancel
        </Button>
        <Button secondary onClick={this.onCloseRequestorIdModal}>
          OK
        </Button>
      </Modal.Actions>
    </Modal>
    var oMessageModal = <Modal size="small" open={this.state.bMessageModalOpen}>
      <Modal.Header>Request ID</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p style={{color:'#262626'}}>{this.state.sMessage}</p>
          </Modal.Description>
        </Modal.Content>
      <Modal.Actions>
        <Button secondary onClick={this.onCloseMessageModal}>
          OK
        </Button>
      </Modal.Actions>
    </Modal>
    var oFileInput = <input style={{visibility: 'hidden'}} type="file" name="file" id="file" onChange={this.onChangeInvoiceFileInput}/>;
    return (
      <div>
        <h1 className="rainbow-underlined">
          Verify Invoice
        </h1>
        <br/>
        <Form>
          <Form.Field>
            <Form.Input
              label='Invoicing Contract Address'
              placeholder='0x010c2c4cb112d34e8b9375d045dad57e873abefc'
              value={this.state.contractAddress}
              onChange={this.handleChangeContractAddress}
              style={{width:'24rem'}}
              error={this.state.bContractInputError}
              />
          </Form.Field>
        </Form>
        <p>Verify an invoice that was issued on the Request Network:</p>
        <br/>
        <label htmlFor="file">
          <a className="requestTax-button-theme-3" onClick={this.onClickVerify}>
            <span><img src={request} height="30px" style={{marginRight:'18px'}}/>Verify Invoice</span>
          </a>
        </label>
        <div>
          {oFileInput}
        </div>
        <br/>
        {oRequestorIdModal}
        {oMessageModal}
      </div>
    );
  }
}

export default VerifyInvoice;
