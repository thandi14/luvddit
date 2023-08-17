import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import configureStore from './store';

import { restoreCSRF, csrfFetch } from './store/csrf';
import { ModalProvider, Modal } from './context/Modal';
import { ModalProvider2, Modal2 } from './context/Modal2';


const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
}

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

function Root() {
  return (
    <ModalProvider2>
    <ModalProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Modal />
        <Modal2 />
      </BrowserRouter>
    </Provider>
    </ModalProvider>
    </ModalProvider2>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
