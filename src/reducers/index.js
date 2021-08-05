import { combineReducers, createStore, applyMiddleware ,compose} from 'redux';
import thunk from 'redux-thunk';
const middleware = [thunk];


import videosReducer from './videos_reducer';

const rootReducer = combineReducers({
  videos: videosReducer
});


const ReactReduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();



const store = createStore(
  rootReducer, 
  {}, 
  compose(
  applyMiddleware(...middleware),
  ReactReduxDevTools
));

export default store;
