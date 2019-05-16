import { applyMiddleware, createStore } from 'redux';

import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import React from 'react';

import createReducer from './reducer';
import middleware from './middleware';

const createRedux = (initialState = {}) => {
  const store = createStore(createReducer(initialState), applyMiddleware(...middleware));

  const Redux = ({ children }) => <Provider store={store}>
    {children}
  </Provider>;

  const { node } = PropTypes;

  Redux.propTypes = {
    children: node
  };

  return Redux;
};

export default createRedux;
