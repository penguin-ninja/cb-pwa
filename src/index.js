import React from 'react';
import ReactDOM from 'react-dom';
import './app/utils/logger';
import './app/utils/local-storage';
import Main from './app/Main';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
