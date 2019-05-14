import React from 'react';
import { SketchPicker } from 'react-color';

/**
 * Color-picker component.
 */
class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
  };

  handleChangeColor = (color) => {
    this.props.changeColor(this.converOutputRGB(color));
  };

  // Convert (red, green, blue) to (r, g, b)
  convertInputRGB(color) {
    return ({
      r: color.red,
      g: color.green,
      b: color.blue,
    });
  };

  // Convert  (r, g, b) to (red, green, blue)
  converOutputRGB(color) {
    return ({
      red: color.rgb.r,
      green: color.rgb.g,
      blue: color.rgb.b,
    });
  };

  render() {
    return (
      <SketchPicker
        color={ this.convertInputRGB(this.props.color) }
        // onChange={ this.props.changeColor(color) }
        disableAlpha={ true }
        width = { 250 }
        onChangeComplete={ this.handleChangeColor }
      />
    )
  };
}

export default ColorPicker;