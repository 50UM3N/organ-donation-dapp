import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import Nav from "../Components/Navigation/Nav";
import { Grid, _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { Button, Center, Container, Divider, Loader, Paper, Text, Title } from "@mantine/core";
import { handleRPCError } from "../utils/handleError";
import { showNotification, updateNotification } from "@mantine/notifications";
import { Circle, X } from "tabler-icons-react";
import useGridStyle from "../Components/Grid.style";
import { toString } from "../utils/utils";

interface props {
    contract: Contract;
}

const JoinRequest: React.FC<props> = ({ contract }) => {
    const { classes } = useGridStyle();
    const [data, setData] = useState<null | []>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    useEffect(() => {
        (async () => {
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            try {
                const unverifiedUser = await contract?.methods
                    .getUnverifiedUser()
                    .call({ from: accounts[0] });
                if (unverifiedUser.length === 0) throw new Error("There is no unverified hospital/agency!");
                setData(unverifiedUser);
                setLoading(false);
            } catch (err: any) {
                setError(handleRPCError(err).message);
                setLoading(false);
            }
        })();
    }, [contract?.methods]);
    const approveUser = async (address: string) => {
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        showNotification({
            id: "approved-user",
            loading: true,
            autoClose: false,
            disallowClose: true,
            title: "Approved User",
            message: "Wait approving the user..",
        });
        try {
            await contract?.methods.approveUser(address).send({ from: accounts[0] });
            updateNotification({
                id: "approved-user",
                color: "teal",
                title: "Approved User",
                message: "Successfully approved user..",
                icon: <Circle />,
                autoClose: 2000,
            });
        } catch (err: any) {
            updateNotification({
                id: "approved-user",
                color: "red",
                title: "Approved User",
                message: handleRPCError(err).message,
                icon: <X />,
                autoClose: 2000,
            });
        }
    };
    return (
        <Nav>
            <Container>
                <Paper p="md" withBorder>
                    <Title order={4}>List of new hospital/agency</Title>
                    <Divider my="sm" />
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
                            columns={["#", "Name", "Address", "Email Address", "Mobile Number", "Action"]}
                            data={data.map((item, index) => [
                                index + 1,
                                toString(item["name"]),
                                toString(item["user_address"]),
                                toString(item["email"]),
                                toString(item["mobile"]),
                                _(
                                    <Button color={"green"} size="xs" onClick={() => approveUser(item["id"])}>
                                        Approve
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

export default connect(mapStateToProps)(JoinRequest);
