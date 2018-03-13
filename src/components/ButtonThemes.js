import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Form, Radio, Checkbox } from 'semantic-ui-react';

class InteractiveDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "c",
      buttonClass: "requestTax-button-theme-3",
      buttonText: "Pay with Request",
      label: "Theme 3",
      showIcon: true,
      iconSide: "left",
      buttonTextValue: "c",
      withPopup: true
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeButtonText = this.handleChangeButtonText.bind(this);
    this.props.updateButtonState({ value: this.state.value, buttonClass: this.state.buttonClass, label: this.state.label, showIcon: this.state.showIcon, iconSide: this.state.iconSide, buttonText: this.state.buttonText })
  }
  handleChange(e, value) {
    console.log(value.value);
    switch(value.value) {
      case 'a':
        this.setState({ value: value.value, buttonClass: "requestTax-button-theme-1", label: value.label, showIcon: false, iconSide: '' });
        this.props.updateButtonState({ value: value.value, buttonClass: "requestTax-button-theme-1", label: value.label, showIcon: false, iconSide: '' });
        break;
      case 'b':
        this.setState({ value: value.value, buttonClass: "requestTax-button-theme-2", label: value.label, showIcon: true, iconSide: 'right' });
        this.props.updateButtonState({ value: value.value, buttonClass: "requestTax-button-theme-2", label: value.label, showIcon: true, iconSide: 'right' });
        break;
      case 'c':
        this.setState({ value: value.value, buttonClass: "requestTax-button-theme-3", label: value.label, showIcon: true, iconSide: 'left' });
        this.props.updateButtonState({ value: value.value, buttonClass: "requestTax-button-theme-3", label: value.label, showIcon: true, iconSide: 'left' });
        break;
      case 'd':
        this.setState({ value: value.value, buttonClass: "requestTax-button-theme-4", label: value.label, showIcon: true, iconSide: 'right' });
        this.props.updateButtonState({ value: value.value, buttonClass: "requestTax-button-theme-4", label: value.label, showIcon: true, iconSide: 'right' });
        break;
      case 'e':
        this.setState({ value: value.value, buttonClass: "requestTax-button-theme-5", label: value.label, showIcon: true, iconSide: 'left' });
        this.props.updateButtonState({ value: value.value, buttonClass: "requestTax-button-theme-5", label: value.label, showIcon: true, iconSide: 'left' });
        break;
    }
  }
  handleChangeButtonText(e, value) {
    console.log(value.value);
    switch(value.value) {
      case 'a':
        this.setState({ buttonTextValue: value.value, buttonText: value.label });
        this.props.updateButtonState({ buttonTextValue: value.value, buttonText: value.label });
        break;
      case 'b':
        this.setState({ buttonTextValue: value.value, buttonText: value.label });
        this.props.updateButtonState({ buttonTextValue: value.value, buttonText: value.label });
        break;
      case 'c':
        this.setState({ buttonTextValue: value.value, buttonText: value.label });
        this.props.updateButtonState({ buttonTextValue: value.value, buttonText: value.label });
        break;
    }
  }
  render () {
    return (
      <div>
        <h2><span className="rainbow-underlined">Button Themes</span></h2>
          <Form>
          <Form.Field>
            Selected Theme: <b>{this.state.label}</b>
          </Form.Field>
          <Form.Field>
            <Radio
              label='Theme 1'
              name='radioGroup'
              value='a'
              checked={this.state.value === 'a'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Theme 2'
              name='radioGroup'
              value='b'
              checked={this.state.value === 'b'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Theme 3'
              name='radioGroup'
              value='c'
              checked={this.state.value === 'c'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Theme 4'
              name='radioGroup'
              value='d'
              checked={this.state.value === 'd'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Theme 5'
              name='radioGroup'
              value='e'
              checked={this.state.value === 'e'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            Button Text: <b>{this.state.buttonText}</b>
          </Form.Field>
          <Form.Field>
            <Radio
              label='Create a Request'
              name='checkboxGroup'
              value='a'
              checked={this.state.buttonTextValue === 'a'}
              onChange={this.handleChangeButtonText}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Make a Request'
              name='checkboxGroup'
              value='b'
              checked={this.state.buttonTextValue === 'b'}
              onChange={this.handleChangeButtonText}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Pay with Request'
              name='checkboxGroup'
              value='c'
              checked={this.state.buttonTextValue === 'c'}
              onChange={this.handleChangeButtonText}
            />
          </Form.Field>
        </Form>
      </div>
    );
  }
}

export default InteractiveDemo;
