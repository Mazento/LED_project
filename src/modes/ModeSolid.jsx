import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import ColorPicker from './ColorPicker';

const styles = theme => ({
  root: {
    overflowX: 'hidden',
    minWidth: '20vw',
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
class ModeSolid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      config: {
        type: 'solid',
        color: this.props.color,
      }
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
      config: {
        ...this.state.config,
        [name]: (value !== undefined)
        ? value
        : parseInt(event.target.value, 10)
      }
    });
  };

  /**
   * Update parent component's config state
   */
  handleConfigChange() {
    this.props.handleConfigChange(this.state.config);
  };

  /**
   * Local color state for this component.
   */
  handleChangeColor = (color) => {
    this.setState({ 
      config: {...this.state.config, color}
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.colorPicker} >
          <ColorPicker
            color = {this.state.config.color}
            changeColor={this.handleChangeColor} 
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ModeSolid);