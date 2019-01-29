import React, { Component } from 'react';
import api from './api';
import M from '../node_modules/materialize-css/dist/js/materialize.min.js';

class AmbientLight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorValue: props.colorValue || 'fff'
    };
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const color = data.get('inputColor');
    const red = color.slice(1,3);
    const green = color.slice(3,5);
    const blue = color.slice(5,7);
    const colorData = { 
      red: parseInt(red, 16), 
      green: parseInt(green, 16), 
      blue: parseInt(blue, 16) 
    };
    console.log(colorData);
    api.sendAmbientLight(colorData);
    M.toast({ html: 'Data has been sent', classes: 'green' });
  }

  render() {
    return (
    <React.Fragment>
      <form onSubmit={ this.handleSubmit.bind(this) }>
        <input
        name="inputColor"
        className="jscolor {hash:true, uppercase:false}"
        style={{'width':'70%'}} />
        <button type="submit" className="btn colorPickerSend blue"><i className="material-icons valign-wrapper" >send</i></button>
      </form>
    </React.Fragment>
    )
  }
}

export default AmbientLight;