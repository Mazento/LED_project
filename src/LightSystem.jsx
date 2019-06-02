import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import AmbientLight from './AmbientLight';
// import AmbientConfig from './AmbientConfig';
import { MainLightElement, ManageGroup } from './MainLight';
import api from './api';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  divider: {
    backgroundColor: 'rgba(133, 133, 133, .2)',
  },
});

const defaultColor = {r: 136, g: 136, b: 136};

class LightSystem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // List of all gpios paired with their values (true-false)
      mainLightArray: {},
      ambientLightMode: '',
      ambientLightColor: this.props.color || defaultColor,
    };

    this.updateStatus = this.updateStatus.bind(this);
    this.updateAmbiConfig = this.updateAmbiConfig.bind(this);
  };

  // Load main light status from server after component mount.
  // Then get ambi status.
  async componentDidMount() {
    await api.getMainLight()
    .then(res => this.setState({ mainLightArray: res || {} }))
    .then(this.getAmbientLight());
  };

  // Get current ambient light status from the server
  async getAmbientLight() {
    await api.getAmbientLight()
    .then(res => {
      console.log(res.color);
      this.setState({
        ambientLightMode: res.type,
        ambientLightColor: res.color,
      });
    });
  };

  // Send new ambient light config to the server and await for response
  async updateAmbiConfig(componentConfig) {
    // Create new config to unlink from component's state
    const config = {...componentConfig};
    // Convert color-picker rgb format to api format
    await api.sendAmbientLight(config)
    .then(res => {
      this.setState({
        ambientLightMode: res.type,
        ambientLightColor: res.color || defaultColor,
      });
    });
  };

  // Turn on/off main light gpios (send to server).
  // gpioList - list of gpios
  // newStatus - their new value (1-0)
  async updateStatus(gpioList, newStatus) {
    const resArr = {}
    gpioList = (Array.isArray(gpioList) ? gpioList : [gpioList]);
    gpioList.map(x => { resArr[x] = newStatus ? 1 : 0 });
    // console.log(`gpioList: ${gpioList}`);
    // console.log(`newStatus: ${newStatus}`);
    await api.sendMainLight(resArr)
    .then(res => this.setState({ mainLightArray: res || {} }));
  };
  createGpioList(first, last) {
    const gpioList = [];
    const gpioIdList = [];
    const step = ((last > first) ? 1 : -1);
    for(let i = first; last > first ? i <= last : i >= last; i+=step) {
      gpioIdList.push(`gpio${i}`);
      gpioList.push(
        <ListItem key={i}>
          <MainLightElement
            id={ `gpio${i}` }
            status={ this.state.mainLightArray[`gpio${i}`] }
            updateStatus = { this.updateStatus }
          />
        </ListItem>
      );
    };
    return [gpioList, gpioIdList];
  };

  render() {
    const { classes } = this.props;

    let gpioListLeft = [];
    let gpioIdListLeft = [];
    let gpioListRight = [];
    let gpioIdListRight = [];
    [gpioListLeft, gpioIdListLeft] = this.createGpioList(5,8);
    [gpioListRight, gpioIdListRight] = this.createGpioList(4,1);    

    return (
      <Grid container className={classes.root} justify="center">
        <Grid item xs={12} sm={4} >
          <Grid 
            container
            spacing={24}
            direction="row"
            alignItems="center"
            justify="center"
            style={{ minHeight: '90vh' }}
          >
            {/* Left group of LEDs */}
            <Grid xs={5} item>
              <Paper
                justify="center"
                className="main-light-panel"
              >
                <List> {gpioListLeft} </List>
                <Divider variant="middle" className={classes.divider}/>
                <ManageGroup
                  updateStatus={ this.updateStatus }
                  gpioList={ gpioIdListLeft }
                />
              </Paper>
            </Grid>
            {/* Ambient Light */}
            <Grid xs={2} item>
              <Paper
                justify="center"
                className="main-light-panel"
              >
                <AmbientLight
                  updateAmbiConfig={this.updateAmbiConfig}
                  color={this.state.ambientLightColor}
                />
              </Paper>
            </Grid>
            {/* Right group of LEDs */}
            <Grid xs={5} item>
              <Paper
                justify="center"
                className="main-light-panel"
              >
                <List> {gpioListRight} </List>
                <Divider variant="middle" className={classes.divider}/>
                <ManageGroup
                  updateStatus={ this.updateStatus }
                  gpioList={ gpioIdListRight }
                />
              </Paper>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(LightSystem);