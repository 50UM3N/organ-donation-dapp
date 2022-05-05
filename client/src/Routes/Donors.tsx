import { connect } from "react-redux";
import React, { useEffect, useState } from "react";

import { handleRPCError } from "../utils/handleError";
import Nav from "../Components/Navigation/Nav";
import { Button, Center, Divider, Loader, Paper, Text, Title, Container } from "@mantine/core";
import useGridStyle from "../Components/Grid.style";
import { Grid, _ } from "gridjs-react";
import { useNavigate } from "react-router-dom";
import { InfoCircle } from "tabler-icons-react";
import { toString } from "../utils/utils";

interface props {
    contract: Contract;
}

const Donors: React.FC<props> = ({ contract }) => {
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
                const donors = await contract?.methods.getDoner().call({ from: accounts[0] });
                if (donors.length === 0) throw new Error("There is no doner available!");
                setData(donors);
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
                    <Title order={4}>List of donors</Title>
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
                                toString(item["fname"]) + " " + toString(item["lname"]),
                                toString(item["address_line"]),
                                toString(item["email"]),
                                item["mobile"],
                                item["uidai"],
                                _(
                                    <Button
                                        size="xs"
                                        leftIcon={<InfoCircle size={18} />}
                                        onClick={() => navigate("/doner/" + item["id"])}
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

const mapStateToProps = (state: RootState) => ({
    contract: state.contractReducer.contract,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Donors);
