import { createStore, applyMiddleware, compose } from 'redux';
import { default as thunk } from 'redux-thunk';
import { logger } from 'redux-logger';
import { reducer } from '../reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(
    applyMiddleware(logger, thunk)
));

