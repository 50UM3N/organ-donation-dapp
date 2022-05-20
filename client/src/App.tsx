import React, { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import { Button, Container, MantineProvider, Text } from "@mantine/core";
import RegisterDoner from "./Routes/Register/RegisterDonner";
import Login from "./Routes/Auth/Login";
import AuthProvider from "./Provider/AuthProvider";
import { connect } from "react-redux";
import Register from "./Routes/Auth/Register";
import { NotificationsProvider, showNotification } from "@mantine/notifications";

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
        let UserVerified: any;
        let DonerDemise: any;
        const options = {
            filter: {
                value: ["1000", "1337"],
            },
            fromBlock: "latest",
        };
        if (contract) {
            UserVerified = contract?.events.UserVerified(options);

            UserVerified.on("data", (event: any) => {
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
            UserVerified.on("error", (err: any) => console.error("error " + err));
            UserVerified.on("connected", (str: any) =>
                console.debug("Event connected (UserVerified): " + str)
            );

            DonerDemise = contract?.events.DonerDemise(options);
            DonerDemise.on("data", (event: any) => {
                console.log(event);
                const hospitals = event.returnValues._hospitals.map((item: string) => Number(item));
                const users = event.returnValues._users;
                console.log(users);
                const map: any = {};

                hospitals.forEach((element: string, index: number) => {
                    if (map[Number(element)] === undefined) {
                        map[Number(element)] = [];
                    }
                    map[Number(element)].push(users[index]);
                });
                console.log(map);
                const idSet = new Set(hospitals);
                if (idSet.has(user?.hospital?.id)) {
                    showNotification({
                        autoClose: false,
                        title: "New Organ Found for the user",
                        message: `There are the list of the user id that match organ are found. Please do the required steps for each users,The id are 
                            ${map[user?.hospital?.id || 0]}
                        `,
                    });
                    const notification = new Notification("There is a Organ available for your requestor.");
                    notification.onclick = (event) => {
                        event.preventDefault();
                        window.open(window.location.host, "_blank");
                    };
                }
            });
            DonerDemise.on("error", (err: any) => console.error("error " + err));
            DonerDemise.on("connected", (str: any) => console.debug("Event connected (DonerDemise): " + str));
        }
        return () => {
            if (UserVerified) {
                UserVerified.unsubscribe((a: any) => {
                    console.debug("Unsubscribe (UserVerified) : " + a);
                });
                DonerDemise.unsubscribe((a: any) => {
                    console.debug("Unsubscribe (DonerDemise) : " + a);
                });
            }
        };
    }, [contract, handleNotificationPermission, user?.id, user?.hospital]);
    return (
        <MantineProvider theme={{ colorScheme }}>
            <NotificationsProvider>
                {notificationGranted && (
                    <Routes>
                        <Route element={<AuthProvider />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/register-requestor" element={<RegisterRequestor />} />
                            <Route path="/new-request" element={<JoinRequest />} />
                            <Route path="/donors" element={<Donors />} />
                            <Route path="/doner/:donerId" element={<Doner />} />
                            <Route path="/requestors" element={<Requestors />} />
                            <Route path="/requestor/:requestorId" element={<Requestor />} />
                            <Route path="/register-doner" element={<RegisterDoner />} />
                        </Route>
                        <Route path="/register" element={<Register />} />
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
