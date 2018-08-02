import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App.ShippingFilter  infos= {App._shipping_infos} />, document.getElementById('root'));
registerServiceWorker();
