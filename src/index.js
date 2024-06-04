import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

const access_token = localStorage.getItem('access_token');
if (access_token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);