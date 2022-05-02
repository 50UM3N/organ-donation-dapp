import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { IRootState } from "../store";
import { Contract } from "web3-eth-contract";
import { handleRPCError } from "../utils/handleError";
import Nav from "../Components/Navigation/Nav";
import { Button, Center, Divider, Loader, Paper, Text, Title, Container } from "@mantine/core";
import useGridStyle from "../Components/Grid.style";
import { Grid, _ } from "gridjs-react";
import { useNavigate } from "react-router-dom";
import { InfoCircle } from "tabler-icons-react";

interface props {
    contract: Contract | null;
}

const Requestors: React.FC<props> = ({ contract }) => {
    const navigate = useNavigate();
    const { classes } = useGridStyle();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [data, setData] = useState<null | []>(null);
    useEffect(() => {
        (async () => {
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            try {
                const requestor = await contract?.methods.getRequestor().call({ from: accounts[0] });
                if (requestor.length === 0) throw new Error("There is no doner available!");
                setData(requestor);
                setLoading(false);
            } catch (err: any) {
                setError(handleRPCError(err).message);
                setLoading(false);
            }
        })();
    }, [contract?.methods]);
    return (
        <Nav>
            <Container>
                <Paper p="md" withBorder>
                    <Title order={4}>List of requestor</Title>
                    <Divider my="md" />
                    {loading && (
                        <Center>
                            <Loader />
                        </Center>
                    )}
                    {error && <Text color="red">{error}</Text>}
                    {data && (
                        <Grid
                            className={{
                                header: classes.tableHead,
                                container: classes.tableContainer,
                                footer: classes.tableFooter,
                                th: classes.tableTh,
                                td: classes.tableTd,
                            }}
                            columns={[
                                "#",
                                "Name",
                                "Address",
                                "Email Address",
                                "Mobile Number",
                                "Aadhaar Id",
                                "Action",
                            ]}
                            data={data.map((item, index) => [
                                index + 1,
                                item["fname"] + " " + item["lname"],
                                item["address_line"],
                                item["email"],
                                item["mobile"],
                                item["uidai"],
                                _(
                                    <Button
                                        size="xs"
                                        leftIcon={<InfoCircle size={18} />}
                                        onClick={() => navigate("/requestor-details/" + item["id"])}
                                    >
                                        Details
                                    </Button>
                                ),
                            ])}
                            search={false}
                            pagination={{
                                enabled: true,
                                limit: 5,
                            }}
                        />
                    )}
                </Paper>
            </Container>
        </Nav>
    );
};

const mapStateToProps = (state: IRootState) => ({
    contract: state.contractReducer.contract,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Requestors);