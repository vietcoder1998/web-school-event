import React, { ComponentElement } from 'react';
import ReactDOM from 'react-dom';
import './view/sass/_keyFrame.scss';
import App from './view';
import ErrorBoundary from './routes/ErrorBoudary';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { store } from './redux/store/index';
// import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "antd/dist/antd.css";
// import 'emoji-mart/css/emoji-mart.css';
import { DocumentMeta } from 'react-document-meta';
import MetaConvert from './utils/meta.convert';

const rootEl = document.getElementById('root');
const appRenderer = (Component?: any) => ReactDOM.render(
    <Provider store={store}>
        <Component />
    </Provider>
    , rootEl);
appRenderer(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
