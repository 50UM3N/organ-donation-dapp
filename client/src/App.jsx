import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import { MantineProvider } from "@mantine/core";
import RegisterDonner from "./Routes/Register/RegisterDonner";
import Login from "./Routes/Auth/Login";
import AuthProvider from "./Provider/AuthProvider";
import { connect } from "react-redux";
import Register from "./Routes/Auth/Register";
import { NotificationsProvider } from "@mantine/notifications";

function App({ colorScheme }) {
    return (
        <MantineProvider theme={{ colorScheme }}>
            <NotificationsProvider>
                <Routes>
                    <Route element={<AuthProvider />}>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/register-doner"
                            element={<RegisterDonner />}
                        />
                        <Route path="/register" element={<Register />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </NotificationsProvider>
        </MantineProvider>
    );
}

const mapStateToProps = (state) => {
    return {
        colorScheme: state.themeReducer,
        web3: state.web3Reducer,
    };
};

export default connect(mapStateToProps)(App);
