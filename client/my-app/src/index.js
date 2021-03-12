import React from 'react';
import ReactDom from 'react-dom';
import Router from './Router/Routes';
import './index.css';

import Rootreducer from './Reducers/Rootreducer';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(Rootreducer, applyMiddleware(thunk));

const Index = () => {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Router />
      </Provider>
    </React.Fragment>
  );
};

ReactDom.render(<Index />, document.getElementById('root'));
