import React from 'react'
import PropTypes from 'prop-types'
import { Popup, Modal, Button, Form, Input, Icon, Dropdown, Divider, Accordion } from 'semantic-ui-react';
import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';
import { keccak256 } from 'js-sha3';

// custom (local) imports
// import dd from '../assets/invoiceDD';
import injectFieldsIntoInvoice from '../utils/helpers';

// requires
const fs = require('fs');
var Web3 = require('web3');

// add virtual fonts for pdfMake
const { vfs } = vfsFonts.pdfMake;
pdfMake.vfs = vfs;

// custom images
let request = require("../images/request.png");

// connect to ethereum network (local ganache) and access the contract

// web3js 1.0 version
// var web3 = new Web3("ws://localhost:7545"); // local ganache
// const jsonInterface = JSON.parse('[ { "constant": false, "inputs": [ { "name": "_requestorRequestId", "type": "address" }, { "name": "_invoiceHash", "type": "uint256" } ], "name": "validateInvoice", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "invoiceHashToPayeeId", "outputs": [ { "name": "requestId", "type": "address" }, { "name": "isValue", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "constructorString", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "invoiceHashToPayerId", "outputs": [ { "name": "requestId", "type": "address" }, { "name": "isValue", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_payeeRequestId", "type": "address" }, { "name": "_payerRequestId", "type": "address" }, { "name": "_invoiceHash", "type": "uint256" } ], "name": "storeInvoiceSimple", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "bStored", "type": "bool" } ], "name": "InvoiceStored", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "bValid", "type": "bool" } ], "name": "InvoiceValid", "type": "event" } ]');
// var InvoicingContract = new web3.eth.Contract(jsonInterface, '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', gasPrice: '20000000000'});
// InvoicingContract.deploy();

// web3js 0.20.6 version
let web3;
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
const jsonInterface = JSON.parse('[ { "constant": false, "inputs": [ { "name": "_requestorRequestId", "type": "address" }, { "name": "_invoiceHash", "type": "uint256" } ], "name": "validateInvoice", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "invoiceHashToPayeeId", "outputs": [ { "name": "requestId", "type": "address" }, { "name": "isValue", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "invoiceHashToPayerId", "outputs": [ { "name": "requestId", "type": "address" }, { "name": "isValue", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_payeeRequestId", "type": "address" }, { "name": "_payerRequestId", "type": "address" }, { "name": "_invoiceHash", "type": "uint256" } ], "name": "storeInvoiceSimple", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "bStored", "type": "bool" } ], "name": "InvoiceStored", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "bValid", "type": "bool" } ], "name": "InvoiceValid", "type": "event" } ]');
var InvoicingContract = web3.eth.contract(jsonInterface);

const cryptoCurrencyOptions = [ { key: 'ETH', value: 'ETH', text: 'ETH' },
{ key: 'BTC', value: 'BTC', text: 'BTC' },
{ key: 'NANO', value: 'NANO', text: 'NANO' }
];

