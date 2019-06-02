import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Slider from './Slider';

const styles = theme => ({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    color: '#91c5ff',
    textTransform: 'capitalize',
  },
});

class MainLightElement extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        id: props.id,
        status: props.status
      };
  };

  componentWillReceiveProps(newProps) {
    if (newProps.status !== this.state.status)
      this.setState({ status: newProps.status });
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
        status: props.status, // on-off (1 : 0)
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

/**
 * Controls group of Main Light LEDs
 * Options:
 * - 0/1
 * - dimming %
 */
class ManageGroupPure extends React.Component {  
  constructor(props) {
      super(props);
  }

  render() {
    const { classes } = this.props;
    const updateStatus = this.props.updateStatus;
    const gpioList = this.props.gpioList;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid 
            container
            direction="row"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12}>
              <Typography variant="caption" align="center" gutterBottom className="main-manage-group">
              Manage group
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} align="center">
              <Button
                variant="outlined"
                color="primary"
                classes={{ label: classes.label }}
                onClick={ () => updateStatus(gpioList, 0) }
              >
                OFF
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} align="center">
              <Button
                variant="outlined"
                color="primary"
                classes={{ label: classes.label }}
                onClick={ () => updateStatus(gpioList, 1) }
              >
                ON
              </Button>
            </Grid>
            <Grid item xs={8} align="center">
              <Slider value={100} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

// apply styles to the component
const ManageGroup = withStyles(styles)(ManageGroupPure);

export {
  MainLightElement,
  ManageGroup,
}
