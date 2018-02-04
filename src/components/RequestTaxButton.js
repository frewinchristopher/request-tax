import React from 'react'
import PropTypes from 'prop-types'
import { Popup, Modal, Button } from 'semantic-ui-react';


// custom images
let request = require("../images/request.png");

class RequestTaxButton extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }
  openModal() {
    this.setState({modalOpen: true});
  }
  closeModal() {
    this.setState({modalOpen: false});
  }
  render () {
    console.log(this.state);
    let ButtonPart;
    if (this.props.withPopup) {
      ButtonPart = <a className={this.props.buttonClass}>
        <span>{this.props.showIcon && this.props.iconSide === 'left' && <img src={request} height="30px" style={{marginRight:'18px'}}/>} {this.props.buttonText} {this.props.showIcon && this.props.iconSide === 'right' && <img src={request} height="30px" style={{marginLeft:'18px'}}/>}</span>
      </a>;
    } else { // we need an onclick function for the modal
      ButtonPart = <a className={this.props.buttonClass} onClick={this.openModal}>
        <span>{this.props.showIcon && this.props.iconSide === 'left' && <img src={request} height="30px" style={{marginRight:'18px'}}/>} {this.props.buttonText} {this.props.showIcon && this.props.iconSide === 'right' && <img src={request} height="30px" style={{marginLeft:'18px'}}/>}</span>
      </a>;
    }
    return (
      <div>
      { this.props.withPopup &&
      <Popup
        trigger={ButtonPart}
        content={<h1>test working!</h1>}
        on='click'
        position='top right'
      /> }
      { !this.props.withPopup &&
        <div>
        {ButtonPart}
        <Modal size="small" open={this.state.modalOpen} onClose={this.closeModal}>
            <Modal.Header>
              Details
            </Modal.Header>
            <Modal.Content>
              <p>The following tax applies:</p>
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={this.closeModal}>
                Cancel
              </Button>
              <Button positive onClick={this.closeModal}>
                Accept
              </Button>
            </Modal.Actions>
          </Modal>
        </div> }
        </div>
    );
  }
}

export default RequestTaxButton;
