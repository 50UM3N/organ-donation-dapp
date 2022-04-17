import { Action, Reducer } from "redux";
import { ContractActionType } from "../actions/contract-action";
import { Contract } from "web3-eth-contract";

export interface InitialContractState {
    loading: boolean;
    error: null | string | object;
    contract: null | Contract;
}

const initialState: InitialContractState = {
    loading: false,
    error: null,
    contract: null,
};

export interface ContractDispatchAction extends Action<ContractActionType> {
    payload: Partial<InitialContractState>;
}

const contractReducer: Reducer<InitialContractState, ContractDispatchAction> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ContractActionType.CONTRACT_SUCCESS:
            return { ...state, contract: action.payload as Contract, loading: false };
        case ContractActionType.CONTRACT_LOADING:
            return { ...state, loading: true };
        case ContractActionType.CONTRACT_ERROR:
            return { ...state, contract: null, error: action.payload, loading: false };
        default:
            return state;
    }
};

export default contractReducer;
