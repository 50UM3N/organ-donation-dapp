import { Col, Grid, Space, Text } from "@mantine/core";
import React from "react";

interface props {
    doner: Doner;
}

const DonerDetails: React.FC<props> = ({ doner }) => {
    return (
        <Grid gutter={"md"}>
            <Col md={6}>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    First Name:
                </Text>
                <Text mb={3}>{doner.fname}</Text>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    Last Name:
                </Text>
                <Text mb={3}>{doner.lname}</Text>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    Email:
                </Text>
                <Text mb={3}>{doner.email}</Text>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    Date of Birth:
                </Text>
                <Text mb={3}>{new Date(parseInt(doner.dob)).toLocaleDateString("en-US")}</Text>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    Age:
                </Text>
                <Text mb={3}>{doner.age}</Text>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    Mobile Number:
                </Text>
                <Text mb={3}>{"+91-" + doner.mobile}</Text>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    Weight (in kg):
                </Text>
                <Text mb={3}>{doner.weight}</Text>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    Height:
                </Text>
                <Text mb={3}>{doner.height}</Text>
                <Space h="xs" />
            </Col>
            <Col md={6}>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    Body Mass Index:
                </Text>
                <Text mb={3}>{doner.bmi}</Text>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    Blood Group:
                </Text>
                <Text mb={3}>{doner.blood_group}</Text>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    Gender:
                </Text>
                <Text mb={3}>{doner.gender}</Text>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    Address:
                </Text>
                <Text mb={3}>{doner.address_line}</Text>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    District:
                </Text>
                <Text mb={3}>{doner.district}</Text>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    Postal Code:
                </Text>
                <Text mb={3}>{doner.postal_code}</Text>
                <Space h="xs" />
                <Text color="dimmed" mb={0} size="sm">
                    State:
                </Text>
                <Text mb={3}>{doner.state}</Text>
            </Col>
        </Grid>
    );
};

export default DonerDetails;
