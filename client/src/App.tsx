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
import { distanceCalculate, toString } from "./utils/utils";
import Report from "./Routes/Report";

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
            DonerDemise.on("data", async (event: any) => {
                const hospitals = event.returnValues._hospitals.map((item: string) => Number(item));
                const matchedHospitals = event.returnValues._matchedHospitals.map((item: any) => ({
                    longitude: Number(toString(item.longitude)),
                    latitude: Number(toString(item.latitude)),
                }));
                const matchedOrgans = event.returnValues._matchedOrgans;
                const users = event.returnValues._users;
                const map: any = {};
                hospitals.forEach((element: string, index: number) => {
                    if (map[Number(element)] === undefined) {
                        map[Number(element)] = [];
                    }
                    map[Number(element)].push(users[index]);
                });
                const idSet = new Set(hospitals);
                if (idSet.has(user?.hospital?.id)) {
                    const d: any[] = [];
                    hospitals.forEach((item: number, index: number) => {
                        if (user?.hospital?.id === item) {
                            const time = distanceCalculate(
                                matchedHospitals[index].longitude,
                                matchedHospitals[index].latitude,
                                Number(user?.hospital?.longitude),
                                Number(user?.hospital?.latitude)
                            );
                            if (Number(matchedOrgans.valid_time) >= time) {
                                d.push(users[index]);
                            }
                        }
                    });
                    if (d.length > 0) {
                        showNotification({
                            autoClose: false,
                            title: "New Organ Found for the user",
                            message: `There are the list of the user id that match organ are found. Please do the required steps for each users,The id are 
                            ${d}
                        `,
                        });
                        const notification = new Notification(
                            "There is a Organ available for your requestor."
                        );
                        notification.onclick = (event) => {
                            event.preventDefault();
                            window.open(window.location.host, "_blank");
                        };
                    }
                }
            });
            DonerDemise.on("error", (err: any) => console.error("error " + err));
            DonerDemise.on("connected", (str: any) => console.debug("Event connected (DonorDemise): " + str));
        }
        return () => {
            if (UserVerified) {
                UserVerified.unsubscribe((a: any) => {
                    console.debug("Unsubscribe (UserVerified) : " + a);
                });
            }
            if (DonerDemise) {
                DonerDemise.unsubscribe((a: any) => {
                    console.debug("Unsubscribe (DonorDemise) : " + a);
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
                            <Route path="/donor/:donorId" element={<Doner />} />
                            <Route path="/requestors" element={<Requestors />} />
                            <Route path="/requestor/:requestorId" element={<Requestor />} />
                            <Route path="/register-donor" element={<RegisterDoner />} />
                            <Route path="/report" element={<Report />} />
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
