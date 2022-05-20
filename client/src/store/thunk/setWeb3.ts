import { web3Loading, web3Error, web3Success } from "../actions/web3-action";
import { contractSuccess } from "../actions/contract-action";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { toString } from "../../utils/utils";
import { userAdd } from "../actions";

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
        // web3 = new Web3("http://127.0.0.1:9545/");
        const contract = new web3.eth.Contract(abi, address);
        const accounts = await web3.eth.getAccounts();
        const user = await contract.methods.getUser().call({ from: accounts[0] });
        dispatch(contractSuccess(contract));
        dispatch(web3Success(web3));
        if (toString(user.user.email))
            dispatch(
                userAdd({
                    id: user.user.id,
                    name: toString(user.user.name),
                    email: toString(user.user.email),
                    mobile: toString(user.user.mobile),
                    verified: user.user.verified,
                    role: toString(user.user.role),
                    hospital: toString(user.hospital.name)
                        ? {
                              id: Number(user.hospital.id),
                              name: toString(user.hospital.name),
                              hospital_type: toString(user.hospital.hospital_type),
                              registration_number: toString(user.hospital.registration_number),
                              address_line: toString(user.hospital.address_line),
                              state: toString(user.hospital.state),
                              district: toString(user.hospital.district),
                              town: toString(user.hospital.town),
                              pincode: Number(user.hospital.pincode),
                              telephone: toString(user.hospital.telephone),
                              mobile: toString(user.hospital.mobile),
                              emergency_mobile: toString(user.hospital.emergency_mobile),
                          }
                        : null,
                })
            );
    };
};
