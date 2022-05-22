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
    Button,
    Modal,
} from "@mantine/core";
import { handleRPCError } from "../utils/handleError";
import { useParams } from "react-router-dom";
import RequestorOrganRegistration from "../Components/RequestorOrganRegistration";
import { distanceCalculate, toString } from "../utils/utils";
import DetailsModal from "../Components/DetailsModal";

interface props {
    contract: Contract;
    user: UserState;
}

const Requestor: React.FC<props> = ({ contract, user }) => {
    const { requestorId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [data, setData] = useState<(Doner & { requestHospital: Hospital }) | null>(null);
    const [organs, setOrgans] = useState<any>(null);
    const [requestorOrgans, setRequestorOrgans] = useState<Array<
        RequestorOrgans & {
            matchHospitals: { matchedHospitalLongitutde: string; matchedHospitalLatitude: string }[];
        }
    > | null>(null);
    const [requestOrgans, setRequestOrgans] = useState<null | RequestOrganList[]>(null);
    const [detailsModal, setDetailsModal] = useState<{ active: boolean; selected: any }>({
        active: false,
        selected: null,
    });

    // console.log(requestorOrgans);

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
                try {
                    const _request_organ_list = await contract?.methods
                        .getOrganRequestor()
                        .call({ from: accounts[0] });
                    setRequestOrgans(
                        _request_organ_list.map((item: any) => ({
                            id: Number(item.id),
                            donerId: Number(item.doner_map_id),
                            requestorId: Number(item.doner_map_id),
                            donerOrganId: Number(item.doner_organ_map_id),
                            requestorOrganId: Number(item.requestor_organ_map_id),
                        }))
                    );
                } catch (err: any) {
                    console.log(err);
                }
                let request_hospital = requestors._request_hospital;
                request_hospital = { ...request_hospital };
                request_hospital.name = toString(request_hospital.name);
                request_hospital.address_line = toString(request_hospital.address_line);
                request_hospital.district = toString(request_hospital.district);
                request_hospital.emergency_mobile = toString(request_hospital.emergency_mobile);
                request_hospital.hospital_type = toString(request_hospital.hospital_type);
                request_hospital.mobile = toString(request_hospital.mobile);
                request_hospital.registration_number = toString(request_hospital.registration_number);
                request_hospital.state = toString(request_hospital.state);
                request_hospital.telephone = toString(request_hospital.telephone);
                request_hospital.town = toString(request_hospital.town);
                request_hospital.longitude = toString(request_hospital.longitude);
                request_hospital.latitude = toString(request_hospital.latitude);

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
                    .getRequestorOrgans(Number(requestors.id), user?.id)
                    .call({ from: accounts[0] });
                if (requestors.length === 0) throw new Error("There is no doner available!");
                setRequestorOrgans([
                    ..._requestorOrgans.map((item1: any) => {
                        const mOrgans = item1.matchOrgans.filter((item2: any, index: number) => {
                            const time: number = distanceCalculate(
                                Number(toString(item1.matchHospital[index].longitude)),
                                Number(toString(item1.matchHospital[index].latitude)),
                                Number(requestors.requestHospital.longitude),
                                Number(requestors.requestHospital.latitude)
                            );
                            if (Number(item2.time) >= time) return true;
                            return false;
                        });

                        return {
                            id: Number(item1.requestorOrgans.id),
                            transplanted: item1.requestorOrgans.transplanted,
                            blood_group: toString(item1.requestorOrgans.blood_group),
                            requestor_map_id: Number(item1.requestorOrgans.requestor_map_id),
                            organ_map_id: Number(item1.requestorOrgans.organ_map_id),
                            organ: toString(
                                _organs[Number(item1.requestorOrgans.organ_map_id) - 1]["organ_name"]
                            ),
                            matchOrgans: mOrgans.map((item2: any, index: number) => ({
                                id: Number(item2.id),
                                available: item2.available,
                                blood_group: toString(item2.blood_group),
                                doner_map_id: Number(item2.doner_map_id),
                                organ_map_id: Number(item2.organ_map_id),
                                time: Number(item2.time),
                                organ: toString(_organs[Number(item2.organ_map_id) - 1]["organ_name"]),
                            })),
                            matchHospitals: item1.matchHospital.map((item: any) => ({
                                matchedHospitalLongitutde: toString(item.longitude),
                                matchedHospitalLatitude: toString(item.latitude),
                            })),
                        };
                    }),
                ]);
                setData(requestors);
                setLoading(false);
            } catch (err: any) {
                setError(handleRPCError(err).message);
                setLoading(false);
            }
        })();
    }, [contract?.methods, requestorId, user?.id]);

    const placeOrgan = async (
        doner_id: number,
        requestor_id: number,
        doner_organ_id: number,
        requestor_organ_id: number
    ) => {
        console.log(doner_id, requestor_id, doner_organ_id, requestor_organ_id);
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        try {
            const res = await contract?.methods
                .requestForOrgan(requestor_organ_id, doner_organ_id, doner_id, requestor_id)
                .send({ from: accounts[0] });
            console.log(res);
        } catch (err: any) {
            console.log(err);
        }
    };

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
                        <Modal
                            size="xl"
                            opened={detailsModal.active}
                            onClose={() =>
                                setDetailsModal({
                                    active: false,
                                    selected: null,
                                })
                            }
                            title="Details"
                        >
                            <DetailsModal detailsModal={detailsModal} />
                        </Modal>

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
                                    <Text mb={3}>{data.requestHospital?.telephone}</Text>
                                    <Space h="xs" />
                                    <Text color="dimmed" mb={0} size="sm">
                                        Mobile Number:
                                    </Text>
                                    <Text mb={3}>{data.requestHospital?.mobile}</Text>
                                    <Space h="xs" />
                                    <Text color="dimmed" mb={0} size="sm">
                                        Emergency Number:
                                    </Text>
                                    <Text mb={3}>{data.requestHospital?.emergency_mobile}</Text>
                                    <Space h="xs" />
                                    <Text color="dimmed" mb={0} size="sm">
                                        Longitude:
                                    </Text>
                                    <Text mb={3}>{data.requestHospital?.longitude}</Text>
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
                                    <Text mb={3}>{data.requestHospital?.state}</Text>
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
                                    <Text color="dimmed" mb={0} size="sm">
                                        Latitude:
                                    </Text>
                                    <Text mb={3}>{data.requestHospital?.latitude}</Text>
                                    <Space h="xs" />
                                </Col>
                            </Grid>
                        </Paper>
                    </Container>
                    {requestorOrgans && (
                        <Container my="md">
                            {requestorOrgans.map((organ) => (
                                <Paper withBorder p="md" my="md" key={Math.random()}>
                                    <Title order={4}>{organ.organ}</Title>
                                    <Divider my="sm" />
                                    <Grid gutter="md">
                                        <Col md={6}>
                                            <Text mb={4}>
                                                <strong>ID: </strong>
                                                {organ.id}
                                            </Text>
                                            <Text mb={4}>
                                                <strong>Available: </strong>
                                                {organ.transplanted ? "Yes" : "No"}
                                            </Text>
                                            <Text mb={4}>
                                                <strong>Blood Group: </strong>
                                                {organ.blood_group}
                                            </Text>
                                            <Text mb={4}>
                                                <strong>Requestor ID: </strong>
                                                {organ.requestor_map_id}
                                            </Text>
                                            <Text mb={4}>
                                                <strong>Organ ID: </strong>
                                                {organ.organ_map_id}
                                            </Text>
                                            <Text mb={4}>
                                                <strong>Organ Name: </strong>
                                                {organ.organ}
                                            </Text>
                                        </Col>
                                        <Col md={6}>
                                            {(requestOrgans?.filter(
                                                (item: RequestOrganList) =>
                                                    item.requestorOrganId === Number(organ.id)
                                            ).length as number) > 0 ? (
                                                <>
                                                    {requestOrgans
                                                        ?.filter(
                                                            (item: RequestOrganList) =>
                                                                item.requestorId === Number(data.id)
                                                        )
                                                        .map((item100: RequestOrganList) => (
                                                            <Paper
                                                                sx={(theme) => ({
                                                                    backgroundColor: theme.colors.green[0],
                                                                })}
                                                                withBorder
                                                                p="md"
                                                                mb="xs"
                                                                key={Math.random()}
                                                            >
                                                                <Text mb={4}>
                                                                    <strong>ID: </strong> {item100.id}
                                                                </Text>
                                                                <Text mb={4}>
                                                                    <strong>Doner Id: </strong>
                                                                    {item100.donerId}
                                                                </Text>
                                                                <Text mb={4}>
                                                                    <strong>Requestor Id: </strong>
                                                                    {item100.requestorId}
                                                                </Text>
                                                                <Text mb={4}>
                                                                    <strong>Doner Organ Id: </strong>
                                                                    {item100.donerOrganId}
                                                                </Text>
                                                                <Text mb="md">
                                                                    <strong>Requestor Organ Id: </strong>
                                                                    {item100.requestorOrganId}
                                                                </Text>

                                                                <Group spacing="md">
                                                                    <Button
                                                                        color="green"
                                                                        size="xs"
                                                                        onClick={() =>
                                                                            setDetailsModal({
                                                                                active: true,
                                                                                selected: {
                                                                                    id: item100.id,
                                                                                    donerId: item100.donerId,
                                                                                    organId:
                                                                                        item100.requestorOrganId,
                                                                                },
                                                                            })
                                                                        }
                                                                    >
                                                                        Details
                                                                    </Button>
                                                                </Group>
                                                            </Paper>
                                                        ))}
                                                </>
                                            ) : (
                                                <>
                                                    {organ.matchOrgans.length > 0 &&
                                                        organ.matchOrgans.map((organ2) => (
                                                            <Paper
                                                                sx={(theme) => ({
                                                                    backgroundColor: theme.colors.red[1],
                                                                })}
                                                                withBorder
                                                                p="md"
                                                                mb="xs"
                                                                key={Math.random()}
                                                            >
                                                                <Text mb={4}>
                                                                    <strong>ID: </strong> {organ2.id}
                                                                </Text>
                                                                <Text mb={4}>
                                                                    <strong>Available: </strong>
                                                                    {organ2.available ? "Yes" : "No"}
                                                                </Text>
                                                                <Text mb={4}>
                                                                    <strong>Blood Group: </strong>
                                                                    {organ2.blood_group}
                                                                </Text>
                                                                <Text mb={4}>
                                                                    <strong>Doner ID: </strong>
                                                                    {organ2.doner_map_id}
                                                                </Text>
                                                                <Text mb={4}>
                                                                    <strong>Organ ID: </strong>
                                                                    {organ2.organ_map_id}
                                                                </Text>
                                                                <Text mb={4}>
                                                                    <strong>Organ Name: </strong>{" "}
                                                                    {organ2.organ}
                                                                </Text>
                                                                <Text mb={4}>
                                                                    <strong>Time(Hr): </strong> {organ2.time}
                                                                </Text>
                                                                <Divider my="xs" />
                                                                <Group spacing="md">
                                                                    <Button
                                                                        color="red"
                                                                        size="xs"
                                                                        onClick={() =>
                                                                            placeOrgan(
                                                                                organ2.doner_map_id,
                                                                                data?.id,
                                                                                organ2.id,
                                                                                organ.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Place
                                                                    </Button>
                                                                    <Button
                                                                        color="orange"
                                                                        size="xs"
                                                                        onClick={() =>
                                                                            setDetailsModal({
                                                                                active: true,
                                                                                selected: {
                                                                                    id: organ2.id,
                                                                                    donerId:
                                                                                        organ2.doner_map_id,
                                                                                    organId:
                                                                                        organ2.organ_map_id,
                                                                                },
                                                                            })
                                                                        }
                                                                    >
                                                                        Details
                                                                    </Button>
                                                                </Group>
                                                            </Paper>
                                                        ))}
                                                    {organ.matchOrgans.length === 0 && (
                                                        <Paper
                                                            color="red"
                                                            withBorder
                                                            p="md"
                                                            sx={(theme) => ({
                                                                backgroundColor: theme.colors.blue[0],
                                                            })}
                                                        >
                                                            <Text align="center">
                                                                No Organ Available yet !
                                                            </Text>
                                                        </Paper>
                                                    )}
                                                </>
                                            )}
                                        </Col>
                                    </Grid>
                                </Paper>
                            ))}
                        </Container>
                    )}
                </>
            )}
        </Nav>
    );
};

const mapStateToProps = (state: RootState) => ({
    contract: state.contractReducer.contract,
    user: state.userReducer,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Requestor);
