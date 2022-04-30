import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { IRootState } from "../store";
import { Contract } from "web3-eth-contract";
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
    Space,
    Text,
    Title,
    Table,
} from "@mantine/core";
import { handleRPCError } from "../utils/handleError";
import { useParams } from "react-router-dom";
import DonerOrganRegistration from "../Components/DonerOrganRegistration";

interface props {
    contract: Contract | null;
}
type TypeData = null | {
    id: number;
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
};

const Doner: React.FC<props> = ({ contract }) => {
    const { donerId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [data, setData] = useState<TypeData>(null);
    const [organs, setOrgans] = useState<any>(null);
    const [donerOrgans, setDonerOrgans] = useState<Array<DonerOrgans> | null>(null);
    useEffect(() => {
        (async () => {
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            try {
                const doner = await contract?.methods.getDonerById(donerId).call({ from: accounts[0] });
                const _organs = await contract?.methods.getOrgans().call({ from: accounts[0] });
                const _donatedOrgans = await contract?.methods
                    .getDonerOrgans(Number(doner.id))
                    .call({ from: accounts[0] });
                setOrgans([
                    ..._organs.map((item: any) => ({
                        organ_name: item.organ_name,
                        id: Number(item.id),
                        valid_time: Number(item.valid_time),
                    })),
                ]);
                if (doner.length === 0) throw new Error("There is no doner available!");
                setData({ ...doner, id: Number(doner.id) });
                setDonerOrgans([
                    ..._donatedOrgans.map((item: any) => ({
                        id: Number(item.id),
                        available: item.available,
                        blood_group: item.blood_group,
                        doner_map_id: Number(item.doner_map_id),
                        organ_map_id: Number(item.organ_map_id),
                        time: Number(item.time),
                        organ: _organs[Number(item.organ_map_id) - 1]["organ_name"],
                    })),
                ]);
                setLoading(false);
            } catch (err: any) {
                setError(handleRPCError(err).message);
                setLoading(false);
            }
        })();
    }, [contract?.methods, donerId]);
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
                        <Paper withBorder p="md">
                            <Group position="apart">
                                <Title order={4}>Doner Details</Title>
                                <Button size="xs" variant="light" color="red">
                                    Dead
                                </Button>
                            </Group>
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
                            <DonerOrganRegistration donerId={data.id} organs={organs} doner={data} />
                        </Paper>
                    </Container>
                    {donerOrgans && (
                        <Container my="md">
                            <Paper withBorder p="md">
                                <Group position="apart">
                                    <Title order={4}>All Organs donated by the user</Title>
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

const mapStateToProps = (state: IRootState) => ({
    contract: state.contractReducer.contract,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Doner);
