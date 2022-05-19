import { connect } from "react-redux";
import React, { useEffect, useState } from "react";

import Nav from "../Components/Navigation/Nav";
import {
    Button,
    Center,
    Col,
    Container,
    Divider,
    Grid,
    Group,
    Loader,
    Paper,
    Text,
    Title,
    Table,
} from "@mantine/core";
import { handleRPCError } from "../utils/handleError";
import { useParams } from "react-router-dom";
import DonerOrganRegistration from "../Components/DonerOrganRegistration";
import { toString } from "../utils/utils";
import HospitalDetails from "../Components/HospitalDetails";
import DonerDetails from "../Components/DonerDetails";

interface props {
    contract: Contract;
}

const Doner: React.FC<props> = ({ contract }) => {
    const { donerId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [data, setData] = useState<
        (Doner & { registerHospital: Hospital; demiseHospital: Hospital }) | null
    >(null);
    const [organs, setOrgans] = useState<any>(null);
    const [donerOrgans, setDonerOrgans] = useState<Array<DonerOrgans> | null>(null);
    useEffect(() => {
        (async () => {
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            try {
                let doner = await contract?.methods.getDonerById(donerId).call({ from: accounts[0] });
                const _organs = await contract?.methods.getOrgans().call({ from: accounts[0] });

                const _donatedOrgans = await contract?.methods
                    .getDonerOrgans(Number(doner._doner.id))
                    .call({ from: accounts[0] });
                // console.log(toString(_organs[0].organ_name));
                setOrgans([
                    ..._organs.map((item: any) => ({
                        organ_name: toString(item.organ_name),
                        id: Number(item.id),
                        valid_time: Number(item.valid_time),
                    })),
                ]);
                if (doner.length === 0) throw new Error("There is no doner available!");
                let register_hospital = doner._request_hospital;
                let demise_hospital = doner._demise_hospital;
                register_hospital = { ...register_hospital };
                register_hospital.name = toString(register_hospital.name);
                register_hospital.address_line = toString(register_hospital.address_line);
                register_hospital.district = toString(register_hospital.district);
                register_hospital.emergency_mobile = toString(register_hospital.emergency_mobile);
                register_hospital.hospital_type = toString(register_hospital.hospital_type);
                register_hospital.mobile = toString(register_hospital.mobile);
                register_hospital.registration_number = toString(register_hospital.registration_number);
                register_hospital.state = toString(register_hospital.state);
                register_hospital.telephone = toString(register_hospital.telephone);
                register_hospital.town = toString(register_hospital.town);

                demise_hospital = { ...demise_hospital };
                demise_hospital.name = toString(demise_hospital.name);
                demise_hospital.address_line = toString(demise_hospital.address_line);
                demise_hospital.district = toString(demise_hospital.district);
                demise_hospital.emergency_mobile = toString(demise_hospital.emergency_mobile);
                demise_hospital.hospital_type = toString(demise_hospital.hospital_type);
                demise_hospital.mobile = toString(demise_hospital.mobile);
                demise_hospital.registration_number = toString(demise_hospital.registration_number);
                demise_hospital.state = toString(demise_hospital.state);
                demise_hospital.telephone = toString(demise_hospital.telephone);
                demise_hospital.town = toString(demise_hospital.town);

                doner = { ...doner._doner };
                doner.fname = toString(doner.fname);
                doner.lname = toString(doner.lname);
                doner.email = toString(doner.email);
                doner.blood_group = toString(doner.blood_group);
                doner.gender = toString(doner.gender);
                doner.state = toString(doner.state);
                doner.district = toString(doner.district);
                doner.address_line = toString(doner.address_line);
                doner.postal_code = toString(doner.postal_code);
                doner.registerHospital = register_hospital;
                doner.demiseHospital = demise_hospital;

                setData({ ...doner, id: Number(doner.id) });
                setDonerOrgans([
                    ..._donatedOrgans.map((item: any) => ({
                        id: Number(item.id),
                        available: item.available,
                        blood_group: toString(item.blood_group),
                        doner_map_id: Number(item.doner_map_id),
                        organ_map_id: Number(item.organ_map_id),
                        time: Number(item.time),
                        organ: toString(_organs[Number(item.organ_map_id) - 1]["organ_name"]),
                    })),
                ]);
                setLoading(false);
            } catch (err: any) {
                console.log(err);
                setError(handleRPCError(err).message);
                setLoading(false);
            }
        })();
    }, [contract?.methods, donerId]);
    const donerDemise = async (id: number) => {
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        try {
            const res = await contract?.methods.donerDemise(id).send({ from: accounts[0] });
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
                    <Container my="md">
                        <Paper withBorder p="md" mb="md">
                            <Group position="apart">
                                <Title order={4}>Doner Details</Title>
                                {data.demise?(<Text align="right" weight={500} color="red">This doner has passed</Text>):(<Button
                                    size="xs"
                                    variant="light"
                                    color="red"
                                    onClick={() => donerDemise(data.id)}
                                >
                                    Dead
                                </Button>)}
                            </Group>
                            <Divider my="sm" />
                            <DonerDetails doner={data} />
                            <DonerOrganRegistration donerId={data.id} organs={organs} doner={data} />
                        </Paper>

                        <Grid gutter="md">
                            <Col md={!data.demise ? 12 : 6}>
                                <Paper withBorder p="md">
                                    <Title order={4}>Doner Register Hospital Details</Title>

                                    <Divider my="sm" />
                                    <HospitalDetails hospital={data.registerHospital} />
                                </Paper>
                            </Col>
                            {data.demise && (
                                <Col md={6}>
                                    <Paper withBorder p="md">
                                        <Title order={4}>Doner Demise Hospital Details</Title>

                                        <Divider my="sm" />
                                        <HospitalDetails hospital={data.demiseHospital} />
                                    </Paper>
                                </Col>
                            )}
                        </Grid>
                    </Container>
                    {donerOrgans && (
                        <Container my="md">
                            <Paper withBorder p="md">
                                <Group position="apart">
                                    <Title order={4}>Pledged Organs</Title>
                                </Group>
                                <Divider my="sm" />
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Available</th>
                                            <th>Blood Group</th>
                                            <th>Doner ID</th>
                                            <th>Organ ID</th>
                                            <th>Organ Name</th>
                                            <th>Time(Hr)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {donerOrgans.map((organ) => (
                                            <tr key={organ.id}>
                                                <td>{organ.id}</td>
                                                <td>{organ.available ? "Yes" : "No"}</td>
                                                <td>{organ.blood_group}</td>
                                                <td>{organ.doner_map_id}</td>
                                                <td>{organ.organ_map_id}</td>
                                                <td>{organ.organ}</td>
                                                <td>{organ.time}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doner);
