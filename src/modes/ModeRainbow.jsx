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
class ModeRainbow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            config: {
                type: 'rainbow',
                delay: 1,
                brightness: 100,
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
        this.setState(state => ({
            config: {
                ...state.config,
                [name]: (value !== undefined)
                    ? value
                    : parseInt(event.target.value, 10)
            }
        }));
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
        const delay = this.state.config.delay;
        const brightness = this.state.config.brightness;
        const color = this.state.config.color;

        return (
            <div className={classes.root}>
                <Grid
                    spacing={0}
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                >

                    {/* Rainbow delay: speed of rainbow */}
                    <Grid container alignItems="center" >
                        <Grid xs={3} item>
                            <TextField
                                id="delay-value"
                                label="Delay (ms)"
                                value={delay}
                                onChange={this.handleChange('delay')}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid xs={8} item>
                            <Slider
                                min={0}
                                max={500}
                                step={1}
                                value={delay}
                                onChange={this.handleChange('delay')}
                            />
                        </Grid>
                    </Grid>

                    {/* Brightness */}
                    <Grid container alignItems="center" >
                        <Grid xs={3} item>
                            <TextField
                                id="brightness-value"
                                label="brightness"
                                value={brightness}
                                onChange={this.handleChange('brightness')}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid xs={8} item>
                            <Slider
                                min={0}
                                max={255}
                                step={1}
                                value={brightness}
                                onChange={this.handleChange('brightness')}
                            />
                        </Grid>
                    </Grid>

                </Grid>

                {/* Color picker */}
                <div className={classes.colorPicker} >
                    <ColorPicker
                        color = {color}
                        changeColor={this.handleChangeColor}
                    />
                </div>

            </div>
        );
    }
}

export default withStyles(styles)(ModeRainbow);
