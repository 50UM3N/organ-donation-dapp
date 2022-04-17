import { Web3ActionType } from "../actions/web3-action";
import { Action, Reducer } from "redux";

export interface InitialWeb3State {
    loading: boolean;
    error: null | string | object;
    web3: null | object;
}

const initialState: InitialWeb3State = {
    loading: false,
    error: null,
    web3: null,
};

export interface Web3DispatchAction extends Action<Web3ActionType> {
    payload: Partial<InitialWeb3State>;
}

const web3Reducer: Reducer<InitialWeb3State, Web3DispatchAction> = (state = initialState, action) => {
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
