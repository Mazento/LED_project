import React, { Component } from 'react';
import './App.css';
import noUiSlider from 'nouislider';
// const noUiSlider = require('./nouislider.min.js');
import Tabs from './Tabs';
import AmbientLight from './AmbientLight';
import api from './api';

class App extends Component {
  render() {
    return (
    <React.Fragment>
      <Tabs />
      <FullLightSystem />
    </React.Fragment>
    )
  }
}

class FullLightSystem extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        mainLightArray: []
      };
  }
  async componentDidMount() {    
    const response = await api.getMainLight();
    this.setState({ mainLightArray: response || [] });
  }
  render() {
    return (
      <div className="container">
        <div className="row valign-wrapper">
          <div className="col s1"/>
          <div className="col s4 card-panel white center-align">
            <MainLightElement id="gpio5" status={ this.state.mainLightArray['gpio5'] } />
            <br />
            <MainLightElement id="gpio6" status={ this.state.mainLightArray['gpio6'] } />
            <br />
            <MainLightElement id="gpio7" status={ this.state.mainLightArray['gpio7'] } />
            <br />
            <MainLightElement id="gpio8" status={ this.state.mainLightArray['gpio8'] } />
          </div>
          <div className="col s2">
            <AmbientLight />
          </div>
          <div className="col s4 card-panel white center-align">
            <MainLightElement id="gpio4" status={ this.state.mainLightArray['gpio4'] } />
            <br />
            <MainLightElement id="gpio3" status={ this.state.mainLightArray['gpio3'] } />
            <br />
            <MainLightElement id="gpio2" status={ this.state.mainLightArray['gpio2'] } />
            <br />
            <MainLightElement id="gpio1" status={ this.state.mainLightArray['gpio1'] } />
          </div>          
          <div className="col s1"/>
        </div>
      </div>
    );
  }
}

class MainLightElement extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        id: props.id,
        status: props.status
      };
  }
  render() {
    return (
      <div className="popover popover-right">
        <MainLightLed id={ this.state.id } status={ this.state.status } />
        <MainLightSlider id={ this.state.id } />
      </div>
    );
  }
}

class MainLightLed extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        id: props.id,
        status: props.status, // on-off (true : false)
        dimming: props.dimming, // dimming percentage (0-100)
        transition: 'scale-out' // animation on load
      };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState(() => ({ transition: 'scale-in' }));
    }, 10);
  }
  handleClick() {
    api.sendMainLight(this.state.id, !this.state.status ? "on" : "off");
    this.setState((prevState) => ({ status: !prevState.status }));
  }
  handleHover() {
    this.setState((prevState) => ({ status: !prevState.status }));
  }
  render() {
    return (
      React.createElement(
        'a',
        { onClick: this.handleClick.bind(this),
        // onMouseOver: this.handleHover.bind(this),
        className: 'btn-floating btn-large btn-main-light scale-transition fuck3 '
        + (this.state.transition) + ' '
        + (this.state.status ? 'red' : 'grey') },
        <i className="material-icons">wb_incandescent</i>
      )
    );
  }
}

class MainLightSlider extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        id: props.id,
        value: props.value
      };
  }
  componentDidMount() {
    const slider = document.getElementById( this.state.id );
    const inputFormat = document.getElementById( this.state.id + '-input' );
    noUiSlider.create(slider, {
     start: 70,
     step: 1,
     orientation: 'horizontal',
     range: {
       'min': 0,
       'max': 100
     }
    //  ,
    //  format: wNumb({
    //    decimals: 0
    //  })
    });

    slider.noUiSlider.on('update', function (values, handle) {
        inputFormat.value = values[handle];
    });

    inputFormat.addEventListener('change', function () {
        slider.noUiSlider.set(this.value);
    });

  }

  render() {
    return (
      <div className="popover-container">
        <div className="card">
          <div className="row valign-wrapper fuck1">
              <div className="col s9">
                <div id={ this.state.id }></div>
              </div>
              <input className="col s3 center-align fuck2" id={ (this.state.id) + '-input' } />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
