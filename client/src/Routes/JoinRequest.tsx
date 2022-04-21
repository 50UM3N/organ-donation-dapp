import { connect } from "react-redux";
import React, { useEffect } from "react";
import { IRootState } from "../store";
import { Contract } from "web3-eth-contract";

interface props {
    contract: Contract | null;
}

const JoinRequest: React.FC<props> = ({ contract }) => {
    useEffect(() => {
        (async () => {
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const unverifiedUser = await contract?.methods.getUnverifiedUser().call({ from: accounts[0] });
            console.log(unverifiedUser);
        })();
    }, [contract?.methods]);

    return <div>JoinRequest</div>;
};

const mapStateToProps = (state: IRootState) => ({
    contract: state.contractReducer.contract,
});

export default connect(mapStateToProps)(JoinRequest);
