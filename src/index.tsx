import React from 'react';
import ReactDOM from 'react-dom';
import './app/view/sass/_keyFrame.scss';
import App from './app';
import ErrorBoundary from './app/view/layout/common/ErrorBoudary';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { store } from './redux/store/index';
// import '../font-awesome/css/font-awesome.min.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "antd/dist/antd.css";
// import 'emoji-mart/css/emoji-mart.css';

const rootEl = document.getElementById('root');
const appRenderer = Component => ReactDOM.render(
    <ErrorBoundary >
        <Provider store={store}>
            <Component />
        </Provider>
    </ErrorBoundary>, rootEl);
appRenderer(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
