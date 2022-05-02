import { Web3ActionType } from "../actions/web3-action";
import { Action, Reducer } from "redux";

const initialState: Web3State = {
    loading: false,
    error: null,
    web3: null,
};

export interface Web3DispatchAction extends Action<Web3ActionType> {
    payload: any;
}

const web3Reducer: Reducer<Web3State, Web3DispatchAction> = (state = initialState, action) => {
    switch (action.type) {
        case Web3ActionType.WEB3_SUCCESS:
            return { ...state, web3: action.payload, loading: false };
        case Web3ActionType.WEB3_LOADING:
            return { ...state, loading: true, web3: action.payload };
        case Web3ActionType.WEB3_ERROR:
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};

export default web3Reducer;
