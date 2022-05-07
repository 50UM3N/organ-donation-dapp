import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
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
import { toString } from "../utils/utils";

interface props {
    contract: Contract;
}

const Requestor: React.FC<props> = ({ contract }) => {
    const { requestorId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [data, setData] = useState<Doner&{requestHospital:Hospital} | null>(null);
    const [organs, setOrgans] = useState<any>(null);
    const [requestorOrgans, setRequestorOrgans] = useState<Array<RequestorOrgans> | null>(null);

    useEffect(() => {
        (async () => {
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            try {
                let requestors = await contract?.methods
                    .getRequestorById(requestorId)
                    .call({ from: accounts[0] });
                const _organs = await contract?.methods.getOrgans().call({ from: accounts[0] });

                let request_hospital = requestors._request_hospital
                request_hospital = {...request_hospital}
                request_hospital.name = toString(request_hospital.name);
                request_hospital.address_line = toString(request_hospital.address_line);
                request_hospital.district = toString(request_hospital.district);
                request_hospital.emergency_mobile = toString(request_hospital.emergency_mobile);
                request_hospital.hospital_type = toString(request_hospital.hospital_type);
                request_hospital.mobile = toString(request_hospital.mobile);
                request_hospital.registration_number = toString(request_hospital.registration_number);
                request_hospital.state= toString(request_hospital.state);                
                request_hospital.telephone= toString(request_hospital.telephone);
                request_hospital.town= toString(request_hospital.town);

                requestors = { ...requestors._requestor };
                requestors.fname = toString(requestors.fname);
                requestors.lname = toString(requestors.lname);
                requestors.email = toString(requestors.email);
                requestors.blood_group = toString(requestors.blood_group);
                requestors.gender = toString(requestors.gender);
                requestors.state = toString(requestors.state);
                requestors.district = toString(requestors.district);
                requestors.address_line = toString(requestors.address_line);
                requestors.postal_code = toString(requestors.postal_code);

                requestors.requestHospital = request_hospital;

                setOrgans([
                    ..._organs.map((item: any) => ({
                        organ_name: toString(item.organ_name),
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
                        blood_group: toString(item.requestorOrgans.blood_group),
                        requestor_map_id: Number(item.requestorOrgans.requestor_map_id),
                        organ_map_id: Number(item.requestorOrgans.organ_map_id),
                        organ: toString(_organs[Number(item.requestorOrgans.organ_map_id) - 1]["organ_name"]),
                        matchOrgans: item.matchOrgans.map((item: any) => ({
                            id: Number(item.id),
                            available: item.available,
                            blood_group: toString(item.blood_group),
                            doner_map_id: Number(item.doner_map_id),
                            organ_map_id: Number(item.organ_map_id),
                            time: Number(item.time),
                            organ: toString(_organs[Number(item.organ_map_id) - 1]["organ_name"]),
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
                            <Title order={4}>Requestor Details</Title>
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
                    <Container my="md">
                        <Paper withBorder p="md">
                            <Group position="apart">
                                <Title order={4}>Requestor Hospital Details</Title>
                            </Group>
                            <Divider my="sm" />

                            <Grid gutter={"md"}>
                                <Col md={6}>
                                    <Space h="xs" />
                                    <Text color="dimmed" mb={0} size="sm">
                                        Hospital Name:
                                    </Text>
                                    <Text mb={3}>{data.requestHospital?.name}</Text>
                                    <Space h="xs" />
                                    <Text color="dimmed" mb={0} size="sm">
                                        Hospital Type:
                                    </Text>
                                    <Text mb={3}>{data.requestHospital?.hospital_type}</Text>
                                    <Space h="xs" />
                                    <Text color="dimmed" mb={0} size="sm">
                                        Telephone Number:
                                    </Text>
                                    <Text mb={3}>{"+033 "+data.requestHospital?.telephone}</Text>
                                    <Space h="xs" />
                                    <Text color="dimmed" mb={0} size="sm">
                                        Mobile Number:
                                    </Text>
                                    <Text mb={3}>{"+91 "+data.requestHospital?.mobile}</Text>
                                    <Space h="xs" />
                                    <Text color="dimmed" mb={0} size="sm">
                                        Emergency Number:
                                    </Text>
                                    <Text mb={3}>{"+91 "+data.requestHospital?.emergency_mobile}</Text>
                                    <Space h="xs" />
                                </Col>
                                <Col md={6}>
                                    <Space h="xs" />
                                    <Text color="dimmed" mb={0} size="sm">
                                        Hospital Address:
                                    </Text>
                                    <Text mb={3}>{data.requestHospital?.address_line}</Text>
                                    <Space h="xs" />
                                    <Text color="dimmed" mb={0} size="sm">
                                        State:
                                    </Text>
                                    <Text mb={3}>
                                        {data.requestHospital?.state}
                                    </Text>
                                    <Space h="xs" />
                                    <Text color="dimmed" mb={0} size="sm">
                                        District:
                                    </Text>
                                    <Text mb={3}>{data.requestHospital?.district}</Text>
                                    <Space h="xs" />
                                    <Text color="dimmed" mb={0} size="sm">
                                        Town:
                                    </Text>
                                    <Text mb={3}>{data.requestHospital?.town}</Text>
                                    <Space h="xs" />
                                    <Text color="dimmed" mb={0} size="sm">
                                        Pincode:
                                    </Text>
                                    <Text mb={3}>{data.requestHospital?.pincode}</Text>
                                    <Space h="xs" />
                                </Col>
                            </Grid>
                        </Paper>
                    </Container>
                    {requestorOrgans && (
                        <Container my="md">
                            <Paper withBorder p="md">
                                <Group position="apart">
                                    <Title order={4}>All Donated Organs</Title>
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

const mapStateToProps = (state: RootState) => ({
    contract: state.contractReducer.contract,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Requestor);
