import React from 'react';
  
class MainLightElement extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        id: props.id,
        status: props.status
        // status: true
      };
  };
  componentWillReceiveProps(newProps) {
    if (newProps.status !== this.state.status) {
      this.setState({ status: newProps.status });
    }
  };
  render() {
    const updateStatus = this.props.updateStatus;
    return (
      <div onClick={ ()=> updateStatus(this.state.id, !this.state.status) } className={ 'popover popover-right main-light-led ' + (this.state.status ? '' : 'disabled') }>
        <MainLightLed id={ this.state.id } status={ this.state.status } />
        {/* <MainLightSlider id={ this.state.id } /> */}
      </div>
    );
  };
};

class MainLightLed extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        id: props.id,
        status: props.status, // on-off (true : false)
        dimming: props.dimming, // dimming percentage (0-100)
        transition: 'scale-in' // animation on load
      };
  };
  // componentDidMount() {
  //   setInterval(() => {
  //     this.setState(() => ({ transition: 'scale-in' }));
  //   }, 10);
  // }
  componentWillReceiveProps(newProps) {
    if (newProps.status !== this.state.status) {
      this.setState({ status: newProps.status });
    }
  };
  render() {
    return (
      React.createElement(
        'div',
        { 
        // onMouseOver: this.handleHover.bind(this),
        // className: 'btn-floating btn-large btn-main-light scale-transition fuck3'
        className: 'scale-transition '+ (this.state.transition) },
        React.createElement(
          'p', null, (this.state.status ? '100%' : 'Off')
        )
        // + (this.state.status ? 'red' : 'grey') },
      )
    )
  }
}

export default MainLightElement;
