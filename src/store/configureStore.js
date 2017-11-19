import {createStore, applyMiddleware} from 'redux';
import reducer from '../modules';
import thunk from 'redux-thunk';

export default configureStore = () => {
  const store = createStore(reducer, applyMiddleware(thunk));
  return store;
};
