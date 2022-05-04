import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import * as allReducer from "./reducers";
import Web3 from "web3";

const rootReducer = combineReducers(allReducer);
const store = createStore(rootReducer, applyMiddleware(thunk));
const sample = new Web3();

export type RootState = ReturnType<typeof rootReducer>;
export type Web3Sample = typeof sample;

export default store;
