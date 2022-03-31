import {
    Text,
    Paper,
    Group,
    Center,
    Anchor,
    Space,
    Container,
    useMantineTheme,
    Grid,
    Button,
} from "@mantine/core";
import { CurrencyEthereum } from "tabler-icons-react";
import { ReactComponent as WalletIllo } from "../../Assets/wallet-illo.svg";
import eVotingArtifact from "../../artifact/DonationContract.json";
import { setWeb3 } from "../../store/thunk/setWeb3";
import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";
const Login = ({ setWeb3, web3 }) => {
    const theme = useMantineTheme();
    let location = useLocation();
    let navigate = useNavigate();
    const handleLogin = () => {
        setWeb3();
    };
    useEffect(() => {
        (() => {
            let { from } = location.state || {
                from: { pathname: "/" },
            };
            if (web3.loading === false && web3.web3 !== null) {
                navigate(from.pathname);
            }
        })();
    }, [web3, location, navigate]);
    return (
        <Container size={"md"} py="lg">
            <Paper radius="md" p="xl" withBorder>
                <Grid>
                    <Grid.Col md={5}>
                        <WalletIllo style={{ width: "100%" }} />
                    </Grid.Col>
                    <Grid.Col md={7}>
                        <Space h="md" />
                        <Text size="xl" weight={400}>
                            Connect your Ethereum wallet to{" "}
                            <b>Balance Manager</b>
                        </Text>
                        <Space h="md" />
                        <Text color={theme.colors.gray[6]}>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit.
                        </Text>

                        <Group grow mb="md" mt="md"></Group>

                        <Button
                            leftIcon={<CurrencyEthereum />}
                            size="xl"
                            style={{ width: "100%" }}
                            loading={web3.loading}
                            onClick={handleLogin}
                        >
                            Connect with Metamask
                        </Button>
                        <Space h="md" />
                        <Center>
                            <Text color={theme.colors.gray[6]}>
                                Chrome, Firefox, Safari, Edge, Brave
                            </Text>
                        </Center>
                        <Space h="md" />
                        <Center>
                            <Text color={theme.colors.gray[6]}>
                                Confused by these options?{" "}
                                <Anchor component={Link} to="/learn-more">
                                    Learn More
                                </Anchor>
                            </Text>
                        </Center>
                    </Grid.Col>
                </Grid>
            </Paper>
        </Container>
    );
};
const mapStateToProps = (state) => {
    return {
        web3: state.web3Reducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setWeb3: () =>
            dispatch(
                setWeb3(
                    eVotingArtifact.abi,
                    eVotingArtifact.networks[5777].address
                )
            ),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
