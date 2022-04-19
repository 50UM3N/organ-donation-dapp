export enum Web3ActionType {
    WEB3_LOADING="WEB3_LOADING",
    WEB3_SUCCESS="WEB3_SUCCESS",
    WEB3_ERROR="WEB3_ERROR",
}

export const web3Success = (web3: object) => {
    return {
        type: Web3ActionType.WEB3_SUCCESS,
        payload: web3,
    };
};
export const web3Loading = () => {
    return {
        type: Web3ActionType.WEB3_LOADING,
        payload: null,
    };
};
export const web3Error = (error: string | object) => {
    return {
        type: Web3ActionType.WEB3_ERROR,
        payload: error,
    };
};
