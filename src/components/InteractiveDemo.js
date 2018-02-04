import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Container, Divider, Button, Message } from 'semantic-ui-react';

// custom components
import ButtonThemes from './ButtonThemes'
import PopupThemes from './PopupThemes'
import NetworkSettings from './NetworkSettings'
import RequestTaxButton from './RequestTaxButton'

// helper functions
import { generateComponentCode, copyTextToClipboard } from '../utils/componentCodeHelpers'

class InteractiveDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "a",
      buttonClass: "requestTax-button-theme-1",
      buttonText: "Create a Request",
      label: "Theme 1",
      showIcon: false,
      iconSide: '',
      withPopup: true,
      messageToast: null
    }
    this.updateButtonState = this.updateButtonState.bind(this);
    this.copyCode = this.copyCode.bind(this);
    this.exportCode = this.exportCode.bind(this);
  }
  updateButtonState(oState) {
    this.setState({ ...oState }); // all child components (button themes, popupthemes, and network settings pass up parameters that corresponding with butotn state)
  }
  copyCode() {
    var sComponentString = generateComponentCode(this.state);
    let oStaticComponent;
    if(copyTextToClipboard(sComponentString)) {
      oStaticComponent = <Message compact color="green">
        Component code copied to clipboard!
      </Message>;
    } else {
      oStaticComponent = <Message compact color="red">
        Error with copying code to clipboard!
      </Message>;
    }
    this.setState({ messageToast: oStaticComponent });
    setTimeout(() => {
      this.setState({ messageToast: null });
    }, 2000);
  }
  exportCode() {
    var oElement = document.createElement("a");
    var sComponentString = generateComponentCode(this.state);
    var oFile = new Blob([sComponentString], {type: 'text/plain'});
    oElement.href = URL.createObjectURL(oFile);
    oElement.download = "RequestTaxButtonCustom.js";
    oElement.click();
  }
  render () {
    return (
      <div>
        <h1 className="rainbow-underlined">
          Interactive Demo
        </h1>
        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column>
              <ButtonThemes updateButtonState={this.updateButtonState}/>
            </Grid.Column>
            <Grid.Column>
              <PopupThemes updateButtonState={this.updateButtonState}/>
            </Grid.Column>
            <Grid.Column>
              <NetworkSettings updateButtonState={this.updateButtonState}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        <h2><span className="rainbow-underlined">Result:</span></h2>
        <Container className="buttonContainer">
          <RequestTaxButton {...this.state}/>
        </Container>
        <Divider />
        <Button onClick={this.copyCode}>Copy React Code</Button>
        <br/>
        <br/>
        <p>OR</p>
        <Button onClick={this.exportCode}>Export React Code</Button>
        <br/>
        { this.state.messageToast && this.state.messageToast }
      </div>
    );
  }
}

export default InteractiveDemo;
