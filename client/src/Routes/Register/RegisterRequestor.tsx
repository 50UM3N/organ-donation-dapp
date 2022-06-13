import React from "react";
import { At } from "tabler-icons-react";
import Nav from "../../Components/Navigation/Nav";
import useValidate from "../../hooks/useValidate";
import {
    Col,
    Divider,
    Grid,
    NumberInput,
    Paper,
    TextInput,
    Title,
    Select,
    Button,
    Container,
    Text,
    Input,
    InputWrapper,
} from "@mantine/core";
import { useState } from "react";
import { connect } from "react-redux";
import { useNotifications } from "@mantine/notifications";
import { toByte32 } from "../../utils/utils";
import { useModals } from "@mantine/modals";

interface props {
    contract: Contract;
}
const RegisterRequestor: React.FC<props> = ({ contract }) => {
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotifications();
    const modals = useModals();
    const [form, validator] = useValidate({
        fname: { value: "", validate: "required", error: "" },
        lname: { value: "", validate: "required", error: "" },
        email: { value: "", validate: "required|email", error: "" },
        dob: { value: "", validate: "required", error: "" },
        mobile: { value: "", validate: "required", error: "" },
        uidai: { value: "", validate: "required", error: "" },
        weight: { value: null, validate: "required", error: "" },
        height: { value: null, validate: "required", error: "" },
        bmi: { value: null, validate: "required", error: "" },
        blood_group: { value: "", validate: "required", error: "" },
        gender: { value: "", validate: "required", error: "" },
        state: { value: "", validate: "required", error: "" },
        district: { value: "", validate: "required", error: "" },
        postal_code: { value: "", validate: "required", error: "" },
        address_line: { value: "", validate: "required", error: "" },
    });
    const handleChange = (evt: { name: string; value: any }) => {
        validator.validOnChange(evt);
    };
    const getAge = (dateString: string) => {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validator.validate()) {
            console.log("validate error");
            return;
        }
        setLoading(true);
        const date = new Date(form.dob.value).getTime();
        const age = getAge(form.dob.value);
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        const data: any = validator.generalize();
        data.dob = toByte32(String(date));
        data.age = age;
        data.id = 0;
        data.fname = toByte32(data.fname);
        data.lname = toByte32(data.lname);
        data.email = toByte32(data.email);
        data.blood_group = toByte32(data.blood_group);
        data.gender = toByte32(data.gender);
        data.state = toByte32(data.state);
        data.district = toByte32(data.district);
        data.address_line = toByte32(data.address_line);
        data.postal_code = toByte32(data.postal_code);
        data.register_hospital_id = 0;
        try {
            const res = await contract?.methods.registerRequestor(data).send({ from: accounts[0] });
            const requestorId = res.events.Register.returnValues._requestor.id;
            const modalId = modals.openModal({
                title: "Register Requestor",
                children: (
                    <>
                        <Text mb="xs">Requestor registration successful</Text>
                        <Text mb="xs">The Requestor ID: {requestorId}</Text>

                        <Button fullWidth onClick={() => modals.closeModal(modalId)} mt="md">
                            Close
                        </Button>
                    </>
                ),
            });
        } catch (err: any) {
            showNotification({
                color: "red",
                title: "Error",
                message: err.message,
                autoClose: false,
            });
        }
        setLoading(false);
    };
    return (
        <Nav>
            <Container>
                <Paper p={"md"}>
                    <Title order={4}>Add new Requestor</Title>
                    <Divider my={"sm"} />
                    <form onSubmit={handleSubmit}>
                        <Grid gutter={"sm"}>
                            <Col md={6}>
                                <TextInput
                                    placeholder="First name"
                                    required
                                    label="Requestor First Name"
                                    onChange={(e) => handleChange(e.currentTarget)}
                                    value={form.fname.value}
                                    name="fname"
                                    error={form.fname.error}
                                />
                            </Col>
                            <Col md={6}>
                                <TextInput
                                    placeholder="Last name"
                                    required
                                    label="Requestor Last Name"
                                    onChange={(e) => handleChange(e.currentTarget)}
                                    value={form.lname.value}
                                    name="lname"
                                    error={form.lname.error}
                                />
                            </Col>
                            <Col md={6}>
                                <Select
                                    placeholder="Gender"
                                    required
                                    label="Requestor Gender"
                                    onChange={(val) =>
                                        handleChange({
                                            name: "gender",
                                            value: val,
                                        })
                                    }
                                    value={form.gender.value}
                                    error={form.gender.error}
                                    data={[
                                        { value: "male", label: "Male" },
                                        { value: "female", label: "Female" },
                                        { value: "other", label: "Other" },
                                    ]}
                                />
                            </Col>
                            <Col md={6}>
                                <InputWrapper label="Requestor date of birth" error={form.dob.error}>
                                    <Input
                                        placeholder="Pick date"
                                        required
                                        onChange={(e: any) =>
                                            handleChange({
                                                name: "dob",
                                                value: e.currentTarget.value,
                                            })
                                        }
                                        value={form.dob.value}
                                    />
                                </InputWrapper>
                            </Col>
                            <Col md={6}>
                                <TextInput
                                    placeholder="Requestor email"
                                    required
                                    label="Requestor Email Address"
                                    onChange={(e) => handleChange(e.currentTarget)}
                                    value={form.email.value}
                                    name="email"
                                    error={form.email.error}
                                    icon={<At size={14} />}
                                />
                            </Col>
                            <Col md={6}>
                                <TextInput
                                    placeholder="Mobile number"
                                    required
                                    label="Requestor Mobile Number"
                                    onChange={(e) => handleChange(e.currentTarget)}
                                    value={form.mobile.value}
                                    name="mobile"
                                    error={form.mobile.error}
                                />
                            </Col>
                            <Col md={6}>
                                <TextInput
                                    placeholder="UIDAI no"
                                    required
                                    label="Requestor UIDAI No"
                                    onChange={(e) => handleChange(e.currentTarget)}
                                    value={form.uidai.value}
                                    name="uidai"
                                    min={0}
                                    error={form.uidai.error}
                                />
                            </Col>
                            <Col md={6}>
                                <NumberInput
                                    placeholder="Weight"
                                    required
                                    label="Requestor Weight"
                                    onChange={(val) =>
                                        handleChange({
                                            name: "weight",
                                            value: val,
                                        })
                                    }
                                    value={form.weight.value}
                                    error={form.weight.error}
                                    min={0}
                                />
                            </Col>
                            <Col md={6}>
                                <NumberInput
                                    placeholder="Height"
                                    required
                                    label="Requestor Height"
                                    onChange={(val) =>
                                        handleChange({
                                            name: "height",
                                            value: val,
                                        })
                                    }
                                    value={form.height.value}
                                    error={form.height.error}
                                    min={0}
                                />
                            </Col>
                            <Col md={6}>
                                <NumberInput
                                    placeholder="BMI"
                                    required
                                    label="Requestor BMI"
                                    onChange={(val) =>
                                        handleChange({
                                            name: "bmi",
                                            value: val,
                                        })
                                    }
                                    value={form.bmi.value}
                                    error={form.bmi.error}
                                    min={0}
                                />
                            </Col>
                            <Col md={6}>
                                <Select
                                    placeholder="Blood group"
                                    required
                                    label="Requestor Blood Group"
                                    onChange={(val) =>
                                        handleChange({
                                            name: "blood_group",
                                            value: val,
                                        })
                                    }
                                    value={form.blood_group.value}
                                    error={form.blood_group.error}
                                    data={["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"]}
                                />
                            </Col>
                            <Col md={6}>
                                <TextInput
                                    placeholder="Address line"
                                    required
                                    label="Requestor Address Line"
                                    onChange={(e) => handleChange(e.currentTarget)}
                                    value={form.address_line.value}
                                    name="address_line"
                                    error={form.address_line.error}
                                />
                            </Col>
                            <Col md={6}>
                                <TextInput
                                    placeholder="State"
                                    required
                                    label="Requestor State"
                                    onChange={(e) => handleChange(e.currentTarget)}
                                    value={form.state.value}
                                    name="state"
                                    error={form.state.error}
                                />
                            </Col>
                            <Col md={6}>
                                <TextInput
                                    placeholder="District"
                                    required
                                    label="Requestor District"
                                    onChange={(e) => handleChange(e.currentTarget)}
                                    value={form.district.value}
                                    name="district"
                                    error={form.district.error}
                                />
                            </Col>
                            <Col md={6}>
                                <TextInput
                                    placeholder="Postal code"
                                    required
                                    label="Requestor Postal Code"
                                    onChange={(e) => handleChange(e.currentTarget)}
                                    name="postal_code"
                                    value={form.postal_code.value}
                                    error={form.postal_code.error}
                                    min={0}
                                />
                            </Col>
                        </Grid>
                        <Button type="submit" mt="md" loading={loading}>
                            Add Requestor
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Nav>
    );
};
const mapStateToProps = (state: RootState) => {
    return {
        contract: state.contractReducer.contract,
        // user: state.userReducer,
    };
};
// const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
//     return {
//         requestorAdd: (user: object) => {
//             dispatch(userAdd(user));
//         },
//     };
// };
export default connect(mapStateToProps)(RegisterRequestor);
