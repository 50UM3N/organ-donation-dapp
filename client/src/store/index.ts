import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import * as allReducer from "./reducers";

const rootReducer = combineReducers(allReducer);
const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof rootReducer>;

export default store;
