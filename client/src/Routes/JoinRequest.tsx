import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { IRootState } from "../store";
import { Contract } from "web3-eth-contract";
import Nav from "../Components/Navigation/Nav";
import { Grid,_ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
// import { h } from "gridjs";
import { Button } from "@mantine/core";

interface props {
    contract: Contract | null;
}



const JoinRequest: React.FC<props> = ({ contract }) => {
    const [data, setData] = useState([])
    useEffect(() => {
        (async () => {
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const unverifiedUser = await contract?.methods.getUnverifiedUser().call({ from: accounts[0] });
            setData(unverifiedUser);
        })();
    }, [contract?.methods]);

    const approveUser=()=>{
        console.log("User Approved")
    }
    return (
        <Nav>
            {data && data.length !== 0 ? (
                <Grid
                                columns={[
                                    "#","Name","Address","Email Address","Mobile Number","Action"
                                ]}
                                data={data.map((item, index) => [
                                    index+1,
                                    item["name"],
                                    item["user_address"],
                                    item["email"],
                                    item["mobile"],
                                    _(<Button color={"green"} onClick={()=>approveUser()}>
                                        Approve
                                    </Button>)
                                ])}
                                search={false}
                                pagination={{
                                    enabled: true,
                                    limit: 5,
                                }}
                            />):
            (<div>No user request to display</div>)}
        </Nav>
    );
};

const mapStateToProps = (state: IRootState) => ({
    contract: state.contractReducer.contract,
});

export default connect(mapStateToProps)(JoinRequest);
