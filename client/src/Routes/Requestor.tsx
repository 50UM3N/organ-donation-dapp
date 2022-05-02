import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { IRootState } from "../store";
import { Contract } from "web3-eth-contract";
import Nav from "../Components/Navigation/Nav";
import {
    Center,
    Col,
    Container,
    Divider,
    Grid,
    Group,
    Loader,
    Paper,
    Space,
    Text,
    Title,
    List,
} from "@mantine/core";
import { handleRPCError } from "../utils/handleError";
import { useParams } from "react-router-dom";
import RequestorOrganRegistration from "../Components/RequestorOrganRegistration";

interface props {
    contract: Contract | null;
}

const Requestor: React.FC<props> = ({ contract }) => {
    const { requestorId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [data, setData] = useState<Doner | null>(null);
    const [organs, setOrgans] = useState<any>(null);
    const [requestorOrgans, setRequestorOrgans] = useState<Array<RequestorOrgans> | null>(null);

    useEffect(() => {
        (async () => {
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            try {
                const requestors = await contract?.methods
                    .getRequestorById(requestorId)
                    .call({ from: accounts[0] });
                const _organs = await contract?.methods.getOrgans().call({ from: accounts[0] });
                setOrgans([
                    ..._organs.map((item: any) => ({
                        organ_name: item.organ_name,
                        id: Number(item.id),
                        valid_time: Number(item.valid_time),
                    })),
                ]);
                const _requestorOrgans = await contract?.methods
                    .getRequestorOrgans(Number(requestors.id))
                    .call({ from: accounts[0] });
                if (requestors.length === 0) throw new Error("There is no doner available!");
                setRequestorOrgans([
                    ..._requestorOrgans.map((item: any) => ({
                        id: Number(item.requestorOrgans.id),
                        transplanted: item.requestorOrgans.transplanted,
                        blood_group: item.requestorOrgans.blood_group,
                        requestor_map_id: Number(item.requestorOrgans.requestor_map_id),
                        organ_map_id: Number(item.requestorOrgans.organ_map_id),
                        organ: _organs[Number(item.requestorOrgans.organ_map_id) - 1]["organ_name"],
                        matchOrgans: item.matchOrgans.map((item: any) => ({
                            id: Number(item.id),
                            available: item.available,
                            blood_group: item.blood_group,
                            doner_map_id: Number(item.doner_map_id),
                            organ_map_id: Number(item.organ_map_id),
                            time: Number(item.time),
                            organ: _organs[Number(item.organ_map_id) - 1]["organ_name"],
                        })),
                    })),
                ]);
                setData(requestors);
                setLoading(false);
            } catch (err: any) {
                setError(handleRPCError(err).message);
                setLoading(false);
            }
        })();
    }, [contract?.methods, requestorId]);
    return (
        <Nav>
            {loading && (
                <Center>
                    <Loader />
                </Center>
            )}
            {error && <Text color="red">{error}</Text>}
            {data && (
                <>
                    <Container>
                        <Paper withBorder p="md">
                            <Title order={4}>Doner Details</Title>
                            <Divider my="sm" />

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
                                    <Text mb={3}>
                                        {new Date(parseInt(data?.dob)).toLocaleDateString("en-US")}
                                    </Text>
                                    <Space h="xs" />
                                    <Text color="dimmed" mb={0} size="sm">
                                        Age:
                                    </Text>
                                    <Text mb={3}>{data?.age}</Text>
                                    <Space h="xs" />
                                    <Text color="dimmed" mb={0} size="sm">
                                        Mobile Number:
                                    </Text>
                                    <Text mb={3}>{"+91-" + data?.mobile}</Text>
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

                            <RequestorOrganRegistration organs={organs} requestor={data} />
                        </Paper>
                    </Container>
                    {requestorOrgans && (
                        <Container my="md">
                            <Paper withBorder p="md">
                                <Group position="apart">
                                    <Title order={4}>All Organs donated by the user</Title>
                                </Group>
                                <Divider my="sm" />
                                <List listStyleType="disc">
                                    {requestorOrgans.map((organ) => (
                                        <React.Fragment key={Math.random()}>
                                            <List.Item>
                                                <Group spacing="md">
                                                    <Text>
                                                        <strong>ID: </strong>
                                                        {organ.id}
                                                    </Text>
                                                    <Text>
                                                        <strong>Available: </strong>
                                                        {organ.transplanted ? "Yes" : "No"}
                                                    </Text>
                                                    <Text>
                                                        <strong>Blood Group: </strong>
                                                        {organ.blood_group}
                                                    </Text>
                                                    <Text>
                                                        <strong>Requestor ID: </strong>
                                                        {organ.requestor_map_id}
                                                    </Text>
                                                    <Text>
                                                        <strong>Organ ID: </strong>
                                                        {organ.organ_map_id}
                                                    </Text>
                                                    <Text>
                                                        <strong>Organ Name: </strong>
                                                        {organ.organ}
                                                    </Text>
                                                </Group>
                                                {organ.matchOrgans.length > 0 && (
                                                    <List withPadding listStyleType="disc">
                                                        {organ.matchOrgans.map((organ2) => (
                                                            <List.Item key={Math.random()}>
                                                                <Group spacing="md">
                                                                    <Text>
                                                                        <strong>ID: </strong> {organ2.id}
                                                                    </Text>
                                                                    <Text>
                                                                        <strong>Available: </strong>
                                                                        {organ2.available ? "Yes" : "No"}
                                                                    </Text>
                                                                    <Text>
                                                                        <strong>Blood Group: </strong>
                                                                        {organ2.blood_group}
                                                                    </Text>
                                                                    <Text>
                                                                        <strong>Doner ID: </strong>
                                                                        {organ2.doner_map_id}
                                                                    </Text>
                                                                    <Text>
                                                                        <strong>Organ ID: </strong>
                                                                        {organ2.organ_map_id}
                                                                    </Text>
                                                                    <Text>
                                                                        <strong>Organ Name: </strong>{" "}
                                                                        {organ2.organ}
                                                                    </Text>
                                                                    <Text>
                                                                        <strong>Time(Hr): </strong>{" "}
                                                                        {organ2.time}
                                                                    </Text>
                                                                </Group>
                                                            </List.Item>
                                                        ))}
                                                    </List>
                                                )}
                                            </List.Item>
                                        </React.Fragment>
                                    ))}
                                </List>
                            </Paper>
                        </Container>
                    )}
                </>
            )}
        </Nav>
    );
};

const mapStateToProps = (state: IRootState) => ({
    contract: state.contractReducer.contract,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Requestor);
