import React from 'react';
import api from './api';
import M from '../node_modules/materialize-css/dist/js/materialize.min.js';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss'

class SketchExample extends React.Component {
  state = {
    displayColorPicker: false,
    hex: '#DF13F1'
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb, hex: color.hex })
  };

  handleSubmit(color) {
    const colorData = { 
      red: color.rgb.r,
      green: color.rgb.g,
      blue: color.rgb.b
    };
    console.log(colorData);
    api.sendAmbientLight(colorData);
  }

  render() {
    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '40rem',
        },
        swatch: {
          transition: '100ms',
          background: this.state.hex,
          boxShadow: `0px 0px 5px 1px ${ this.state.hex }, 0px 0px 30px ${ this.state.hex }, 0px 0px 37px ${ this.state.hex } inset`,
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
          right: '15%',
          top: '25%'
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <SketchPicker 
            color={ this.state.hex }
            onChange={ this.handleChange }
            disableAlpha={ true }
            width = {250}
            onChangeComplete={ this.handleSubmit } />
        </div> : null }

      </div>
    )
  }
}

export default SketchExample