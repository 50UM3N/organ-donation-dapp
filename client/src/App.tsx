import React, { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import { Button, Container, MantineProvider, Text } from "@mantine/core";
import RegisterDoner from "./Routes/Register/RegisterDonner";
import Login from "./Routes/Auth/Login";
import AuthProvider from "./Provider/AuthProvider";
import { connect } from "react-redux";
import Register from "./Routes/Auth/Register";
import { NotificationsProvider } from "@mantine/notifications";

import { InitialThemeState } from "./store/reducers/theme-reducer";
import RegisterRequestor from "./Routes/Register/RegisterRequestor";
import JoinRequest from "./Routes/JoinRequest";
import Donors from "./Routes/Donors";
import Doner from "./Routes/Doner";
import Requestors from "./Routes/Requestors";
import Requestor from "./Routes/Requestor";

interface props {
    colorScheme: InitialThemeState;
    contract: Contract;
    user: UserState;
}

const App: React.FC<props> = ({ colorScheme, contract, user }) => {
    const [notificationGranted, setNotificationGranted] = useState(
        window.Notification && Notification.permission === "granted"
    );

    const handleNotificationPermission = useCallback(() => {
        // notification system
        if (window.Notification && Notification.permission !== "denied") {
            Notification.requestPermission((status: string) => {
                if (status === "granted") {
                    setNotificationGranted(true);
                } else {
                    setNotificationGranted(false);
                }
            });
        }
    }, []);

    useEffect(() => {
        handleNotificationPermission();
        let a: any;
        if (contract) {
            a = contract?.events.UserVerified({
                filter: {
                    value: ["1000", "1337"],
                },
                fromBlock: "latest",
                toBlock: "latest",
            });

            a.on("data", (event: any) => {
                if (event.returnValues._address === user?.id) {
                    const notification = new Notification(
                        "You are approved just now click me! or refresh the page"
                    );
                    notification.onclick = (event) => {
                        event.preventDefault();
                        window.open(window.location.host, "_blank");
                    };
                    window.location.reload();
                }
            });
            a.on("error", (err: any) => console.error("error " + err));
            a.on("connected", (str: any) => console.debug("event connected (UserVerified): " + str));
        }
        return () => {
            if (a) {
                a.unsubscribe((a: any) => {
                    console.log(a);
                });
            }
        };
    }, [contract, handleNotificationPermission, user?.id]);
    console.log(user);
    return (
        <MantineProvider theme={{ colorScheme }}>
            <NotificationsProvider>
                {notificationGranted && (
                    <Routes>
                        <Route element={<AuthProvider />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/register-doner" element={<RegisterDoner />} />
                            <Route path="/register-requestor" element={<RegisterRequestor />} />
                            <Route path="/new-request" element={<JoinRequest />} />
                            <Route path="/donors" element={<Donors />} />
                            <Route path="/doner/:donerId" element={<Doner />} />
                            <Route path="/requestors" element={<Requestors />} />
                            <Route path="/requestor/:requestorId" element={<Requestor />} />
                        </Route>
                        <Route path="/login" element={<Login />} />
                    </Routes>
                )}
                {!notificationGranted && (
                    <Container my="md">
                        <Text color="red">Notification request must me granted to show notification</Text>
                        <Button my="md" onClick={handleNotificationPermission}>
                            Request Notification Permission
                        </Button>
                    </Container>
                )}
            </NotificationsProvider>
        </MantineProvider>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        colorScheme: state.themeReducer,
        web3: state.web3Reducer,
        contract: state.contractReducer.contract,
        user: state.userReducer,
    };
};

export default connect(mapStateToProps)(App);
