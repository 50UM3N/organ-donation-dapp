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
import eVotingArtifact from "../../artifact/DonationContract.json";
import { setWeb3 } from "../../store/thunk/setWeb3";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
                            loading={web3.loading}
                            onClick={handleLogin}
                        >
                            Connect with Metamask
                        </Button>
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
