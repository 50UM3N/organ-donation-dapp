import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import Nav from "../Components/Navigation/Nav";
import {
    Button,
    Center,
    Container,
    Divider,
    Loader,
    Paper,
    ScrollArea,
    Table,
    Text,
    Title,
} from "@mantine/core";
import { handleRPCError } from "../utils/handleError";
import { showNotification, updateNotification } from "@mantine/notifications";
import { Circle, X } from "tabler-icons-react";
import { toString } from "../utils/utils";

interface props {
    contract: Contract;
}

const JoinRequest: React.FC<props> = ({ contract }) => {
    const [data, setData] = useState<null | { users: []; hospitals: [] }>(null);
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
    console.log(data);
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
                        <ScrollArea style={{ width: "100%" }} type="auto" mb="md">
                            <Table mb="xs">
                                <thead>
                                    <tr>
                                        <th>User Name</th>
                                        <th>User Email</th>
                                        <th>User Mobile Number</th>
                                        <th>Hospital Name</th>
                                        <th>Hospital Type</th>
                                        <th>Hospital Registration No</th>
                                        <th>Hospital Address Line</th>
                                        <th>Hospital State</th>
                                        <th>Hospital District</th>
                                        <th>Hospital Town</th>
                                        <th>Hospital Pincode</th>
                                        <th>Hospital Telephone</th>
                                        <th>Hospital Mobile</th>
                                        <th>Hospital Emergency no</th>
                                        <th>Approved</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.users.map((item, index) => (
                                        <tr key={index + 1}>
                                            <td>{toString(item["name"])}</td>
                                            <td>{toString(item["email"])}</td>
                                            <td>{toString(item["mobile"])}</td>
                                            <td>{toString(data.hospitals[index]["name"])}</td>
                                            <td>{toString(data.hospitals[index]["hospital_type"])}</td>
                                            <td>{toString(data.hospitals[index]["registration_number"])}</td>
                                            <td>{toString(data.hospitals[index]["address_line"])}</td>
                                            <td>{toString(data.hospitals[index]["state"])}</td>
                                            <td>{toString(data.hospitals[index]["district"])}</td>
                                            <td>{toString(data.hospitals[index]["town"])}</td>
                                            <td>{data.hospitals[index]["pincode"]}</td>
                                            <td>{toString(data.hospitals[index]["telephone"])}</td>
                                            <td>{toString(data.hospitals[index]["mobile"])}</td>
                                            <td>{toString(data.hospitals[index]["emergency_mobile"])}</td>
                                            <td>
                                                <Button
                                                    color={"green"}
                                                    size="xs"
                                                    onClick={() => approveUser(item["id"])}
                                                >
                                                    Approve
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </ScrollArea>
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
