import { combineReducers } from "redux";
import postReducer from "./post";
import updateReducer from "./update";
const RootReducer = combineReducers({
  post: postReducer,
  update: updateReducer,
});

export default RootReducer;
