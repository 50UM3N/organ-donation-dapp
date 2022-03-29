import {
    Text,
    Paper,
    Group,
    Divider,
    Container,
    useMantineTheme,
    Grid,
    Button,
} from "@mantine/core";
import { CurrencyEthereum } from "tabler-icons-react";
import { ReactComponent as WalletIllo } from "../../Assets/wallet-illo.svg";
const Login = () => {
    const theme = useMantineTheme();
    return (
        <Container size={"md"} py="lg">
            <Paper radius="md" p="xl" withBorder>
                <Grid>
                    <Grid.Col md={5}>
                        <WalletIllo style={{ width: "100%" }} />
                    </Grid.Col>
                    <Grid.Col md={7}>
                        <Text size="lg" weight={500}>
                            Connect with metamask
                        </Text>
                        <Text color={theme.colors.gray[6]}>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit.
                        </Text>

                        <Group grow mb="md" mt="md"></Group>

                        <Divider
                            label="Or continue with email"
                            labelPosition="center"
                            my="lg"
                        />
                        <Button
                            leftIcon={<CurrencyEthereum />}
                            size="xl"
                            style={{ width: "100%" }}
                        >
                            Connect with Metamask
                        </Button>
                    </Grid.Col>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Login;
