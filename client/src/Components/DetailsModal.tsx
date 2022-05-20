import { Center, Col, Divider, Grid, Group, Loader, Paper, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { handleRPCError } from "../utils/handleError";
import { toString } from "../utils/utils";
import DonerDetails from "./DonerDetails";
import HospitalDetails from "./HospitalDetails";

const DetailsModal: React.FC<{
    detailsModal: {
        active: boolean;
        selected: any;
    };
    contract: Contract;
    web3: Web3State;
}> = ({ detailsModal, contract, web3 }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [data, setData] = useState<
        (Doner & { registerHospital: Hospital; demiseHospital: Hospital }) | null
    >(null);
    useEffect(() => {
        (async () => {
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            try {
                let doner = await contract?.methods
                    .getDonerById(detailsModal.selected.donerId)
                    .call({ from: accounts[0] });
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
                setLoading(false);
            } catch (err: any) {
                setError(handleRPCError(err).message);
                setLoading(false);
            }
        })();
    }, [contract?.methods, detailsModal]);

    return (
        <>
            {loading && (
                <Center>
                    <Loader />
                </Center>
            )}
            {error && <Text color="orange">{error}</Text>}
            {data && (
                <>
                    <Paper withBorder p="md" mb="md">
                        <Group position="apart">
                            <Title order={4}>Doner Details</Title>
                        </Group>
                        <Divider my="sm" />
                        <DonerDetails doner={data} />
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
                </>
            )}
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    contract: state.contractReducer.contract,
    user: state.userReducer,
    web3: state.web3Reducer.web3,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsModal);
