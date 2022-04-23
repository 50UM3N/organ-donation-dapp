import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { IRootState } from "../store";
import { Contract } from "web3-eth-contract";
import Nav from "../Components/Navigation/Nav";
import { Center, Container, Divider, Loader, Paper, Text, Title } from "@mantine/core";
import { handleRPCError } from "../utils/handleError";
import { useParams } from "react-router-dom";

interface props {
    contract: Contract | null;
}

const Doner: React.FC<props> = ({ contract }) => {
    const { donerId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [data, setData] = useState<null | []>(null);
    useEffect(() => {
        (async () => {
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            try {
                const donors = await contract?.methods.getDonerById(donerId).call({ from: accounts[0] });
                if (donors.length === 0) throw new Error("There is no doner available!");
                setData(donors);
                setLoading(false);
            } catch (err: any) {
                setError(handleRPCError(err).message);
                setLoading(false);
            }
        })();
    }, [contract?.methods, donerId]);

    return (
        <Nav>
            <Container>
                <Paper withBorder p="md">
                    <Title order={4}>Doner Details</Title>
                    <Divider my="sm" />
                    {loading && (
                        <Center>
                            <Loader />
                        </Center>
                    )}
                    {error && <Text color="red">{error}</Text>}
                </Paper>
            </Container>
        </Nav>
    );
};

const mapStateToProps = (state: IRootState) => ({
    contract: state.contractReducer.contract,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Doner);
