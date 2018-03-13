import React from 'react'
import PropTypes from 'prop-types'
import Particles from 'react-particles-js';
import { Button, Icon } from 'semantic-ui-react';
import { Route } from 'react-router-dom'

// image require's
let request = require("../images/request.png");

const params = {
  particles: {
      number: {
          value: 17,
      },
      color: {
          value: "#ffffff"
      },
      shape: {
          type: "circle",
          stroke: {
              width: 0,
              color: "#000000"
          },
          polygon: {
              nb_sides: 5
          },
          image: {
              src: "img/github.svg",
              width: 100,
              height: 100
          }
      },
      opacity: {
          value: 1,
          random: !0,
          anim: {
              enable: !0,
              speed: 1,
              opacity_min: 0,
              sync: !1
          }
      },
      size: {
          value: 3,
          random: !0,
          anim: {
              enable: !1,
              speed: 4,
              size_min: .3,
              sync: !1
          }
      },
      line_linked: {
          enable: !0,
          distance: 500,
          color: "#ffffff",
          opacity: .4,
          width: 1
      },
      move: {
          enable: !0,
          speed: 1,
          direction: "none",
          random: !0,
          straight: !1,
          out_mode: "out",
          bounce: !1,
          attract: {
              enable: !1,
              rotateX: 600,
              rotateY: 600
          }
      }
  },
  interactivity: {
      detect_on: "canvas",
      events: {
          onhover: {
              enable: !1,
              mode: "bubble"
          },
          onclick: {
              enable: !1,
              mode: "push"
          },
          resize: !0
      },
      modes: {
          grab: {
              distance: 400,
              line_linked: {
                  opacity: 1
              }
          },
          bubble: {
              distance: 250,
              size: 0,
              duration: 2,
              opacity: 0,
              speed: 3
          },
          repulse: {
              distance: 400,
              duration: .4
          },
          push: {
              particles_nb: 4
          },
          remove: {
              particles_nb: 2
          }
      }
  },
  retina_detect: true
};

const DemoRouteButton = () => (
  <Route render={({ history }) => (
    <Button secondary onClick={() => { history.push('/interactive-demo') }}>
      Interactive Demo
    </Button>
  )} />
);

const DocumentationRouteButton = () => (
  <Route render={({ history }) => (
    <Button secondary onClick={() => { history.push('/documentation') }}>
      Documentation
    </Button>
  )} />
);

class Splash extends React.Component {
  render () {
    return (
        <div>
          <div className="particles-container" style={{position: 'absolute', width: '100%', height: '100%'}}>
            <Particles params={params} style={{width: '100%', height: '100%'}} width="100vw" height="100vh"/>
            <div id="inside">
              <div id="inside-inside">
                <div className="py-4 py-sm-5 mb-3 mb-sm-5 logo" data-sr-id="1">
                  <img alt="request-logo" className="img-fluid" src={request}/>
                </div>
                <h1><span className="rainbow-underlined">RequestTax</span></h1>
                <h2 className="description">Taxation on the Request Network.</h2>
                <h2><span className="rainbow-underlined">Declare VAT or sales tax instantly, pay taxes in real time to the state, and more.</span></h2>
                <h2><span className="rainbow-underlined">Supports all major countries and states worldwide.</span></h2>
                <DemoRouteButton/>
                <br/>
                <br/>
                <DocumentationRouteButton/>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Splash
