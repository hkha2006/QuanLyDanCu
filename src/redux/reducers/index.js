import { combineReducers } from "redux";
import loginReducers from "../../Pages/Login/stores/reducers";
import userReducers from "../../Pages/Users/stores/reducers";

export default function createReducer() {
  const rootReducer = combineReducers({
    loginReducers,
    userReducers
  });
  return rootReducer;
}
