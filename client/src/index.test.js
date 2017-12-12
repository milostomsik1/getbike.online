import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';

it('renders App into index root without crashing', () => {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
  ReactDOM.render(<App />, document.getElementById('root'));
});

it('successfully registers service workers', () => {
  registerServiceWorker();
});