import { Navigate, useLocation, Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    web3Loading,
    web3Success,
    web3Error,
    contractSuccess,
    userAdd,
} from "../store/actions";
import donationArtifact from "../artifact/DonationContract.json";
import Web3 from "web3";
import Loader from "../Components/Loader";

function AuthProvider({
    web3,
    contractSuccess,
    web3Success,
    web3Error,
    userAdd,
}) {
    let location = useLocation();
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
                } catch (e) {
                    web3Error(e.message);
                    setLoading(false);
                    return;
                }
            } else if (window.web3) {
                _web3 = new Web3(window.web3.currentProvider);
            } else _web3 = new Web3("http://127.0.0.1:9545/");
            let contract = new _web3.eth.Contract(abi, networks[5777].address);
            let user = await contract.methods
                .getUser()
                .call({ from: accounts[0] });

            contractSuccess(contract);
            web3Success(_web3);
            if (user.email)
                userAdd({
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    verified: user.verified,
                    role: user.role,
                });
            else {
                navigate("/register");
                setLoading(false);
                return;
            }
            setLoading(false);
        })();
    }, [contractSuccess, web3Success, web3Error, userAdd]);
    if (loading) {
        return <Loader />;
    } else if (web3.error) {
        return <p>{web3.error}</p>;
    } else if (web3.web3) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" state={{ from: location }} />;
    }
}
const mapStateToProps = (state) => {
    return {
        web3: state.web3Reducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        web3Loading: () => {
            dispatch(web3Loading());
        },
        web3Error: (e) => {
            dispatch(web3Error(e));
        },
        web3Success: (web3) => {
            dispatch(web3Success(web3));
        },
        contractSuccess: (contract) => {
            dispatch(contractSuccess(contract));
        },
        userAdd: (user) => {
            dispatch(userAdd(user));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider);
