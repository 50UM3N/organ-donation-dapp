import { connect } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import Nav from "../Components/Navigation/Nav";
import {
    Button,
    Center,
    Container,
    Divider,
    Group,
    Loader,
    Paper,
    ScrollArea,
    Table,
    Text,
    Title,
} from "@mantine/core";
import { toString } from "../utils/utils";
import { handleRPCError } from "../utils/handleError";
import { saveAs } from "file-saver";

interface props {
    contract: Contract;
}

const Report: React.FC<props> = ({ contract }) => {
    const donatedOrgansRef = useRef(null);
    const donerOrgansAvailableRef = useRef(null);
    const requestorOrganAvailableRef = useRef(null);
    const doneesRef = useRef(null);
    const requestorsRef = useRef(null);

    const [donatedOrgans, setDonatedOrgans] = useState<any>(null);
    const [donerOrgansAvailable, setDonerOrgansAvailable] = useState<any>(null);
    const [requestorOrganAvailable, setRequestorOrganAvailable] = useState<any>(null);
    const [donees, setDonees] = useState<any>(null);
    const [requestors, setRequestors] = useState<any>(null);
    const [pending, setPending] = useState(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        (async () => {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_accounts",
                });

                let _organs = await contract?.methods.getOrgans().call({ from: accounts[0] });
                _organs = _organs.map((item: any) => ({
                    organ_name: toString(item.organ_name),
                    id: Number(item.id),
                    valid_time: Number(item.valid_time),
                }));
                let _doner = await contract?.methods?.getDoner().call({ from: accounts[0] });

                _doner = _doner.map((item: Doner) => ({
                    id: Number(item.id),
                    address_line: toString(item.address_line),
                    age: Number(item.age),
                    blood_group: toString(item.blood_group),
                    bmi: Number(item.bmi),
                    demise: item.demise,
                    demise_hospital_id: Number(item.demise_hospital_id),
                    district: toString(item.district),
                    dob: new Date(Number(toString(item.dob))).toLocaleDateString("en-US"),
                    email: toString(item.email),
                    fname: toString(item.fname),
                    gender: toString(item.gender),
                    height: Number(item.height),
                    lname: toString(item.lname),
                    mobile: item.mobile,
                    postal_code: toString(item.postal_code),
                    register_hospital_id: Number(item.register_hospital_id),
                    state: toString(item.state),
                    uidai: item.uidai,
                    weight: Number(item.weight),
                }));
                setDonees(_doner);
                let _requestor = await contract?.methods
                    ?.getRequestor(accounts[0])
                    .call({ from: accounts[0] });

                _requestor = _requestor.map((item: Requestor) => ({
                    id: Number(item.id),
                    address_line: toString(item.address_line),
                    age: Number(item.age),
                    blood_group: toString(item.blood_group),
                    bmi: Number(item.bmi),
                    district: toString(item.district),
                    dob: new Date(Number(toString(item.dob))).toLocaleDateString("en-US"),
                    email: toString(item.email),
                    fname: toString(item.fname),
                    gender: toString(item.gender),
                    height: Number(item.height),
                    lname: toString(item.lname),
                    mobile: item.mobile,
                    postal_code: toString(item.postal_code),
                    register_hospital_id: Number(item.register_hospital_id),
                    state: toString(item.state),
                    uidai: item.uidai,
                    weight: Number(item.weight),
                }));
                setRequestors(_requestor);
                let _hospital = await contract?.methods?.getHospitals().call({ from: accounts[0] });
                _hospital = _hospital.map((item: Hospital) => ({
                    id: Number(item.id),
                    name: toString(item.name),
                    hospital_type: toString(item.hospital_type),
                    registration_number: toString(item.registration_number),
                    address_line: toString(item.address_line),
                    state: toString(item.state),
                    district: toString(item.district),
                    town: toString(item.town),
                    pincode: Number(item.pincode),
                    longitude: toString(item.longitude),
                    latitude: toString(item.latitude),
                    telephone: toString(item.telephone),
                    mobile: toString(item.mobile),
                    emergency_mobile: toString(item.emergency_mobile),
                }));

                let _doner_organs = await contract?.methods?.getDonerOrgans().call({ from: accounts[0] });
                _doner_organs = _doner_organs.map((item: any) => ({
                    id: Number(item.id),
                    available: item.available,
                    doner_map_id: Number(item.doner_map_id),
                    organ_map_id: Number(item.organ_map_id),
                    organ: _organs.filter((it: any) => it.id === Number(item.organ_map_id))[0].organ_name,
                    time: Number(item.time),
                    blood_group: toString(item.blood_group),
                }));

                let _requestor_organs = await contract?.methods
                    ?.getRequestorOrgans()
                    .call({ from: accounts[0] });
                _requestor_organs = _requestor_organs.map((item: any) => ({
                    id: Number(item.id),
                    transplanted: item.transplanted,
                    requestor_map_id: Number(item.requestor_map_id),
                    organ_map_id: Number(item.organ_map_id),
                    organ: _organs.filter((it: any) => it.id === Number(item.organ_map_id))[0].organ_name,
                    blood_group: toString(item.blood_group),
                }));

                let _organ_requests = await contract?.methods
                    ?.getOrganRequestor()
                    .call({ from: accounts[0] });
                _organ_requests = _organ_requests.map((item: any) => ({
                    id: Number(item.id),
                    doner_map_id: Number(item.doner_map_id),
                    doner_organ_map_id: Number(item.doner_organ_map_id),
                    requestor_map_id: Number(item.requestor_map_id),
                    requestor_organ_map_id: Number(item.requestor_organ_map_id),
                }));

                // donated data
                const _all_donated_organs: any = [];
                _organ_requests.forEach((_organ_request: any) => {
                    const _data: any = {};

                    _data.doner = _doner.filter(
                        (_doner: Doner) => _doner.id === _organ_request.doner_map_id
                    )[0];

                    _data.requestor = _requestor.filter(
                        (_requestor: Requestor) => _requestor.id === _organ_request.requestor_map_id
                    )[0];

                    _data.doner_demise_hospital = _hospital.filter(
                        (_hospital: Hospital) => _hospital.id === _data.doner.demise_hospital_id
                    )[0];

                    _data.doner_register_hospital = _hospital.filter(
                        (_hospital: Hospital) => _hospital.id === _data.doner.register_hospital_id
                    )[0];

                    _data.requestor_register_hospital = _hospital.filter(
                        (_hospital: Hospital) => _hospital.id === _data.requestor.register_hospital_id
                    )[0];

                    _data.organ = _doner_organs.filter(
                        (item: any) => item.id === _organ_request.doner_organ_map_id
                    )[0];

                    _all_donated_organs.push(_data);
                });

                // organ available
                const _organs_available: any = [];
                _doner_organs
                    .filter((item: any) => item.available)
                    .forEach((_doner_organ: any) => {
                        const _data: any = {};

                        _data.organ = _doner_organ;
                        _data.doner = _doner.filter(
                            (_doner: Doner) => _doner.id === _doner_organ.doner_map_id
                        )[0];

                        _data.doner_register_hospital = _hospital.filter(
                            (_hospital: Hospital) => _hospital.id === _data.doner.register_hospital_id
                        )[0];

                        _organs_available.push(_data);
                    });

                // request available
                const _request_organs_available: any = [];
                _requestor_organs
                    .filter((item: any) => !item.transplanted)
                    .forEach((_requestor_organ: any) => {
                        const _data: any = {};

                        _data.organ = _requestor_organ;

                        _data.requestor = _requestor.filter(
                            (_requestor: Requestor) => _requestor.id === _requestor_organ.requestor_map_id
                        )[0];

                        _data.requestor_register_hospital = _hospital.filter(
                            (_hospital: Hospital) => _hospital.id === _data.requestor.register_hospital_id
                        )[0];

                        _request_organs_available.push(_data);
                    });

                setDonatedOrgans(_all_donated_organs);
                setDonerOrgansAvailable(_organs_available);
                setRequestorOrganAvailable(_request_organs_available);
                setPending(false);
            } catch (error) {
                setError(handleRPCError(error).message);
                setPending(false);
            }
        })();
    }, [contract]);

    const exportCSV = (fileName: string, ref: any) => {
        const csv = [];
        const rows = ref.current.querySelectorAll("tr");
        for (const row of rows.values()) {
            const cells = row.querySelectorAll("td, th");
            const rowText = Array.from(cells).map((cell: any) => cell?.innerText);
            csv.push(rowText.join(","));
        }
        const csvFile = new Blob([csv.join("\n")], { type: "text/csv;charset=utf-8;" });
        saveAs(csvFile, fileName + ".csv");
    };

    return (
        <Nav>
            <Container>
                {pending && (
                    <Center>
                        <Loader />
                    </Center>
                )}
                {error && <Text color="orange">{error}</Text>}
                {donerOrgansAvailable && (
                    <>
                        <Paper p="sm" withBorder my="xs">
                            <Group position="apart">
                                <Title order={4}>All organs that are donated</Title>

                                <Button
                                    onClick={() => exportCSV("organs_donated", donatedOrgansRef)}
                                    size="xs"
                                >
                                    Export excel
                                </Button>
                            </Group>
                            <Divider my="xs" />
                            <ScrollArea type="auto" style={{ width: "100%" }}>
                                <Table
                                    ref={donatedOrgansRef}
                                    mb="xl"
                                    sx={{
                                        ".top-header > th": {
                                            textAlign: "left",
                                        },
                                    }}
                                >
                                    <thead>
                                        <tr className="top-header">
                                            <th colSpan={1}></th>
                                            <th colSpan={1}></th>
                                            <th colSpan={17}>Donor</th>
                                            <th colSpan={14}>Donor Register Hospital</th>
                                            <th colSpan={14}>Donor Demise Hospital</th>
                                            <th colSpan={17}>Requestor</th>
                                            <th colSpan={14}>Requestor Hospital</th>
                                        </tr>
                                        <tr>
                                            <th>#</th>
                                            <th>Organ Name</th>

                                            <th>Id</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>DOB</th>
                                            <th>Mobile</th>
                                            <th>UIDAI</th>
                                            <th>Age</th>
                                            <th>Weight</th>
                                            <th>Height</th>
                                            <th>BMI</th>
                                            <th>Blood Group</th>
                                            <th>Gender</th>
                                            <th>Address Line</th>
                                            <th>State</th>
                                            <th>District</th>
                                            <th>Postal Code</th>

                                            <th>Hospital Id</th>
                                            <th>Hospital Name</th>
                                            <th>Hospital Type</th>
                                            <th>Registration Number</th>
                                            <th>Address Line</th>
                                            <th>State</th>
                                            <th>District</th>
                                            <th>Town</th>
                                            <th>Pin Code</th>
                                            <th>Telephone Number</th>
                                            <th>Mobile Number</th>
                                            <th>Emergency Mobile Number</th>
                                            <th>Longitude</th>
                                            <th>Latitude</th>

                                            <th>Hospital Id</th>
                                            <th>Hospital Name</th>
                                            <th>Hospital Type</th>
                                            <th>Registration Number</th>
                                            <th>Address Line</th>
                                            <th>State</th>
                                            <th>District</th>
                                            <th>Town</th>
                                            <th>Pin Code</th>
                                            <th>Telephone Number</th>
                                            <th>Mobile Number</th>
                                            <th>Emergency Mobile Number</th>
                                            <th>Longitude</th>
                                            <th>Latitude</th>

                                            <th>Id</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>DOB</th>
                                            <th>Mobile</th>
                                            <th>UIDAI</th>
                                            <th>Age</th>
                                            <th>Weight</th>
                                            <th>Height</th>
                                            <th>BMI</th>
                                            <th>Blood Group</th>
                                            <th>Gender</th>
                                            <th>Address Line</th>
                                            <th>State</th>
                                            <th>District</th>
                                            <th>Postal Code</th>

                                            <th>Hospital Id</th>
                                            <th>Hospital Name</th>
                                            <th>Hospital Type</th>
                                            <th>Registration Number</th>
                                            <th>Address Line</th>
                                            <th>State</th>
                                            <th>District</th>
                                            <th>Town</th>
                                            <th>Pin Code</th>
                                            <th>Telephone Number</th>
                                            <th>Mobile Number</th>
                                            <th>Emergency Mobile Number</th>
                                            <th>Longitude</th>
                                            <th>Latitude</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {donatedOrgans.map((item: any, index: number) => (
                                            <tr key={Math.random()}>
                                                <td>{index}</td>
                                                <td>{item.organ.organ}</td>

                                                <td>{item.doner.id}</td>
                                                <td>{item.doner.fname}</td>
                                                <td>{item.doner.lname}</td>
                                                <td>{item.doner.email}</td>
                                                <td>{item.doner.dob}</td>
                                                <td>{item.doner.mobile}</td>
                                                <td>{item.doner.uidai}</td>
                                                <td>{item.doner.age}</td>
                                                <td>{item.doner.weight}</td>
                                                <td>{item.doner.height}</td>
                                                <td>{item.doner.bmi}</td>
                                                <td>{item.doner.blood_group}</td>
                                                <td>{item.doner.gender}</td>
                                                <td>{item.doner.address_line}</td>
                                                <td>{item.doner.state}</td>
                                                <td>{item.doner.district}</td>
                                                <td>{item.doner.postal_code}</td>

                                                <td>{item.doner_register_hospital.id}</td>
                                                <td>{item.doner_register_hospital.name}</td>
                                                <td>{item.doner_register_hospital.hospital_type}</td>
                                                <td>{item.doner_register_hospital.registration_number}</td>
                                                <td>{item.doner_register_hospital.address_line}</td>
                                                <td>{item.doner_register_hospital.state}</td>
                                                <td>{item.doner_register_hospital.district}</td>
                                                <td>{item.doner_register_hospital.town}</td>
                                                <td>{item.doner_register_hospital.pincode}</td>
                                                <td>{item.doner_register_hospital.telephone}</td>
                                                <td>{item.doner_register_hospital.mobile}</td>
                                                <td>{item.doner_register_hospital.emergency_mobile}</td>
                                                <td>{item.doner_register_hospital.longitude}</td>
                                                <td>{item.doner_register_hospital.latitude}</td>

                                                <td>{item.doner_demise_hospital.id}</td>
                                                <td>{item.doner_demise_hospital.name}</td>
                                                <td>{item.doner_demise_hospital.hospital_type}</td>
                                                <td>{item.doner_demise_hospital.registration_number}</td>
                                                <td>{item.doner_demise_hospital.address_line}</td>
                                                <td>{item.doner_demise_hospital.state}</td>
                                                <td>{item.doner_demise_hospital.district}</td>
                                                <td>{item.doner_demise_hospital.town}</td>
                                                <td>{item.doner_demise_hospital.pincode}</td>
                                                <td>{item.doner_demise_hospital.telephone}</td>
                                                <td>{item.doner_demise_hospital.mobile}</td>
                                                <td>{item.doner_demise_hospital.emergency_mobile}</td>
                                                <td>{item.doner_demise_hospital.longitude}</td>
                                                <td>{item.doner_demise_hospital.latitude}</td>

                                                <td>{item.requestor.id}</td>
                                                <td>{item.requestor.fname}</td>
                                                <td>{item.requestor.lname}</td>
                                                <td>{item.requestor.email}</td>
                                                <td>{item.requestor.dob}</td>
                                                <td>{item.requestor.mobile}</td>
                                                <td>{item.requestor.uidai}</td>
                                                <td>{item.requestor.age}</td>
                                                <td>{item.requestor.weight}</td>
                                                <td>{item.requestor.height}</td>
                                                <td>{item.requestor.bmi}</td>
                                                <td>{item.requestor.blood_group}</td>
                                                <td>{item.requestor.gender}</td>
                                                <td>{item.requestor.address_line}</td>
                                                <td>{item.requestor.state}</td>
                                                <td>{item.requestor.district}</td>
                                                <td>{item.requestor.postal_code}</td>

                                                <td>{item.requestor_register_hospital.id}</td>
                                                <td>{item.requestor_register_hospital.name}</td>
                                                <td>{item.requestor_register_hospital.hospital_type}</td>
                                                <td>
                                                    {item.requestor_register_hospital.registration_number}
                                                </td>
                                                <td>{item.requestor_register_hospital.address_line}</td>
                                                <td>{item.requestor_register_hospital.state}</td>
                                                <td>{item.requestor_register_hospital.district}</td>
                                                <td>{item.requestor_register_hospital.town}</td>
                                                <td>{item.requestor_register_hospital.pincode}</td>
                                                <td>{item.requestor_register_hospital.telephone}</td>
                                                <td>{item.requestor_register_hospital.mobile}</td>
                                                <td>{item.requestor_register_hospital.emergency_mobile}</td>
                                                <td>{item.requestor_register_hospital.longitude}</td>
                                                <td>{item.requestor_register_hospital.latitude}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </ScrollArea>
                        </Paper>
                    </>
                )}
                {donerOrgansAvailable && (
                    <>
                        <Paper p="sm" withBorder my="xs">
                            <Group position="apart">
                                <Title order={4}>All organs that are available</Title>

                                <Button
                                    onClick={() => exportCSV("organs_available", donerOrgansAvailableRef)}
                                    size="xs"
                                >
                                    Export CSV
                                </Button>
                            </Group>

                            <Divider my="xs" />
                            <ScrollArea type="auto" style={{ width: "100%" }}>
                                <Table ref={donerOrgansAvailableRef} mb="xl">
                                    <thead>
                                        <tr className="top-header">
                                            <th colSpan={1}></th>
                                            <th colSpan={1}></th>
                                            <th colSpan={17}>Donor </th>
                                            <th colSpan={14}>Donor Register Hospital</th>
                                        </tr>
                                        <tr>
                                            <th>#</th>
                                            <th>Organ Name</th>

                                            <th> ID</th>
                                            <th> First Name</th>
                                            <th> Last Name</th>
                                            <th> Email</th>
                                            <th>Date of Birth</th>
                                            <th> Mobile</th>
                                            <th> uidai</th>
                                            <th> age</th>
                                            <th> weight</th>
                                            <th> height</th>
                                            <th> bmi</th>
                                            <th> Blood Group</th>
                                            <th> Gender</th>
                                            <th> address_line</th>
                                            <th> state</th>
                                            <th> district</th>
                                            <th> postal_code</th>

                                            <th> Hospital ID</th>
                                            <th> Hospital Name</th>
                                            <th> Hospital hospital_type</th>
                                            <th> Hospital registration_number</th>
                                            <th> Hospital Address</th>
                                            <th> Hospital State</th>
                                            <th> Hospital District</th>
                                            <th> Hospital Town</th>
                                            <th> Hospital pincode</th>
                                            <th> Hospital TelePhone No.</th>
                                            <th> Hospital Mobile No.</th>
                                            <th> Hospital Emergency No.</th>
                                            <th> Hospital Latitude</th>
                                            <th> Hospital Longitude</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {donerOrgansAvailable.map((item: any, index: number) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.organ.organ}</td>

                                                <td>{item.doner.id}</td>
                                                <td>{item.doner.fname}</td>
                                                <td>{item.doner.lname}</td>
                                                <td>{item.doner.email}</td>
                                                <td>{item.doner.dob}</td>
                                                <td>{item.doner.mobile}</td>
                                                <td>{item.doner.uidai}</td>
                                                <td>{item.doner.age}</td>
                                                <td>{item.doner.weight}</td>
                                                <td>{item.doner.height}</td>
                                                <td>{item.doner.bmi}</td>
                                                <td>{item.doner.blood_group}</td>
                                                <td>{item.doner.gender}</td>
                                                <td>{item.doner.address_line}</td>
                                                <td>{item.doner.state}</td>
                                                <td>{item.doner.district}</td>
                                                <td>{item.doner.postal_code}</td>

                                                <td>{item.doner_register_hospital.id}</td>
                                                <td>{item.doner_register_hospital.name}</td>
                                                <td>{item.doner_register_hospital.hospital_type}</td>
                                                <td>{item.doner_register_hospital.registration_number}</td>
                                                <td>{item.doner_register_hospital.address_line}</td>
                                                <td>{item.doner_register_hospital.state}</td>
                                                <td>{item.doner_register_hospital.district}</td>
                                                <td>{item.doner_register_hospital.town}</td>
                                                <td>{item.doner_register_hospital.pincode}</td>
                                                <td>{item.doner_register_hospital.telephone}</td>
                                                <td>{item.doner_register_hospital.mobile}</td>
                                                <td>{item.doner_register_hospital.emergency_mobile}</td>
                                                <td>{item.doner_register_hospital.longitude}</td>
                                                <td>{item.doner_register_hospital.latitude}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </ScrollArea>
                        </Paper>
                    </>
                )}
                {requestorOrganAvailable && (
                    <>
                        <Paper p="sm" withBorder my="xs">
                            <Group position="apart">
                                <Title order={4}>All requested organs</Title>

                                <Button
                                    onClick={() => exportCSV("requested_organs", requestorOrganAvailableRef)}
                                    size="xs"
                                >
                                    Export CSV
                                </Button>
                            </Group>
                            <Divider my="xs" />
                            <ScrollArea type="auto" style={{ width: "100%" }}>
                                <Table
                                    ref={requestorOrganAvailableRef}
                                    mb="xl"
                                    sx={{
                                        ".top-header > th": {
                                            textAlign: "left",
                                        },
                                    }}
                                >
                                    <thead>
                                        <tr className="top-header">
                                            <th colSpan={1}></th>
                                            <th colSpan={1}></th>
                                            <th colSpan={17}>Requestor </th>
                                            <th colSpan={14}>Requestor Register Hospital</th>
                                        </tr>
                                        <tr>
                                            <th>#</th>
                                            <th>Organ Name</th>

                                            <th>Id</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>DOB</th>
                                            <th>Mobile</th>
                                            <th>UIDAI</th>
                                            <th>Age</th>
                                            <th>Weight</th>
                                            <th>Height</th>
                                            <th>BMI</th>
                                            <th>Blood Group</th>
                                            <th>Gender</th>
                                            <th>Address Line</th>
                                            <th>State</th>
                                            <th>District</th>
                                            <th>Postal Code</th>

                                            <th>Hospital Id</th>
                                            <th>Hospital Name</th>
                                            <th>Hospital Type</th>
                                            <th>Registration Number</th>
                                            <th>Address Line</th>
                                            <th>State</th>
                                            <th>District</th>
                                            <th>Town</th>
                                            <th>Pin Code</th>
                                            <th>Telephone Number</th>
                                            <th>Mobile Number</th>
                                            <th>Emergency Mobile Number</th>
                                            <th>Longitude</th>
                                            <th>Latitude</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requestorOrganAvailable.map((item: any, index: number) => (
                                            <tr key={Math.random()}>
                                                <td>{index}</td>
                                                <td>{item.organ.organ}</td>

                                                <td>{item.requestor.id}</td>
                                                <td>{item.requestor.fname}</td>
                                                <td>{item.requestor.lname}</td>
                                                <td>{item.requestor.email}</td>
                                                <td>{item.requestor.dob}</td>
                                                <td>{item.requestor.mobile}</td>
                                                <td>{item.requestor.uidai}</td>
                                                <td>{item.requestor.age}</td>
                                                <td>{item.requestor.weight}</td>
                                                <td>{item.requestor.height}</td>
                                                <td>{item.requestor.bmi}</td>
                                                <td>{item.requestor.blood_group}</td>
                                                <td>{item.requestor.gender}</td>
                                                <td>{item.requestor.address_line}</td>
                                                <td>{item.requestor.state}</td>
                                                <td>{item.requestor.district}</td>
                                                <td>{item.requestor.postal_code}</td>

                                                <td>{item.requestor_register_hospital.id}</td>
                                                <td>{item.requestor_register_hospital.name}</td>
                                                <td>{item.requestor_register_hospital.hospital_type}</td>
                                                <td>
                                                    {item.requestor_register_hospital.registration_number}
                                                </td>
                                                <td>{item.requestor_register_hospital.address_line}</td>
                                                <td>{item.requestor_register_hospital.state}</td>
                                                <td>{item.requestor_register_hospital.district}</td>
                                                <td>{item.requestor_register_hospital.town}</td>
                                                <td>{item.requestor_register_hospital.pincode}</td>
                                                <td>{item.requestor_register_hospital.telephone}</td>
                                                <td>{item.requestor_register_hospital.mobile}</td>
                                                <td>{item.requestor_register_hospital.emergency_mobile}</td>
                                                <td>{item.requestor_register_hospital.longitude}</td>
                                                <td>{item.requestor_register_hospital.latitude}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </ScrollArea>
                        </Paper>
                    </>
                )}
                {donees && (
                    <>
                        <Paper p="sm" withBorder my="xs">
                            <Group position="apart">
                                <Title order={4}>All donors that are registered</Title>

                                <Button onClick={() => exportCSV("donors", doneesRef)} size="xs">
                                    Export CSV
                                </Button>
                            </Group>
                            <Divider my="xs" />
                            <ScrollArea type="auto" style={{ width: "100%" }}>
                                <Table
                                    ref={doneesRef}
                                    mb="xl"
                                    sx={{
                                        ".top-header > th": {
                                            textAlign: "left",
                                        },
                                    }}
                                >
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>DOB</th>
                                            <th>Mobile</th>
                                            <th>UIDAI</th>
                                            <th>Age</th>
                                            <th>Weight</th>
                                            <th>Height</th>
                                            <th>BMI</th>
                                            <th>Blood Group</th>
                                            <th>Gender</th>
                                            <th>Address Line</th>
                                            <th>State</th>
                                            <th>District</th>
                                            <th>Postal Code</th>
                                            <th>Demise</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {donees.map((item: any, index: number) => (
                                            <tr key={Math.random()}>
                                                <td>{item.id}</td>
                                                <td>{item.fname}</td>
                                                <td>{item.lname}</td>
                                                <td>{item.email}</td>
                                                <td>{item.dob}</td>
                                                <td>{item.mobile}</td>
                                                <td>{item.uidai}</td>
                                                <td>{item.age}</td>
                                                <td>{item.weight}</td>
                                                <td>{item.height}</td>
                                                <td>{item.bmi}</td>
                                                <td>{item.blood_group}</td>
                                                <td>{item.gender}</td>
                                                <td>{item.address_line}</td>
                                                <td>{item.state}</td>
                                                <td>{item.district}</td>
                                                <td>{item.postal_code}</td>
                                                <td>{item.demise ? "Yes" : "No"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </ScrollArea>
                        </Paper>
                    </>
                )}
                {requestors && (
                    <>
                        <Paper p="sm" withBorder my="xs">
                            <Group position="apart">
                                <Title order={4}>All Requestors that are registered</Title>

                                <Button onClick={() => exportCSV("requestors", requestorsRef)} size="xs">
                                    Export CSV
                                </Button>
                            </Group>
                            <Divider my="xs" />
                            <ScrollArea type="auto" style={{ width: "100%" }}>
                                <Table
                                    ref={requestorsRef}
                                    mb="xl"
                                    sx={{
                                        ".top-header > th": {
                                            textAlign: "left",
                                        },
                                    }}
                                >
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>DOB</th>
                                            <th>Mobile</th>
                                            <th>UIDAI</th>
                                            <th>Age</th>
                                            <th>Weight</th>
                                            <th>Height</th>
                                            <th>BMI</th>
                                            <th>Blood Group</th>
                                            <th>Gender</th>
                                            <th>Address Line</th>
                                            <th>State</th>
                                            <th>District</th>
                                            <th>Postal Code</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requestors.map((item: any, index: number) => (
                                            <tr key={Math.random()}>
                                                <td>{item.id}</td>
                                                <td>{item.fname}</td>
                                                <td>{item.lname}</td>
                                                <td>{item.email}</td>
                                                <td>{item.dob}</td>
                                                <td>{item.mobile}</td>
                                                <td>{item.uidai}</td>
                                                <td>{item.age}</td>
                                                <td>{item.weight}</td>
                                                <td>{item.height}</td>
                                                <td>{item.bmi}</td>
                                                <td>{item.blood_group}</td>
                                                <td>{item.gender}</td>
                                                <td>{item.address_line}</td>
                                                <td>{item.state}</td>
                                                <td>{item.district}</td>
                                                <td>{item.postal_code}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </ScrollArea>
                        </Paper>
                    </>
                )}
            </Container>
        </Nav>
    );
};

const mapStateToProps = (state: RootState) => ({ contract: state.contractReducer.contract });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
