import { Navigate, useLocation, Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { web3Loading, web3Success, web3Error, contractSuccess, userAdd } from "../store/actions";
import donationArtifact from "../artifact/DonationContract.json";
import Web3 from "web3";
import Loader from "../Components/Loader";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { IRootState } from "../store";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";

interface props {
    web3: any;
    contractSuccess: (contract: Contract) => void;
    web3Success: (web3: any) => void;
    web3Error: (e: string) => void;
    userAdd: (user: object) => void;
}

const AuthProvider: React.FC<props> = ({ web3, contractSuccess, web3Success, web3Error, userAdd }) => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const { abi, networks } = donationArtifact;
            let _web3 = null;
            let accounts;
            if (window.ethereum) {
                accounts = await window.ethereum.request({
                    method: "eth_accounts",
                });
                if (accounts.length === 0) {
                    setLoading(false);
                    return;
                }
                try {
                    await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    _web3 = new Web3(window.ethereum);
                } catch (e: any) {
                    web3Error(e.message);
                    setLoading(false);
                    return;
                }
            } else if (window.web3) {
                _web3 = new Web3(window.web3.currentProvider);
            } else _web3 = new Web3("http://127.0.0.1:9545/");
            const contract = new _web3.eth.Contract(abi as AbiItem[], networks[5777].address);
            const user = await contract.methods.getUser().call({ from: accounts[0] });
            contractSuccess(contract);
            web3Success(_web3);
            if (user.email)
                userAdd({
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    verified: user.verified,
                    role: user.role,
                    address: user.user_address,
                });
            else {
                navigate("/register");
                setLoading(false);
                return;
            }
            setLoading(false);
        })();
    }, [navigate, contractSuccess, web3Success, web3Error, userAdd]);
    if (loading) {
        return <Loader />;
    } else if (web3.error) {
        return <p>{web3.error}</p>;
    } else if (web3.web3) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" state={{ from: location }} />;
    }
};
const mapStateToProps = (state: IRootState) => {
    return {
        web3: state.web3Reducer,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        web3Loading: () => {
            dispatch(web3Loading());
        },
        web3Error: (e: string) => {
            dispatch(web3Error(e));
        },
        web3Success: (web3: any) => {
            dispatch(web3Success(web3));
        },
        contractSuccess: (contract: Contract) => {
            dispatch(contractSuccess(contract));
        },
        userAdd: (user: object) => {
            dispatch(userAdd(user));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider);