import React, { useEffect, useState } from "react";
import { TextInput, Text, Paper, Group, Button, Container, Textarea, useMantineTheme } from "@mantine/core";
import { useValidate } from "pangolin-hooks";
import { connect } from "react-redux";
import { useNotifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

import { userAdd } from "../../store/actions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { handleRPCError } from "../../utils/handleError";
import { toByte32 } from "../../utils/utils";

interface props {
    contract: Contract;
    user: UserState;
    userAdd: (user: User) => void;
}

const Register: React.FC<props> = ({ contract, user, userAdd }) => {
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

    const handleChange = (evt: { name: string; value: any }) => {
        validator.validOnChange(evt);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validator.validate()) return;
        setLoading(true);
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        const data: any = validator.generalize();
        try {
            const response = await contract?.methods
                .registerUser([
                    "0x9332d7652828B818E5C0587b26c29e895CcB02BB", // sample address for registration
                    toByte32(data.name),
                    toByte32(data.address),
                    toByte32(data.email),
                    toByte32(data.phone),
                    toByte32(""),
                    false,
                ])
                .send({ from: accounts[0] });
            showNotification({
                title: "Success",
                message: "Registration successful waiting for conformation",
                onClose: () => navigate("/"),
            });
            const user = response.events.Register.returnValues[0];
            userAdd({
                name: user[0],
                email: user[1],
                mobile: user[2],
                verified: user[3],
                role: user[4],
                address: user["address_line"],
            });
        } catch (err: any) {
            console.log(err);
            showNotification({
                color: "red",
                title: "Error",
                message: handleRPCError(err).message,
                autoClose: false,
            });
        }
        setLoading(false);
    };
    useEffect(() => {
        if (user) navigate("/");
    }, [navigate, user]);

    return (
        <Container size={"xs"} py="xl">
            <Paper radius="md" p="xl" withBorder>
                <Text size="lg" weight={500}>
                    Join our system
                </Text>
                <Text color={theme.colors.gray[6]} mb="sm">
                    After fill up the form you have to wait for conformation the conformation will be given by
                    the mobile number and email
                </Text>

                <form onSubmit={handleSubmit}>
                    <Group direction="column" grow>
                        <TextInput
                            label="Name"
                            required
                            placeholder="Your name"
                            name="name"
                            value={form.name.value}
                            onChange={(e) => handleChange(e.currentTarget)}
                            error={form.name.error}
                        />
                        <TextInput
                            required
                            label="Email"
                            placeholder="hello@mantine.dev"
                            name="email"
                            value={form.email.value}
                            onChange={(e) => handleChange(e.currentTarget)}
                            error={form.email.error}
                        />

                        <TextInput
                            required
                            label="Mobile Number"
                            placeholder="+91 95********"
                            name="phone"
                            value={form.phone.value}
                            onChange={(e) => handleChange(e.currentTarget)}
                            error={form.phone.error}
                        />
                        <Textarea
                            required
                            label="Address"
                            placeholder="Your address"
                            name="address"
                            value={form.address.value}
                            onChange={(e) => handleChange(e.currentTarget)}
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

const mapStateToProps = (state: RootState) => {
    return {
        contract: state.contractReducer.contract,
        user: state.userReducer,
    };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        userAdd: (user: User) => {
            dispatch(userAdd(user));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
