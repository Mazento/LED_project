import React from 'react';
import reactCSS from 'reactcss';

import AmbientConfig from './AmbientConfig';

/**
 * Represents ambient light's color.
 * Opens config on click.
 */
class AmbientLight extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            color: this.props.color,
            open: false,
        };
    };

    componentWillReceiveProps(newProps) {
        if (newProps.color !== this.state.color)
            this.setState({ color: newProps.color });
    };

    handleChangeColor = (color) => {
        this.setState({ color: color.rgb, hex: color.hex });
    }

    handleOpen = () => {
        this.setState({ open: true });
        // this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    // TODO: revamp after material-ui 4.x is released (use value from props)
    render() {
        const color = Object.values(this.state.color);
        const styles = reactCSS({
            'default': {
                color: {
                    width: '5rem',
                    height: '36rem',
                },
                swatch: {
                    transition: '100ms',
                    background: `rgb(${ color })`,
                    boxShadow: `0px 0px 5px 1px rgb(${ color }), 0px 0px 30px rgb(${ color }), 0px 0px 37px rgb(${ color }) inset`,
                    cursor: 'pointer',
                },
            },
        });

        return (
            <React.Fragment>
                <div style={ styles.swatch } onClick={ this.handleOpen }>
                    <div style={ styles.color } />
                </div>
                <AmbientConfig
                    updateAmbiConfig={this.props.updateAmbiConfig}
                    handleClose={this.handleClose}
                    color={this.props.color}
                    open={this.state.open}
                />
            </React.Fragment>
        )
    };
}

export default AmbientLight;
