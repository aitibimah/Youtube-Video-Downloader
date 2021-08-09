import { combineReducers } from "redux";
import videos_reducer from "./videos_reducer";


export default combineReducers({
  app: videos_reducer,
});
