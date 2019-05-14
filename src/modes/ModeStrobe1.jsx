import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/lab/Slider';

import ColorPicker from './ColorPicker';

const styles = theme => ({
  root: {
    overflowX: 'hidden',
    minWidth: '20vw',
  },
  text: {
    height: '1rem',
  },
  colorPicker: {
    width: '270px',
    marginTop: theme.spacing.unit * 2,
    margin: 'auto',
  },
});

/**
 * Config window for ambient light.
 * Contains color-picker.
 */
class ModeStrobe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'strobe',
      count: 10,
      strobeDelay: 1000,
      refreshTime: 1000,
    };
  };

  /**
   * Update parent component's config state as soon as this component is loaded.
   */
  componentDidMount() {
    this.handleConfigChange();
  };

  /**
   * Update parent component's config state on every state update.
   */
  componentDidUpdate() {
    this.handleConfigChange();
  };

  /**
   * Link text field to the slider.
   * value is from slider
   * event.target.value is from text field
   */
  handleChange = name => (event, value) => {
    this.setState({
      [name]: (value !== undefined)
      ? value
      : parseInt(event.target.value, 10)
    });
  };

  /**
   * Update parent component's config state
   */
  handleConfigChange = () => {
    this.props.handleConfigChange(this.state);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
          <Grid 
              spacing={0}
              container
              direction="column"
              alignItems="center"
              justify="center"
            >

              {/* Count value */}
              <Grid container alignItems="center" >
                <Grid xs={3} sm={2} item>
                  <TextField
                    id="count-value"
                    label="Count"
                    value={this.state.count}
                    onChange={this.handleChange('count')}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid xs={8} sm={9} item>
                  <Slider 
                    min={0}
                    max={100}
                    step={1}
                    value={this.state.count}
                    onChange={this.handleChange('count')}
                  />
                </Grid>
              </Grid>

              {/* Strobe delay: pause between switches */}
              <Grid container alignItems="center" >
                <Grid xs={3} item>
                  <TextField
                    id="delay-value"
                    label="Delay (ms)"
                    value={this.state.strobeDelay}
                    onChange={this.handleChange('strobeDelay')}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid xs={8} item>
                  <Slider 
                    min={100}
                    max={10000}
                    step={100}
                    value={this.state.strobeDelay}
                    onChange={this.handleChange('strobeDelay')}
                  />
                </Grid>
              </Grid>

              {/* Refresh time: pause between cycles */}
              <Grid container alignItems="center" >
                <Grid xs={3} item>
                  <TextField
                    id="refresh-value"
                    label="Refresh (ms)"
                    value={this.state.refreshTime}
                    onChange={this.handleChange('refreshTime')}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid xs={8} item>
                  <Slider 
                    min={100}
                    max={10000}
                    step={100}
                    value={this.state.refreshTime}
                    onChange={this.handleChange('refreshTime')}
                  />
                </Grid>
              </Grid>

            </Grid>

            {/* Color picker */}
            <div className={classes.colorPicker} >
              <ColorPicker changeColor={this.props.changeColor} />
            </div>

      </div>
    );
  }
}

export default withStyles(styles)(ModeStrobe);