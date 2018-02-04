import React, { Component } from 'react';
import axios from 'axios';
import './styles/App.css';
import BurgerMenu from 'react-burger-menu';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Splash from './components/Splash'; // initial splash page
import InteractiveDemo from './components/InteractiveDemo'; // initial splash page
import Documentation from './components/Documentation'; // documentation
import Credits from './components/Credits'; // home view


class MenuWrap extends Component {
  constructor (props) {
    super(props);
    this.state = {
      hidden: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const sideChanged = this.props.children.props.right !== nextProps.children.props.right;

    if (sideChanged) {
      this.setState({hidden : true});

      setTimeout(() => {
        this.show();
      }, this.props.wait);
    }
  }

  show() {
    this.setState({hidden : false});
  }

  render() {
    let style;

    if (this.state.hidden) {
      style = {display: 'none'};
    }

    return (
      <div style={style} className={this.props.side}>
        {this.props.children}
      </div>
    );
  }
}

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentMenu: 'scaleRotate',
      side: 'left',
      isOpen: false
    };
    this.getItems = this.getItems.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  getItems() {
    let aItems = [
          <Link id="noUnderline" key="0" onClick={this.closeMenu} to="/"><h3 id="menu-title" className="request-text-gradient"><span id="titleText">RequestTax</span></h3></Link>,
          <Link key="1" onClick={this.closeMenu} to="/interactive-demo"><i className="fa fa-fw fa-book"/><span>Interactive Demo</span></Link>,
          <Link key="2" onClick={this.closeMenu} to="/documentation"><i className="fa fa-fw fa-book"/><span>Documentation</span></Link>,
          <Link key="3" onClick={this.closeMenu} to="/credits"><i className="fa fa-fw fa-list"/><span>Credits</span></Link>,
          <a key="4" href="https://blog.request.network/request-network-project-update-january-19th-2018-announcing-a-30-million-request-fund-6a6f87d27d43"><i className="fa fa-fw fa-external-link" /><span>RequestTax is trying to win a grant under Request Network's Request Fund!</span></a>
        ];
    return aItems;
  }
  closeMenu() {
    this.setState({isOpen: false}); // any link click from the menu should automatically close the menu
  }
  render() {
    const Menu = BurgerMenu[this.state.currentMenu];
    const items = this.getItems();
    return (
      <Router>
        <div>
          <div id="outer-container" style={{height: '100%'}}>
            <MenuWrap wait={20}>
              <Menu id={this.state.currentMenu} pageWrapId={'page-wrap'} outerContainerId={'outer-container'} isOpen={this.state.isOpen}>
                {items}
              </Menu>
            </MenuWrap>
            <main id="page-wrap">
                <div>
                  <Route exact path="/" component={Splash}></Route>
                  <Route exact path="/interactive-demo" component={InteractiveDemo}></Route>
                  <Route exact path="/documentation" component={Documentation}></Route>
                  <Route exact path="/credits" component={Credits}></Route>
                </div>
            </main>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
