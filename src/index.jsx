import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Root from './Root';

import './css/index.css';
import './css/lights.css';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#91c5ff', },
    secondary: { main: '#00BAFF', },
    background: {
      paper: '#1f232d',
      default: "#272c38", 
    },
  },
  typography: {
    useNextVariants: true,
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Root />
  </MuiThemeProvider>,
  document.getElementById('root')
);