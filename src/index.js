import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import {theme} from './theme/theme'
import './input.css'

import store from './redux/store';

import App from './components/App/App';



const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(

    <Provider store={store}> 
    <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </Provider>


);