import { web3Loading, web3Error, web3Success } from "../actions/web3-action";
import { contractSuccess } from "../actions/contract-action";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export const setWeb3 = (abi: AbiItem | AbiItem[], address?: string | undefined) => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
        dispatch(web3Loading());
        let web3 = null;
        if (window.ethereum)
            try {
                await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                web3 = new Web3(window.ethereum);
            } catch (e: any) {
                dispatch(web3Error(e.message));
                return;
            }
        else if (window.web3) web3 = new Web3(window.web3.currentProvider);
        else web3 = new Web3("http://127.0.0.1:9545/");
        const contract = new web3.eth.Contract(abi, address);
        dispatch(contractSuccess(contract));
        dispatch(web3Success(web3));
    };
};
