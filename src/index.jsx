import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Amplify from 'aws-amplify';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import config from './config';

Amplify.configure({
  Auth: {
    mandatorySignin: false,
    region: config.region,
    userPoolId: config.cognito.userPoolId,
    identityPoolId: config.cognito.identityPoolId,
    userPoolWebClientId: config.cognito.appClientId,
  },
  Storage: {
    region: config.region,
    identityPoolId: config.cognito.identityPoolId,
  },
  API: {
    endpoints: [
      {
        name: 'videocloud',
        endpoint: config.apiGateway.url,
        region: config.region,
      },
    ],
  },
});

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
