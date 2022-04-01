import React, { useEffect, useState } from "react";
import {
    TextInput,
    Text,
    Paper,
    Group,
    Button,
    Container,
    Textarea,
    useMantineTheme,
} from "@mantine/core";
import useValidate from "../../Hooks/useValidate";
import { connect } from "react-redux";
import { useNotifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { userAdd } from "../../store/actions";

const Register = ({ contract, user, userAdd }) => {
    const navigate = useNavigate();
    const theme = useMantineTheme();
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotifications();
    const [form, validator] = useValidate({
        name: { value: "", error: null, validate: "required" },
        email: { value: "", error: null, validate: "required|email" },
        address: { value: "", error: null, validate: "required" },
        phone: { value: "", error: null, validate: "required" },
    });
    const handleChange = (e) => {
        validator.validOnChange(e.currentTarget);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validator.validate()) return;
        setLoading(true);
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        const data = validator.generalize();
        try {
            let response = await contract.methods
                .registerUser([
                    data.name,
                    data.address,
                    data.email,
                    data.phone,
                    "",
                    false,
                ])
                .send({ from: accounts[0] });
            showNotification({
                title: "Success",
                message: "Registration successful waiting for conformation",
                onClose: () => navigate("/"),
            });
            let user = response.events.Register.returnValues[0];
            userAdd({
                name: user[0],
                email: user[1],
                mobile: user[2],
                verified: user[3],
                role: user[4],
            });
        } catch (err) {
            showNotification({
                color: "red",
                title: "Error",
                message: err.message,
                autoClose: false,
            });
        }
        setLoading(false);
    };
    useEffect(() => {
        if (user) navigate("/");
    }, []);

    return (
        <Container size={"xs"} py="xl">
            <Paper radius="md" p="xl" withBorder>
                <Text size="lg" weight={500}>
                    Join our system
                </Text>
                <Text color={theme.colors.gray[6]} mb="sm">
                    After fill up the form you have to wait for conformation the
                    conformation will be given by the mobile number and email
                </Text>

                <form onSubmit={handleSubmit}>
                    <Group direction="column" grow>
                        <TextInput
                            label="Name"
                            required
                            placeholder="Your name"
                            name="name"
                            value={form.name.value}
                            onChange={handleChange}
                            error={form.name.error}
                        />
                        <TextInput
                            required
                            label="Email"
                            placeholder="hello@mantine.dev"
                            name="email"
                            value={form.email.value}
                            onChange={handleChange}
                            error={form.email.error}
                        />

                        <TextInput
                            required
                            label="Mobile Number"
                            placeholder="+91 95********"
                            name="phone"
                            value={form.phone.value}
                            onChange={handleChange}
                            error={form.phone.error}
                        />
                        <Textarea
                            required
                            label="Address"
                            placeholder="Your address"
                            name="address"
                            value={form.address.value}
                            onChange={handleChange}
                            error={form.address.error}
                        />
                    </Group>

                    <Button type="submit" mt="md" loading={loading}>
                        Register
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        contract: state.contractReducer.contract,
        user: state.userReducer,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        userAdd: (user) => {
            dispatch(userAdd(user));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