class RequestTaxButton extends React.Component {
  constructor() {
    super();
    this.state = {
      payeeID: "",
      payerID: "",
      description: "",
      amount: "",
      sCryptoCurrency: "ETH",
      bFullSenderAddress: false,
      bFullReceiverAddress: false,
      bRequestErrorModalOpen: false,
      bPayWithRequestModalOpen: false,
      stateAddress: "0x1bc3850619803C48b79481A3Aee167141be20432",
      stateAddressDescription: "New York State Department of Taxation and Finance",
      taxPercent: 20,
      taxDescription: "Value Added Tax United Kingdom",
      bAccordianSender: false,
      bAccordianReceiver: false,
      bContractErrorModalOpen: false
      // uniqInvoiceId --> global nonce generated at client
      // toCompanyName --> client
      // toCompanyStreet --> client
      // toCompanyCity --> client
      // toCompanyZIP --> client
      // toCompanyStateDistrict --> client
      // toCompanyCountry --> client
      // toCompanyTelephone --> client
      // fromCompanyName --> client
      // fromCompanyStreet --> client
      // fromCompanyContactPerson --> client
      // fromCompanyTelephone --> client
      // description --> client
      // supplyDate --> client
      // invoiceDate --> client
      // amount --> client
      // VATAmount --> client, but determined
      // totalAmount --> client calculated
      // generatedDateTime --> at submission time
      // pdfVersion --> client, reverse compatible, specific per company - may be difficult to inject fields?
      // pdfBase64 --> compiled pdfVersion
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeCryptoCurrency = this.onChangeCryptoCurrency.bind(this);
    this.onClickAccordian = this.onClickAccordian.bind(this);
    this.onCloseRequestErrorModal = this.onCloseRequestErrorModal.bind(this);
    this.openRequestErrorModal = this.openRequestErrorModal.bind(this);
    this.isSimpleFormValid = this.isSimpleFormValid.bind(this);
    this.isComplexFormValid = this.isComplexFormValid.bind(this);
    this.onChangeFormField = this.onChangeFormField.bind(this);
    this.submitInvoiceHash = this.submitInvoiceHash.bind(this);
    this.onCloseMessageModal = this.onCloseMessageModal.bind(this);
    this.onCloseContractErrorModal = this.onCloseContractErrorModal.bind(this);
  }
  openModal() {
    this.setState({bPayWithRequestModalOpen: true});
  }
  closeModal() {
    this.setState({bPayWithRequestModalOpen: false});
  }
  onClickSubmit() {
    if (!web3.isAddress(this.props.contractAddress)) {
      this.setState({bContractErrorModalOpen: true});
      return;
    }
    // generate and open invoice as pdf
    if (this.isSimpleFormValid()) {
      // ok great, now inject state fields into document definition before building dd
      console.log(this.state);
      var data;
      var that = this;
      const dd = injectFieldsIntoInvoice(this.state.payeeID, this.state.payerID, this.state.description, this.state.amount, this.state.taxPercent, this.state.sCryptoCurrency);
      const oPDF = pdfMake.createPdf(dd);
      // oPDF.open();
      // oPDF.download('invoice_' + Date.now().toString() + '.pdf');
      oPDF.getBase64(function(encodedString) {
          let sBase64String = "data:application/pdf;base64," + encodedString;
          console.log(sBase64String);
          var hiddenElement = document.createElement('a');
          hiddenElement.href = sBase64String;
          hiddenElement.target = '_blank';
          hiddenElement.download = 'invoice_' + Date.now().toString() + '.pdf';
          hiddenElement.click();
          let base64Hash = web3.sha3(sBase64String); // encodedString comes without this important prepend
          console.log(base64Hash);
          that.submitInvoiceHash(base64Hash);
      });
      this.closeModal();
    } else { // open the error modal propting what the user has to do
      this.openRequestErrorModal(); // some fucked state error, no idea why it keeps automatically closing
    }
  }
  submitInvoiceHash(base64Hash) {
    var InvoicingContractInstance = InvoicingContract.at(this.props.contractAddress); // set the contract instance according to network settings
    var invoiceStoredEvent = InvoicingContractInstance.InvoiceStored();
    var that = this;
    // make sure the event is regestered before calling the method
    invoiceStoredEvent.watch(function(error, result) {
      if (!error) {
        if (result.args.bStored) {
          that.setState({sMessage: "Invoice successfully stored on the Request Network."});
        } else {
          that.setState({sMessage: "Error storing the invoice on the Request Network."});
        }
      } else {
        that.setState({sMessage: "Unknown error storing the invoice on the Request Network."});
      }
      that.setState({bMessageModalOpen: true});
    });
    InvoicingContractInstance.storeInvoiceSimple.sendTransaction(this.state.payeeID, this.state.payerID, base64Hash, {from: this.state.payeeID});
  }
  isSimpleFormValid() {
    return Boolean(this.state.payeeID !== "" && this.state.payerID !== "" && this.state.description !== "" && this.state.amount !== "", this.state.sCryptoCurrency !== "");
  }
  isComplexFormValid() {

  }
  onChangeAmount(event) {
    let bErrorInConversion = false;
    if (event.target.value === "") { // reset input state
      this.setState({amountError: false});
    } else if (event.target.value) { // see if it is actually a float
      try {
        parseFloat(event.target.value)
      } catch(e) {
        bErrorInConversion = true;
      }
      if (bErrorInConversion) {
        this.setState({amountError: true});
      } else {
        this.setState({amount: event.target.value});
      }
    }
  }
  onChangeCryptoCurrency(event) {
    this.setState({sCryptoCurrency: event.target.textContent}); // warning for older than IE 9... but they they shoudlnt' be dealing with crypto anyway right
  }
  onClickAccordian(iAccordian) {
    if (iAccordian === 0) {
      this.setState({bAccordianSender: !this.state.bAccordianSender});
    } else {
      this.setState({bAccordianReceiver: !this.state.bAccordianReceiver});
    }
  }
  openRequestErrorModal() {
    console.log("opening modal...");
    this.setState({bRequestErrorModalOpen: true});
  }
  onCloseRequestErrorModal() {
    console.log("closing modal...");
    this.setState({bRequestErrorModalOpen: false});
  }
  onCloseContractErrorModal() {
    this.setState({bContractErrorModalOpen: false});
  }
  onCloseMessageModal() {
    this.setState({bMessageModalOpen: false});
  }
  onChangeFormField(event, oInput) {
    var buildStateObj = function() {
      var oReturnObj = {};
      oReturnObj[oInput.id] = oInput.value;
         return oReturnObj;
    };
    this.setState( buildStateObj );
  }
  render() {
    console.log(this.state);
    let ButtonPart, popupContent, payWithRequestModal, sStateAddressEtherscanLink, requestErrorModal, messageModal, contractErrorModal;
    let sTotalPrice;
    if (this.state.amount) {
      sTotalPrice = (this.state.amount * (1 + (this.state.taxPercent / 100))).toString(); // float for price including tax
    } else {
      sTotalPrice = "0";
    }
    sStateAddressEtherscanLink = "https://etherscan.io/address/" + this.state.stateAddress;
    if (this.props.withPopup) {
      ButtonPart = <a className={this.props.buttonClass}>
        <span>{this.props.showIcon && this.props.iconSide === 'left' && <img src={request} height="30px" style={{marginRight:'18px'}}/>} {this.props.buttonText} {this.props.showIcon && this.props.iconSide === 'right' && <img src={request} height="30px" style={{marginLeft:'18px'}}/>}</span>
      </a>;
      popupContent = <h1>{this.props.buttonText}</h1>;
    } else { // we need an onclick function for the modal
      ButtonPart = <a className={this.props.buttonClass} onClick={this.openModal}>
        <span>{this.props.showIcon && this.props.iconSide === 'left' && <img src={request} height="30px" style={{marginRight:'18px'}}/>} {this.props.buttonText} {this.props.showIcon && this.props.iconSide === 'right' && <img src={request} height="30px" style={{marginLeft:'18px'}}/>}</span>
      </a>;

      requestErrorModal = <Modal size="small" open={this.state.bRequestErrorModalOpen}>
        <Modal.Header>Request Error</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p style={{color:'#262626'}}>One or more of the required fields is empty or invalid.</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary onClick={this.onCloseRequestErrorModal}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>

      messageModal = <Modal size="small" open={this.state.bMessageModalOpen}>
        <Modal.Header>Invoice Storage Response</Modal.Header>
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

      contractErrorModal = <Modal size="small" open={this.state.bContractErrorModalOpen}>
        <Modal.Header>Invoice Storage Response</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p style={{color:'#262626'}}>{this.state.sMessage}</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary onClick={this.onCloseContractErrorModal}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>

      payWithRequestModal = <Modal size="small" open={this.state.bPayWithRequestModalOpen} onClose={this.closeModal} closeIcon>
          <Modal.Header>
            {this.props.buttonText}
            <br/>
            {new Date().toLocaleString()}
          </Modal.Header>
          <Modal.Content>
            <h2 style={{color:'#262626'}}>Sender's (Payee's) Information</h2>
              <Form>
                <Form.Group widths='equal'>
                  <Form.Input
                    id="payeeID"
                    label="Request ID"
                    placeholder="0xd707fc7be44ef31b7dc7ff5715fe7a5e1fcd6f74"
                    value={this.state.payeeID}
                    onChange={this.onChangeFormField}
                    />
                </Form.Group>
              </Form>
            <Accordion>
              <Accordion.Title active={this.state.bAccordianSender} index={0} onClick={() => this.onClickAccordian(0)}>
                <Icon name='dropdown' />
                If unknown, full name and address here
              </Accordion.Title>
              <Accordion.Content active={this.state.bAccordianSender}>
                <Form>
                  <Form.Group widths='equal'>
                    <Form.Input
                      label="Company Name"
                      placeholder="Apple"
                      />
                    <Form.Input
                      label="Street"
                      placeholder="1 Infinite Loop"
                      />
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Input
                      label="City"
                      placeholder="Cupertino"
                      />
                      <Form.Input
                        label="State/District"
                        placeholder="California"
                        />
                    <Form.Input
                      label="ZIP"
                      placeholder="95014"
                      />

                  </Form.Group>
                  <Form.Group widths='equal'>

                      <Form.Input
                        label="Telephone"
                        placeholder="1-408-996-1010"
                        />
                    <Form.Input
                      label="Country"
                      placeholder="United States"
                      />
                  </Form.Group>
                </Form>
              </Accordion.Content>
            </Accordion>
            <h2 style={{color:'#262626'}}>Receiver's (Payer's) Information</h2>
              <Form>
                <Form.Group widths='equal'>
                  <Form.Input
                    id="payerID"
                    label="Request ID"
                    placeholder="0xd707fc7be44ef31b7dc7ff5715fe7a5e1fcd6f74"
                    value={this.state.payerID}
                    onChange={this.onChangeFormField}
                    />
                </Form.Group>
              </Form>
              <Accordion>
                <Accordion.Title active={this.state.bAccordianReceiver} index={1} onClick={() => this.onClickAccordian(1)}>
                  <Icon name='dropdown' />
                  If unknown, the full name and address here
                </Accordion.Title>
                <Accordion.Content active={this.state.bAccordianReceiver}>
                  <Form>
                    <Form.Group widths='equal'>
                      <Form.Input
                        label="Company Name"
                        placeholder="Google"
                        />
                      <Form.Input
                        label="Street"
                        placeholder="500 W 2nd St Suite 2900"
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Input
                        label="City"
                        placeholder="Austin"
                        />
                        <Form.Input
                          label="State/District"
                          placeholder="Texas"
                          />
                      <Form.Input
                        label="ZIP"
                        placeholder="78701"
                        />

                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Input
                        label="Telephone"
                        placeholder="1-512-343-5283"
                        />
                      <Form.Input
                        label="Country"
                        placeholder="United States"
                        />
                    </Form.Group>
                  </Form>
                </Accordion.Content>
              </Accordion>
              <h2 style={{color:'#262626'}}>Transaction</h2>
              <Form>
              <Form.Group widths='equal'>
                 <Form.Input
                   id="description"
                   label="Subject/Description of goods/services:"
                   placeholder="Description..."
                   onChange={this.onChangeFormField}
                   />
               </Form.Group>
               <Form.Group widths='equal'>
                    <Form.Input
                      id="amount"
                      label="Request Amount"
                      placeholder="1.234"
                      value={this.state.amount}
                      error={this.state.amountError}
                      onChange={this.onChangeFormField}
                      />
                    <Form.Dropdown label="Currency" defaultValue={this.state.sCryptoCurrency} selection placeholder='Select...' options={cryptoCurrencyOptions} onChange={this.onChangeCryptoCurrency}/>
                  </Form.Group>
                <Form.Group>
                  <span style={{color:'#262626'}}>
                    VAT<b>*</b>: <b>{this.state.taxPercent.toString()}%</b>
                  </span>
                </Form.Group>
                <Form.Group>
                  <sup style={{color:'#262626'}}>
                  <Icon name='check circle' color="green"/> <span style={{color:'green'}}>Verified:</span> {this.state.taxDescription} <a style={{color:'#1C76C0',textDecoration:'underlined'}} href="#wrong-tax-amount">(wrong?)</a>
                  </sup>
                </Form.Group>
                 <Form.Group>
                   <span style={{color:'#262626'}}>
                     Total: {sTotalPrice} {this.state.sCryptoCurrency}
                   </span>
                 </Form.Group>
               </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button secondary onClick={this.closeModal}>
              Cancel
            </Button>
            <Button primary onClick={() => this.onClickSubmit()}>
              {this.props.buttonText + ' with generated VAT invoice'}
            </Button>

          </Modal.Actions>
        </Modal>
    }
    return (
      <div>
      { this.props.withPopup &&
      <Popup
        trigger={ButtonPart}
        content={popupContent}
        on='click'
        position='top right'
      /> }
      { !this.props.withPopup &&
        <div>
        {ButtonPart}
        {payWithRequestModal}
        {requestErrorModal}
        {messageModal}
        </div> }
        </div>
    );
  }
}

export default RequestTaxButton;
