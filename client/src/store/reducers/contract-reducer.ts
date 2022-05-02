import { Action, Reducer } from "redux";
import { ContractActionType } from "../actions/contract-action";
import { Contract } from "web3-eth-contract";

const initialState: ContractState = {
    loading: false,
    error: null,
    contract: null,
};

export interface ContractDispatchAction extends Action<ContractActionType> {
    payload: Contract;
}

const contractReducer: Reducer<ContractState, ContractDispatchAction> = (state = initialState, action) => {
    switch (action.type) {
        case ContractActionType.CONTRACT_SUCCESS:
            return { ...state, contract: action.payload, loading: false };
        case ContractActionType.CONTRACT_LOADING:
            return { ...state, loading: true };
        case ContractActionType.CONTRACT_ERROR:
            return { ...state, contract: null, error: action.payload, loading: false };
        default:
            return state;
    }
};

export default contractReducer;
