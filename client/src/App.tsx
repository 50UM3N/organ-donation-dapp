import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import { MantineProvider } from "@mantine/core";
import RegisterDoner from "./Routes/Register/RegisterDonner";
import Login from "./Routes/Auth/Login";
import AuthProvider from "./Provider/AuthProvider";
import { connect } from "react-redux";
import Register from "./Routes/Auth/Register";
import { NotificationsProvider } from "@mantine/notifications";
import { IRootState } from "./store";
import { InitialThemeState } from "./store/reducers/theme-reducer";
import RegisterRequestor from "./Routes/Register/RegisterRequestor";
import JoinRequest from "./Routes/JoinRequest";
import Donors from "./Routes/Donors";
import Doner from "./Routes/Doner";
import Requestors from "./Routes/Requestors";
import Requestor from "./Routes/Requestor";

interface props {
    colorScheme: InitialThemeState;
}

const App: React.FC<props> = ({ colorScheme }) => {
    return (
        <MantineProvider theme={{ colorScheme }}>
            <NotificationsProvider>
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
                        <Route path="/requestor-details/:requestorId" element={<Requestor />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </NotificationsProvider>
        </MantineProvider>
    );
};

const mapStateToProps = (state: IRootState) => {
    return {
        colorScheme: state.themeReducer,
        web3: state.web3Reducer,
    };
};

export default connect(mapStateToProps)(App);
