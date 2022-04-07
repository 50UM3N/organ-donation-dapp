import Nav from "../Components/Navigation/Nav";
import {
    Card,
    Text,
    Badge,
    Button,
    Group,
    useMantineTheme,
} from "@mantine/core";

const Home = () => {
    const theme = useMantineTheme();

    const secondaryColor =
        theme.colorScheme === "dark"
            ? theme.colors.dark[1]
            : theme.colors.gray[7];

    return (
        <Nav>
            <div style={{ width: 1000, margin: "auto" }}>
                <Card shadow="sm" p="lg">
                    <Group
                        position="apart"
                        style={{
                            marginBottom: 5,
                            marginTop: theme.spacing.sm,
                        }}
                    >
                        <Text weight={500}>USER NAME (user)</Text>
                        <Badge color="pink" variant="light">
                            Not-Verified
                        </Badge>
                    </Group>

                    <Text
                        size="sm"
                        style={{ color: secondaryColor, lineHeight: 1.5 }}
                    >
                        Phone No.: 9876543210
                    </Text>
                    <Text
                        size="sm"
                        style={{ color: secondaryColor, lineHeight: 1.5 }}
                    >
                        Email : soumen@gmail.com
                    </Text>
                    <Text
                        size="sm"
                        style={{ color: secondaryColor, lineHeight: 1.5 }}
                    >
                        Address : 123 Road, kol-21
                    </Text>

                    <Button
                        variant="light"
                        color="blue"
                        fullWidth
                        style={{ marginTop: 14 }}
                    >
                        Organ
                    </Button>
                </Card>
            </div>
        </Nav>
    );
};

export default Home;
