import React from "react";
import Nav from "../Components/Navigation/Nav";
import { Text, Badge, Group, Paper, Container, Title, Grid, Col, Alert } from "@mantine/core";
import { connect } from "react-redux";
import { AlertCircle } from "tabler-icons-react";

const Home: React.FC<{ user: UserState }> = ({ user }) => {
    return (
        <Nav>
            <Container>
                {!user?.verified && (
                    <Alert
                        icon={<AlertCircle size={16} />}
                        title="Bummer!"
                        color="red"
                        mb="md"
                        variant="outline"
                    >
                        Waiting for verification by the admin
                    </Alert>
                )}
                <Grid>
                    {user?.hospital && (
                        <Col md={6}>
                            <Paper withBorder p="md">
                                <Text color="dimmed" mb={0} size="sm">
                                    Hospital Name:
                                </Text>
                                <Text mb={3}>{user?.hospital.name}</Text>
                                <Text color="dimmed" mb={0} size="sm">
                                    Hospital Type:
                                </Text>
                                <Text mb={3}>{user?.hospital.hospital_type}</Text>
                                <Text color="dimmed" mb={0} size="sm">
                                    Hospital Registration Number:
                                </Text>
                                <Text mb={3}>{user?.hospital.registration_number}</Text>
                                <Text color="dimmed" mb={0} size="sm">
                                    Hospital Address:
                                </Text>
                                <Text mb={3}>{user?.hospital.address_line}</Text>
                                <Text color="dimmed" mb={0} size="sm">
                                    Hospital State:
                                </Text>
                                <Text mb={3}>{user?.hospital.state}</Text>
                                <Text color="dimmed" mb={0} size="sm">
                                    Hospital District:
                                </Text>
                                <Text mb={3}>{user?.hospital.district}</Text>
                                <Text color="dimmed" mb={0} size="sm">
                                    Hospital Town:
                                </Text>
                                <Text mb={3}>{user?.hospital.town}</Text>
                                <Text color="dimmed" mb={0} size="sm">
                                    Hospital Pincode:
                                </Text>
                                <Text mb={3}>{user?.hospital.pincode}</Text>
                                <Text color="dimmed" mb={0} size="sm">
                                    Hospital Longitude:
                                </Text>
                                <Text mb={3}>{user?.hospital.longitude}</Text>
                                <Text color="dimmed" mb={0} size="sm">
                                    Hospital Latitude:
                                </Text>
                                <Text mb={3}>{user?.hospital.latitude}</Text>
                                <Text color="dimmed" mb={0} size="sm">
                                    Hospital Telephone:
                                </Text>
                                <Text mb={3}>{user?.hospital.telephone}</Text>
                                <Text color="dimmed" mb={0} size="sm">
                                    Hospital Mobile:
                                </Text>
                                <Text mb={3}>{user?.hospital.mobile}</Text>
                                <Text color="dimmed" mb={0} size="sm">
                                    Hospital Emergency Mobile Number:
                                </Text>
                                <Text mb={3}>{user?.hospital.emergency_mobile}</Text>
                            </Paper>
                        </Col>
                    )}

                    <Col md={user?.hospital ? 6 : 12}>
                        <Paper withBorder p="md">
                            <Group position="apart">
                                <Title order={3} mb="xs">
                                    {user?.name} ({user?.role})
                                </Title>
                                {user?.verified && (
                                    <Badge color="green" variant="light">
                                        Verified
                                    </Badge>
                                )}
                                {!user?.verified && (
                                    <Badge color="red" variant="light">
                                        Unverified
                                    </Badge>
                                )}
                            </Group>

                            <Text color="dimmed" mb={0} size="sm">
                                Email:
                            </Text>
                            <Text mb={3}>{user?.email}</Text>
                            <Text color="dimmed" mb={0} size="sm">
                                Mobile:
                            </Text>
                            <Text mb={3}>{user?.mobile}</Text>
                        </Paper>
                    </Col>
                </Grid>
            </Container>
        </Nav>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        user: state.userReducer,
    };
};

export default connect(mapStateToProps)(Home);
