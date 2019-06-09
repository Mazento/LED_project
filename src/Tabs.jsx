import React from 'react';

class Tabs extends React.Component {
    render() {
        return (
            <div>
                <nav className="block light-blue darken-3 nav-extended">
                    <div className="nav-wrapper" style={{'marginLeft': '10rem'}}>
                        <a className="brand-logo">Control Panel</a>
                        <a className="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    </div>
                    <div className="row" style={{'marginLeft': '10rem'}}>
                        <div className="nav-content col s12">
                            <ul className="tabs tabs-transparent">
                                <li className="tab col s2"><a className="active" href="#test1">Lights</a></li>
                                <li><a className="separator"></a></li>
                                <li className="tab col s2"><a href="#test2">Music</a></li>
                                <li className="tab col s2"><a href="#test3">Misc</a></li>
                                <li className="tab col s2"><a href="#test4">Android</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* <div id="test1" className="col s12">Test 1</div>
          <div id="test2" className="col s12">Test 2</div>
          <div id="test3" className="col s12">Test 3</div>
          <div id="test4" className="col s12">Test 4</div> */}
            </div>
        )
    }
}

export default Tabs;
