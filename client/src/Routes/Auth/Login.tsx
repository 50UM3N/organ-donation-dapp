import React from "react";
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
import WalletIllo from "../../Assets/wallet-illo.svg?component";
import eVotingArtifact from "../../artifact/DonationContract.json";
import { setWeb3 } from "../../store/thunk/setWeb3";
import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";

import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { AbiItem } from "web3-utils";
import { InitialThemeState } from "../../store/reducers/theme-reducer";
import { toggleTheme } from "../../store/actions";
import { ThemeActionType } from "../../store/actions/theme-action";

interface props {
    web3: Web3State;
    setWeb3: () => void;
    color: InitialThemeState;
    setTheme: (theme: "dark" | "light") => {
        type: ThemeActionType;
        payload: "dark" | "light";
    };
}

const Login: React.FC<props> = ({ setWeb3, web3, color, setTheme }) => {
    const theme = useMantineTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const handleLogin = () => {
        setWeb3();
    };
    useEffect(() => {
        (() => {
            // @ts-ignore
            const { from } = location.state || {
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
                            Connect your Ethereum wallet to <b>Balance Manager</b>
                        </Text>
                        <Space h="md" />
                        <Text color={theme.colors.gray[6]}>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
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
                            <Text color={theme.colors.gray[6]}>Chrome, Firefox, Safari, Edge, Brave</Text>
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
const mapStateToProps = (state: RootState) => {
    return {
        web3: state.web3Reducer,
        color: state.themeReducer,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, AnyAction>) => {
    return {
        setWeb3: () =>
            dispatch(setWeb3(eVotingArtifact.abi as AbiItem[], eVotingArtifact.networks[5777].address)),

        setTheme: (theme: "dark" | "light") => dispatch(toggleTheme(theme)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
