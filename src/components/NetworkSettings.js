import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Form, Radio, Checkbox } from 'semantic-ui-react';

class NetworkSettings extends React.Component {
  constructor() {
    super();
    this.state = {
      testVsMainValue: 'testnet',
      visualSettings: [],
      showConfirmations: false,
      showFromLocation: false,
      showVATPercentage: false,
      showVATAmount: false
    };
    this.handleChangeTestVsMain = this.handleChangeTestVsMain.bind(this);
    this.handleChangeOtherSettings = this.handleChangeOtherSettings.bind(this);

  }
  handleChangeTestVsMain(e, value) {
    console.log(value.value);
    switch(value.value) {
      case 'testnet':
        this.setState({ testVsMainValue: value.value});
        break;
      case 'mainnet':
        this.setState({ testVsMainValue: value.value });
        break;
    }
  }
  handleChangeOtherSettings(e, value) {
    console.log(e);
    console.log(value.label);
    var aVisualSettings = this.state.visualSettings;
    if (value.checked) {
      aVisualSettings.push(value.label);
    } else {
      aVisualSettings.filter((sSetting) => {
        sSetting !== value.label
      });
    }
    this.setState({visualSettings: aVisualSettings});
  }
  render () {
    var aList = [];
    console.log(this.state.visualSettings);
    this.state.visualSettings.forEach((sSetting) => {
      aList.push();
    });
    if (aList) {
      aList = aList.slice(0,-2); // remove the last ", "
    } else {
      aList = "(None selected)";
    }
    return (
      <div>
        <h2><span className="rainbow-underlined">Network Settings</span></h2>
          <Form>
          <Form.Field>
            Main vs. Testnet: <b>{this.state.label}</b>
          </Form.Field>
          <Form.Field>
            <Radio
              label='Testnet'
              name='radioGroup'
              value='testnet'
              checked={this.state.testVsMainValue === 'testnet'}
              onChange={this.handleChangeTestVsMain}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Mainnet'
              name='radioGroup'
              value='mainnet'
              checked={this.state.testVsMainValue === 'mainnet'}
              onChange={this.handleChangeTestVsMain}
            />
          </Form.Field>
          </Form>
          <Form>
            Other Settings: <b>{aList}</b>
            <Form.Field>
              <Checkbox
                label='A'
                name='checkboxGroup'
                value='a'
                checked={this.state.showFromLocation}
                onChange={this.handleChangeOtherSettings}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                label='B'
                name='checkboxGroup'
                value='b'
                checked={this.state.showFromLocation}
                onChange={this.handleChangeOtherSettings}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                label='C'
                name='checkboxGroup'
                value='c'
                checked={this.state.showConfirmations}
                onChange={this.handleChangeOtherSettings}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                label='D'
                name='checkboxGroup'
                value='d'
                checked={this.state.showVATPercentage}
                onChange={this.handleChangeOtherSettings}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                label='E'
                name='checkboxGroup'
                value='e'
                checked={this.state.showVATAmount}
                onChange={this.handleChangeOtherSettings}
              />
            </Form.Field>
        </Form>
      </div>
    );
  }
}

export default NetworkSettings;
