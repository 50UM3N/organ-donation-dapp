import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { IRootState } from "../store";
import { Contract } from "web3-eth-contract";
import Nav from "../Components/Navigation/Nav";
import { Center, Col, Container, Divider, Grid, Loader, Paper, Space, Text, Title } from "@mantine/core";
import { handleRPCError } from "../utils/handleError";
import { useParams } from "react-router-dom";

interface props {
    contract: Contract | null;
}
type TypeData = null | {
    fname: string;
    lname: string;
    email: string;
    dob: string;
    mobile: string;
    age: string;
    weight: string;
    height: string;
    bmi: string;
    blood_group: string;
    gender: string;
    address_line: string;
    state: string;
    district: string;
    postal_code: string;
}


const Doner: React.FC<props> = ({ contract }) => {
    const { donerId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [data, setData] = useState<TypeData>(null);
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
                    {data && (
                    <Grid gutter={"md"}>
                        <Col md={6}>
                            <Space h="xs" />
                            <Text color="dimmed" mb={0} size="sm">
                                First Name:
                            </Text>
                            <Text mb={3}>{data?.fname}</Text>
                            <Space h="xs" />
                            <Text color="dimmed" mb={0} size="sm">
                                Last Name:
                            </Text>
                            <Text mb={3}>{data?.lname}</Text>
                            <Space h="xs" />
                            <Text color="dimmed" mb={0} size="sm">
                                Email:
                            </Text>
                            <Text mb={3}>{data?.email}</Text>
                            <Space h="xs" />
                            <Text color="dimmed" mb={0} size="sm">
                                Date of Birth:
                            </Text>
                            <Text mb={3}>{new Date(parseInt(data?.dob)).toLocaleDateString("en-US")}</Text>
                            <Space h="xs" />
                            <Text color="dimmed" mb={0} size="sm">
                                Age:
                            </Text>
                            <Text mb={3}>{data?.age}</Text>
                            <Space h="xs" />
                            <Text color="dimmed" mb={0} size="sm">
                                Mobile Number:
                            </Text>
                            <Text mb={3}>{"+91-"+data?.mobile}</Text>
                            <Space h="xs" />
                            <Text color="dimmed" mb={0} size="sm">
                                Weight (in kg):
                            </Text>
                            <Text mb={3}>{data?.weight}</Text>
                            <Space h="xs" />
                            <Text color="dimmed" mb={0} size="sm">
                                Height:
                            </Text>
                            <Text mb={3}>{data?.height}</Text>
                            <Space h="xs" />
                        </Col>
                        <Col md={6}>
                            <Space h="xs" />
                            <Text color="dimmed" mb={0} size="sm">
                                Body Mass Index:
                            </Text>
                            <Text mb={3}>{data?.bmi}</Text>
                            <Space h="xs" />
                            <Text color="dimmed" mb={0} size="sm">
                                Blood Group:
                            </Text>
                            <Text mb={3}>{data?.blood_group}</Text>
                            <Space h="xs" />
                            <Text color="dimmed" mb={0} size="sm">
                                Gender:
                            </Text>
                            <Text mb={3}>{data?.gender}</Text>
                            <Space h="xs" />
                            <Text color="dimmed" mb={0} size="sm">
                                Address:
                            </Text>
                            <Text mb={3}>{data?.address_line}</Text>
                            <Space h="xs" />
                            <Text color="dimmed" mb={0} size="sm">
                                District:
                            </Text>
                            <Text mb={3}>{data?.district}</Text>
                            <Space h="xs" />
                            <Text color="dimmed" mb={0} size="sm">
                                Postal Code:
                            </Text>
                            <Text mb={3}>{data?.postal_code}</Text>
                            <Space h="xs" />
                            <Text color="dimmed" mb={0} size="sm">
                                State:
                            </Text>
                            <Text mb={3}>{data?.state}</Text>
                        </Col>
                    </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doner);
