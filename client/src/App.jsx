import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import { useState } from "react";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import RegisterDonner from "./Routes/Register/RegisterDonner";
import Login from "./Routes/Auth/Login";
function App() {
    const [colorScheme, setColorScheme] = useState("light");
    const toggleColorScheme = (value) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider theme={{ colorScheme }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/register-donner"
                        element={<RegisterDonner />}
                    />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

export default App;
