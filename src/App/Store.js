import { createStore, combineReducers } from "redux";
// import wheelReducer from "./wheelReducer";
import wheelReducer from "./Reducer"; // ✅ matches file name


const rootReducer = combineReducers({
  wheel: wheelReducer,
});

export const store = createStore(rootReducer);