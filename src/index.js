import React from 'react';
import ReactDOM from 'react-dom';
import './app/utils/logger';
import Main from './app/Main';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
