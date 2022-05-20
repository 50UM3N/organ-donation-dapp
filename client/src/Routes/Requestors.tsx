import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { handleRPCError } from "../utils/handleError";
import Nav from "../Components/Navigation/Nav";
import {
    Button,
    Center,
    Divider,
    Loader,
    Paper,
    Text,
    Title,
    Container,
    ScrollArea,
    Table,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { InfoCircle } from "tabler-icons-react";
import { toString } from "../utils/utils";

interface props {
    contract: Contract;
    user: UserState;
}

const Requestors: React.FC<props> = ({ contract, user }) => {
    console.log(user);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [data, setData] = useState<null | []>(null);
    useEffect(() => {
        (async () => {
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            try {
                const requestor = await contract?.methods.getRequestor(user?.id).call({ from: accounts[0] });
                if (requestor.length === 0) throw new Error("There is no requestor!");
                setData(requestor);
                setLoading(false);
            } catch (err: any) {
                setError(handleRPCError(err).message);
                setLoading(false);
            }
        })();
    }, [contract?.methods, user?.id]);
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
                        <ScrollArea style={{ width: "100%" }}>
                            <Table mb="xl">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>Mobile Number</th>
                                        <th>Email Address</th>
                                        <th>Aadhaar Id</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{toString(item["fname"]) + " " + toString(item["lname"])}</td>
                                            <td>{toString(item["address_line"])}</td>
                                            <td>{toString(item["email"])}</td>
                                            <td>{item["mobile"]}</td>
                                            <td>{item["uidai"]}</td>
                                            <td>
                                                <Button
                                                    size="xs"
                                                    leftIcon={<InfoCircle size={18} />}
                                                    onClick={() => navigate("/requestor/" + item["id"])}
                                                >
                                                    Details
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
    user: state.userReducer,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Requestors);
