import React from "react";
import Nav from "../Components/Navigation/Nav";
import { Text, Badge, Group, Paper, Container, Title } from "@mantine/core";
import { IRootState } from "../store";
import { connect } from "react-redux";
import { InitialUserState } from "../store/reducers/user-reducer";

const Home: React.FC<{ user: InitialUserState }> = ({ user }) => {
    return (
        <Nav>
            <Container>
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
                                Verified
                            </Badge>
                        )}
                    </Group>

                    <Text color="dimmed" mb={0} size="sm">
                        Address:
                    </Text>
                    <Text mb={3}>{user?.address}</Text>
                    <Text color="dimmed" mb={0} size="sm">
                        Email:
                    </Text>
                    <Text mb={3}>{user?.email}</Text>
                    <Text color="dimmed" mb={0} size="sm">
                        Mobile:
                    </Text>
                    <Text mb={3}>{user?.mobile}</Text>
                </Paper>
            </Container>
        </Nav>
    );
};

const mapStateToProps = (state: IRootState) => {
    return {
        user: state.userReducer,
    };
};

export default connect(mapStateToProps)(Home);
