import React from 'react';
import Slider from '@material-ui/lab/Slider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    slider: {
        padding: '1rem 0',
    },
};

class SimpleSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
        };

        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event, value) {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className="group-slider">
                <Slider
                    classes={{ container: classes.slider }}
                    value={ this.state.value }
                    onChange={ this.handleChange } />
            </div>
        )
    }
}

SimpleSlider.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSlider);
