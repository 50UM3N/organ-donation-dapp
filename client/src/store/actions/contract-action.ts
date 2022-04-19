import { Contract } from "web3-eth-contract";
export enum ContractActionType {
    CONTRACT_SUCCESS="CONTRACT_SUCCESS",
    CONTRACT_LOADING="CONTRACT_LOADING",
    CONTRACT_ERROR="CONTRACT_ERROR",
}

export const contractSuccess = (contract: Contract) => {
    return {
        type: ContractActionType.CONTRACT_SUCCESS,
        payload: contract,
    };
};

export const contractError = (error: string) => {
    return {
        type: ContractActionType.CONTRACT_ERROR,
        payload: error,
    };
};

export const contractLoading = () => {
    return {
        type: ContractActionType.CONTRACT_LOADING,
    };
};
