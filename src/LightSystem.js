import React from 'react';
import AmbientLight from './AmbientLight';
import MainLightElement from './MainLight';
import Slider from './Slider';
import api from './api';

class LightSystem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          mainLightArray: {}
        };
        this.updateStatus = this.updateStatus.bind(this);
    };
    async componentDidMount() {    
      await api.getMainLight()
      .then(r => this.setState({ mainLightArray: r || {} }));
    };
    async updateStatus(gpioList, newStatus) {
      gpioList = (Array.isArray(gpioList) ? gpioList : gpioList = [gpioList]);
      await api.sendMainLight(gpioList, newStatus ? "on" : "off")
      .then(r => this.setState({ mainLightArray: r || {} }));
    };
    createGpioList(first, last) {
      const gpioList = [];
      const gpioIdList = [];
      const step = ((last > first) ? 1 : -1);
      for(let i = first; last > first ? i <= last : i >= last; i+=step) {
        gpioIdList.push(`gpio${i}`);
        gpioList.push(<MainLightElement
          id={ `gpio${i}` }
          status={ this.state.mainLightArray[`gpio${i}`] }
          updateStatus = { this.updateStatus } />
        );
      };
      return [gpioList, gpioIdList];
    };
    render() {
      let gpioListLeft = [];
      let gpioIdListLeft = [];
      let gpioListRight = [];
      let gpioIdListRight = [];
      [gpioListLeft, gpioIdListLeft] = this.createGpioList(5,8);
      [gpioListRight, gpioIdListRight] = this.createGpioList(4,1);
      return (
        <div className="container main-container">
          <div className="row valign-wrapper">
            <div className="col s3"/>
            <div className="col s2 card main-light-panel center-align">
              { gpioListLeft }
              <div className="card-action">
                <a className="main-manage-group">Manage group</a>
                <a className="waves-effect waves-blue btn main-btn-switch" onClick={ () => this.updateStatus(gpioIdListLeft, false) }>off</a>
                <a className="waves-effect waves-blue btn main-btn-switch"  onClick={ () => this.updateStatus(gpioIdListLeft, true) }>on</a>
                <Slider value='100' />
              </div>

            </div>
            <div className="col s1">
              <AmbientLight />
            </div>
            <div className="col s2 card main-light-panel center-align">
              { gpioListRight }
              <div className="card-action">
                <a className="main-manage-group">Manage group</a>
                <a className="waves-effect waves-blue btn main-btn-switch" onClick={ () => this.updateStatus(gpioIdListRight, false) }>off</a>
                <a className="waves-effect waves-blue btn main-btn-switch" onClick={ () => this.updateStatus(gpioIdListRight, true) }>on</a>
                <Slider value={100} />
              </div>
            </div>          
            <div className="col s3"/>
          </div>
        </div>
      )
    }
  }

export default LightSystem;