import { Col, Space, Text, Grid } from "@mantine/core";
import React from "react";

interface props {
    hospital: Hospital;
}

const HospitalDetails: React.FC<props> = ({ hospital }) => {
    return (
        <Grid gutter={"md"}>
            <Col md={6}>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    Hospital Name:
                </Text>
                <Text mb={3}>{hospital.name}</Text>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    Hospital Type:
                </Text>
                <Text mb={3}>{hospital.hospital_type}</Text>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    Telephone Number:
                </Text>
                <Text mb={3}>{hospital.telephone}</Text>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    Mobile Number:
                </Text>
                <Text mb={3}>{hospital.mobile}</Text>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    Emergency Number:
                </Text>
                <Text mb={3}>{hospital.emergency_mobile}</Text>
                <Space h="xs" />
            </Col>
            <Col md={6}>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    Hospital Address:
                </Text>
                <Text mb={3}>{hospital.address_line}</Text>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    State:
                </Text>
                <Text mb={3}>{hospital.state}</Text>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    District:
                </Text>
                <Text mb={3}>{hospital.district}</Text>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    Town:
                </Text>
                <Text mb={3}>{hospital.town}</Text>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    Pincode:
                </Text>
                <Text mb={3}>{hospital.pincode}</Text>
                <Space h="xs" />
            </Col>
        </Grid>
    );
};

export default HospitalDetails;
