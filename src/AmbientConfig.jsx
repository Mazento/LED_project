import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Grow from '@material-ui/core/Grow';

import ModeSolid from './modes/ModeSolid';
import ModeBreath from './modes/ModeBreath';
import ModeStrobe from './modes/ModeStrobe';
import ModeRainbow from "./modes/ModeRainbow";


const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'row',
    width: 'fit-content',
  },
  dialogTitle: {
    background: theme.palette.secondary.main,
  },
  dialogContent: {
    marginTop: theme.spacing.unit * 2,
  },
  modeSelect: {
    marginBottom: theme.spacing.unit * 2,
    minWidth: 120,
  },
  liveUpdate: {
    marginLeft: theme.spacing.unit * 2,
  },
});

const Transition = props => {
  return <Grow {...props} />;
}

/**
 * Config window for ambient light.
 * Contains color-picker.
 */
class AmbientConfigPure extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open,
      mode: 'solid',
      liveUpdate: false,
      config: {},
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.open !== this.state.open)
      this.setState({ open: newProps.open });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.handleClose();
  };

  // Manual update by pressing "update" button
  handleManualUpdate = () => {
    this.props.updateAmbiConfig(this.state.config);
  };

  // Auto update by changing values with activated switch "live update"
  handleConfigChange = config => {
    if (this.state.config !== config) {
      this.setState({ config });

      if (this.state.liveUpdate) {
        this.props.updateAmbiConfig(config);
      }
    }
  }

  // Change value of state.mode after selecting corresponding selector
  handleModeChange = event => {
    this.setState({ mode: event.target.value });
  };

  // Change value of state.liveUpdate after pressing corresponding switch
  handleLiveUpdateChange = event => {
    this.setState({ liveUpdate: event.target.checked })
  };

  getConfigForm(mode, props) {
    switch(mode) {
      case 'solid':
        return <ModeSolid {...props} />;
      case 'breath':
        return <ModeBreath {...props} />;
      case 'strobe':
        return <ModeStrobe {...props} />;
      case 'rainbow':
        return <ModeRainbow{...props} />;
      default:
        return null;
    }
  };

  render() {
    const { classes, fullScreen } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          TransitionComponent={Transition}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle 
            id="responsive-dialog-title"
            className={classes.dialogTitle}
          >
            {"Configure ambient light."}
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <form className={classes.form} noValidate>
              <FormControl className={classes.modeSelect}>
                <InputLabel htmlFor="mode">Mode</InputLabel>
                <Select
                  value={this.state.mode}
                  onChange={this.handleModeChange}
                  inputProps={{
                    name: 'max-width',
                    id: 'max-width',
                  }}
                >
                  <MenuItem value='solid'>Solid</MenuItem>
                  <MenuItem value="breath">Breath</MenuItem>
                  <MenuItem value="strobe">Strobe</MenuItem>
                  <MenuItem value="rainbow">Rainbow</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                className={classes.liveUpdate}
                labelPlacement="start"
                control={
                  <Switch
                    checked={this.state.liveUpdate}
                    onChange={this.handleLiveUpdateChange}
                  />
                }
                label="Live update"
              />
            </form>
            {/* Load config form corresponding to the selected mode */}
            {
              this.getConfigForm(this.state.mode, {
                handleConfigChange: this.handleConfigChange,
                color: this.props.color,
              }) 
            }

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={this.handleManualUpdate} color="secondary" variant="outlined" autoFocus>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

// apply withMobileDialog to the component for responsiveness
const AmbientConfig = withMobileDialog()(AmbientConfigPure);

export default withStyles(styles)(AmbientConfig);