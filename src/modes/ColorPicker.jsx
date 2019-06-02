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

  // Extract (r, g, b)
  converOutputRGB(color) {
    return ({
      r: color.rgb.r,
      g: color.rgb.g,
      b: color.rgb.b,
    });
  };

  render() {
    const { color } = this.props;

    return (
      <SketchPicker
        color={color}
        // onChange={ this.props.changeColor(color) }
        disableAlpha={true}
        width={250}
        onChangeComplete={this.handleChangeColor}
      />
    )
  };
}

export default ColorPicker;