import React, { useEffect, useState } from "react";
import {
    TextInput,
    Text,
    Paper,
    Group,
    Button,
    Container,
    useMantineTheme,
    Stepper,
    Title,
    Select,
} from "@mantine/core";
import { useValidate } from "pangolin-hooks";
import { connect } from "react-redux";
import { useNotifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

import { userAdd } from "../../store/actions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { handleRPCError } from "../../utils/handleError";
import { toByte32 } from "../../utils/utils";
import StateSelect from "../../Components/Select/StateSelect";
import DistrictSelect from "../../Components/Select/DistricSelect";
import faker from "@faker-js/faker";

interface props {
    contract: Contract;
    user: UserState;
    userAdd: (user: User) => void;
}

const Register: React.FC<props> = ({ contract, user, userAdd }) => {
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    const navigate = useNavigate();
    const theme = useMantineTheme();
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotifications();
    const [form, validator] = useValidate({
        user_name: { value: faker.name.findName(), error: null, validate: "required" },
        user_email: { value: faker.internet.email().toLowerCase(), error: null, validate: "required|email" },
        user_phone: { value: faker.phone.phoneNumber("+91 98########"), error: null, validate: "required" },
        hospital_name: { value: faker.name.findName(), error: null, validate: "required" },
        hospital_type: { value: "Private", error: null, validate: "required" },
        hospital_registration_number: { value: "EA123456789", error: null, validate: "required" },
        hospital_address_line: {
            value: faker.address.streetAddress(false),
            error: null,
            validate: "required",
        },
        hospital_state: { value: "Andaman and Nicobar Island (UT)", error: null, validate: "required" },
        hospital_district: { value: "Nicobar", error: null, validate: "required" },
        hospital_town: { value: faker.address.city(), error: null, validate: "required" },
        hospital_pincode: { value: faker.address.zipCode(), error: null, validate: "required|number" },
        hospital_telephone: {
            value: faker.phone.phoneNumber("033 28######"),
            error: null,
            validate: "required",
        },
        hospital_mobile: {
            value: faker.phone.phoneNumber("+91 98########"),
            error: null,
            validate: "required",
        },
        hospital_emergency_mobile: {
            value: faker.phone.phoneNumber("+91 98########"),
            error: null,
            validate: "required",
        },
    });
    // console.log(
    //     [
    //         "0x9332d7652828B818E5C0587b26c29e895CcB02BB", // sample address for registration
    //         toByte32(form.user_name.value),
    //         toByte32(form.user_email.value),
    //         toByte32(form.user_phone.value),
    //         toByte32(""),
    //         false,
    //         0,
    //     ],
    //     [
    //         0,
    //         toByte32(form.hospital_name.value),
    //         toByte32(form.hospital_type.value),
    //         toByte32(form.hospital_registration_number.value),
    //         toByte32(form.hospital_address_line.value),
    //         toByte32(form.hospital_state.value),
    //         toByte32(form.hospital_district.value),
    //         toByte32(form.hospital_town.value),
    //         form.hospital_pincode.value,
    //         toByte32(form.hospital_telephone.value),
    //         toByte32(form.hospital_mobile.value),
    //         toByte32(form.hospital_emergency_mobile.value),
    //     ]
    // );
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
            await contract?.methods
                .registerUser(
                    [
                        "0x9332d7652828B818E5C0587b26c29e895CcB02BB", // sample address for registration
                        toByte32(data.user_name),
                        toByte32(data.user_email),
                        toByte32(data.user_phone),
                        toByte32(""),
                        false,
                        0,
                    ],
                    [
                        0,
                        toByte32(data.hospital_name),
                        toByte32(data.hospital_type),
                        toByte32(data.hospital_registration_number),
                        toByte32(data.hospital_address_line),
                        toByte32(data.hospital_state),
                        toByte32(data.hospital_district),
                        toByte32(data.hospital_town),
                        data.hospital_pincode,
                        toByte32(data.hospital_telephone),
                        toByte32(data.hospital_mobile),
                        toByte32(data.hospital_emergency_mobile),
                    ]
                )
                .send({ from: accounts[0] });
            showNotification({
                title: "Success",
                message: "Registration successful waiting for conformation",
            });
            nextStep();
            // console.log(response.events.Register.returnValues);
        } catch (err: any) {
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
            <Title mb="md" align="center">
                Join our system
            </Title>
            <Text color={theme.colors.gray[6]} mb="lg" align="center">
                After fill up the all form you have to wait for conformation the conformation will be given by
                the mobile number and email
            </Text>
            <form onSubmit={handleSubmit} noValidate>
                <Stepper active={active} onStepClick={setActive} breakpoint="sm">
                    <Stepper.Step
                        label="Fist step"
                        description="Enter the user information"
                        allowStepSelect={active > 0}
                    >
                        <UserRegistrationForm handleChange={handleChange} form={form} />
                    </Stepper.Step>
                    <Stepper.Step
                        label="Second step"
                        description="Enter the hospital details"
                        allowStepSelect={active > 1}
                    >
                        <HospitalRegistrationForm handleChange={handleChange} form={form} />
                    </Stepper.Step>
                    <Stepper.Completed>
                        <Text align="center">
                            Your registration is successfully completed just waiting for approval.
                        </Text>
                    </Stepper.Completed>
                </Stepper>

                <Group position="center" mt="xl">
                    {active !== 2 && (
                        <Button type="button" variant="default" onClick={prevStep} loading={loading}>
                            Back
                        </Button>
                    )}

                    {active === 0 && (
                        <Button type="button" onClick={nextStep}>
                            Next step
                        </Button>
                    )}
                    {active === 1 && (
                        <Button type="submit" loading={loading}>
                            Register
                        </Button>
                    )}
                    {active === 2 && (
                        <Button type="button" onClick={() => navigate("/")} color="green">
                            Go Home
                        </Button>
                    )}
                </Group>
            </form>
        </Container>
    );
};

