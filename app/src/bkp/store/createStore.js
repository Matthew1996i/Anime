import { configureStore, applyMiddleware } from 'redux';

export default (reducers, middlewares) => {
  const enhancer = applyMiddleware(...middlewares);

  return configureStore(reducers, enhancer);
};
