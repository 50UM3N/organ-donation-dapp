import { Navigate, useLocation, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { web3Loading, web3Success, web3Error, contractSuccess, userAdd } from "../store/actions";
import Loader from "../Components/Loader";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { Contract } from "web3-eth-contract";
import { toString } from "../utils/utils";
import { Text } from "@mantine/core";
import provider from "../utils/provider";

interface props {
    contract: Contract | null;
    web3: Web3State;
    user: UserState;
    contractSuccess: (contract: Contract) => void;
    web3Success: (web3: any) => void;
    web3Error: (e: string) => void;
    userAdd: (user: User) => void;
}

const AuthProvider: React.FC<props> = ({
    contract,
    web3,
    contractSuccess,
    web3Success,
    web3Error,
    userAdd,
    user,
}) => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const { contract, accounts, web3: _web3, error } = await provider();
            if (error) {
                web3Error(error.message);
                setLoading(false);
                return;
            }
            if (!contract && !accounts) return;
            const user = await contract.methods.getUser().call({ from: accounts[0] });
            if (toString(user.user.email))
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
                              longitude: toString(user.hospital.longitude),
                              latitude: toString(user.hospital.latitude),
                              telephone: toString(user.hospital.telephone),
                              mobile: toString(user.hospital.mobile),
                              emergency_mobile: toString(user.hospital.emergency_mobile),
                          }
                        : null,
                });
            contractSuccess(contract);
            web3Success(_web3);
            setLoading(false);
        })();
    }, [contractSuccess, userAdd, web3Error, web3Success]);
    if (loading) {
        return <Loader />;
    } else if (web3.error) {
        // @ts-ignore
        return <Text color="orange">{web3?.error}</Text>;
    } else if (web3.web3) {
        if (user) {
            return <Outlet />;
        } else {
            return <Navigate to="/register" />;
        }
    } else {
        return <Navigate to="/login" state={{ from: location }} />;
    }
};
const mapStateToProps = (state: RootState) => {
    return {
        web3: state.web3Reducer,
        contract: state.contractReducer.contract,
        user: state.userReducer,
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
        userAdd: (user: User) => {
            dispatch(userAdd(user));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider);
