import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Form, Radio, Checkbox } from 'semantic-ui-react';

class PopupThemes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: 'modal',
      withPopup: false,
      visualSettings: []
    };
    this.props.updateButtonState({ withPopup: false });
    this.handleChangePopupVsModal = this.handleChangePopupVsModal.bind(this);
    this.handleChangeVisualSettings = this.handleChangeVisualSettings.bind(this);
  }
  handleChangePopupVsModal(e, value) {
    console.log(value.value);
    switch(value.value) {
      case 'popup':
        this.setState({ withPopup: true });
        this.props.updateButtonState({ withPopup: true });
        break;
      case 'modal':
        this.setState({ withPopup: false });
        this.props.updateButtonState({ withPopup: false });
        break;
    }
  }
  handleChangeVisualSettings(e, value) {
    console.log(value)
    // var aVisualSettings = this.state.visualSettings;
    // if (aVisualSettings.contains(value.value)) {
    //   aVisualSettings.push(value.value);
    // }

  }
  render () {
    var sList;
    this.state.visualSettings.forEach((sSetting) => {
      sList = sList + ", ";
    });
    if (sList) {
      sList = sList.slice(0,-2); // remove the last ", "
    } else {
      sList = "(None selected)";
    }
    return (
      <div>
        <h2><span className="rainbow-underlined">Popover Themes</span></h2>
          <Form>
          <Form.Field>
            Popup vs. Full Modal: <b>{this.state.label}</b>
          </Form.Field>
          <Form.Field>
            <Radio
              label='Popup'
              name='radioGroup'
              value='popup'
              checked={this.state.withPopup}
              onChange={this.handleChangePopupVsModal}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Full Modal'
              name='radioGroup'
              value='modal'
              checked={!this.state.withPopup}
              onChange={this.handleChangePopupVsModal}
            />
          </Form.Field>
          </Form>
          <Form>
            Visual Settings <b>{sList}</b>
            <Form.Field>
              <Checkbox
                label='Show Seller Location'
                name='checkboxGroup'
                value='a'
                checked={this.state.showFromLocation}
                onChange={this.handleChangeOtherSettings}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                label='Show Purchaser Location'
                name='checkboxGroup'
                value='b'
                checked={this.state.showFromLocation}
                onChange={this.handleChangeOtherSettings}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                label='Show confirmations after send'
                name='checkboxGroup'
                value='c'
                checked={this.state.showConfirmations}
                onChange={this.handleChangeOtherSettings}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                label='Show VAT in %'
                name='checkboxGroup'
                value='d'
                checked={this.state.showVATPercentage}
                onChange={this.handleChangeOtherSettings}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                label='Show VAT in Amount'
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

export default PopupThemes;
