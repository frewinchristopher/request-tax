import React from 'react'
import PropTypes from 'prop-types'

class TaxDocumentation extends React.Component {
  render () {
    return (
      <div>
        <h1 className="rainbow-underlined">
          Documentation
        </h1>
        <ul>
          <li><a href="#network-settings">Network settings</a></li>
          <li><a href="#ui-settings">UI settings</a></li>
          <li><a href="#requestTax-for-react">RequestTax For React</a></li>
          <li><a href="#requestTax-for-angular">RequestTax For Angular</a></li>
          <li><a href="#requestTax-for-vue">RequestTax For Vue</a></li>
          <li><a href="#styling">Styling</a></li>
        </ul>

        <h2 id="network-settings"><span className="rainbow-underlined">Network Settings</span></h2>
        <h2 id="ui-settings"><span className="rainbow-underlined">UI Settings</span></h2>

        <h3><span className="rainbow-underlined">Default UI Settings:</span></h3>
        <h4>UI parameter values:</h4>
        showPayersLocation=true
        showBuyersLocation=true
        showVATPercentage=true
        showVARAmount=true
        sendTaxDirectlyToState=false
        <h3><span className="rainbow-underlined">Example</span></h3>
        <hr/>
        <h3><span className="rainbow-underlined">Minimum UI - all UI Elements deactivated:</span></h3>
        <h4>UI parameter values:</h4>
        showPayersLocation=false
        showBuyersLocation=false
        showVATPercentage=false
        showVARAmount=false
        sendTaxDirectlyToState=false
        <h3><span className="rainbow-underlined">Example</span></h3>
        <hr/>
        <h3><span className="rainbow-underlined">Maximum UI - all UI Elements activated:</span></h3>
        <h4>UI parameter values:</h4>
        showPayersLocation=true
        showBuyersLocation=true
        showVATPercentage=true
        showVARAmount=true
        sendTaxDirectlyToState=true
        <h3><span className="rainbow-underlined">Example</span></h3>
        <hr/>
        <h3><span className="rainbow-underlined">RequestTax for React</span></h3>
        <p>Coming soon.</p>
        <h3><span className="rainbow-underlined">RequestTax for Angular</span></h3>
        <p>Coming soon.</p>
        <h3><span className="rainbow-underlined">RequestTax for Vue</span></h3>
        <p>Coming soon.</p>
        <h3><span className="rainbow-underlined">Styling</span></h3>
        <p>Coming soon.</p>
      </div>
    )
  }
}

export default TaxDocumentation;