const UserRegistrationForm: React.FC<{
    handleChange: any;
    form: any;
}> = ({ handleChange, form }) => {
    return (
        <Paper radius="md" p="xl" withBorder my="md">
            <Text size="lg" weight={500}>
                Enter the user information
            </Text>
            <Group direction="column" grow>
                <TextInput
                    label="Name"
                    required
                    placeholder="Your name"
                    name="user_name"
                    value={form.user_name.value}
                    onChange={(e) => handleChange(e.currentTarget)}
                    error={form.user_name.error}
                />
                <TextInput
                    required
                    label="Email"
                    placeholder="hello@mantine.dev"
                    name="user_email"
                    value={form.user_email.value}
                    onChange={(e) => handleChange(e.currentTarget)}
                    error={form.user_email.error}
                />

                <TextInput
                    required
                    label="Mobile Number"
                    placeholder="+91 95********"
                    name="user_phone"
                    value={form.user_phone.value}
                    onChange={(e) => handleChange(e.currentTarget)}
                    error={form.user_phone.error}
                />
            </Group>
        </Paper>
    );
};

const HospitalRegistrationForm: React.FC<{
    handleChange: any;
    form: any;
}> = ({ handleChange, form }) => {
    return (
        <Paper radius="md" p="xl" withBorder>
            <Text size="lg" weight={500} mb="md">
                Enter your hospital/agency information
            </Text>
            <Group direction="column" grow>
                <TextInput
                    label="Hospital Name"
                    required
                    placeholder="Enter the name"
                    name="hospital_name"
                    value={form.hospital_name.value}
                    onChange={(e) => handleChange(e.currentTarget)}
                    error={form.hospital_name.error}
                />
                <Select
                    label="Type of the healthcare"
                    placeholder="Select One"
                    data={["Private", "Government"]}
                    onChange={(val) => handleChange({ name: "hospital_type", value: val })}
                    error={form.hospital_type.error}
                />
                <TextInput
                    label="Registration Number"
                    required
                    placeholder="Enter the hospital registration number"
                    name="hospital_registration_number"
                    value={form.hospital_registration_number.value}
                    onChange={(e) => handleChange(e.currentTarget)}
                    error={form.hospital_registration_number.error}
                />
                <TextInput
                    label="Address Line"
                    required
                    placeholder="Enter the hospital address line"
                    name="hospital_address_line"
                    value={form.hospital_address_line.value}
                    onChange={(e) => handleChange(e.currentTarget)}
                    error={form.hospital_address_line.error}
                />
                <StateSelect
                    label="State of the hospital"
                    required
                    onChange={(val: string) => handleChange({ name: "hospital_state", value: val })}
                    error={form.hospital_state.error}
                />
                {form.hospital_state.value && (
                    <DistrictSelect
                        state={form.hospital_state.value}
                        label="State of the hospital"
                        required
                        data={[]}
                        onChange={(val: string) => handleChange({ name: "hospital_district", value: val })}
                        error={form.hospital_district.error}
                    />
                )}
                <TextInput
                    label="Town"
                    required
                    placeholder="Enter the hospital town"
                    name="hospital_town"
                    value={form.hospital_town.value}
                    onChange={(e) => handleChange(e.currentTarget)}
                    error={form.hospital_town.error}
                />

                <TextInput
                    label="Pincode"
                    required
                    placeholder="Enter the hospital pincode"
                    name="hospital_pincode"
                    value={form.hospital_pincode.value}
                    onChange={(e) => handleChange(e.currentTarget)}
                    error={form.hospital_pincode.error}
                />

                <TextInput
                    required
                    label="Hospital mobile number"
                    placeholder="+91 95********"
                    name="hospital_mobile"
                    value={form.hospital_mobile.value}
                    onChange={(e) => handleChange(e.currentTarget)}
                    error={form.hospital_mobile.error}
                />

                <TextInput
                    required
                    label="Hospital Telephone number"
                    placeholder="033 25*******"
                    name="hospital_telephone"
                    value={form.hospital_telephone.value}
                    onChange={(e) => handleChange(e.currentTarget)}
                    error={form.hospital_telephone.error}
                />

                <TextInput
                    required
                    label="Hospital Emergency Mobile Number"
                    placeholder="+91 95********"
                    name="hospital_emergency_mobile"
                    value={form.hospital_emergency_mobile.value}
                    onChange={(e) => handleChange(e.currentTarget)}
                    error={form.hospital_emergency_mobile.error}
                />
            </Group>
        </Paper>
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
