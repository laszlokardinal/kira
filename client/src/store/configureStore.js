import { combineReducers, createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

const configureStore = () => {
  const rootReducer = combineReducers({});

  const middlewares = [];

  if (process.env.NODE_ENV === "development") {
    const logger = createLogger();
    middlewares.unshift(logger);
  }

  const store = createStore(rootReducer, applyMiddleware(...middlewares));

  return store;
};

export default configureStore;
