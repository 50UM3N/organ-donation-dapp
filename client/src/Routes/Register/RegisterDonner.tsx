import React from "react";
import { At } from "tabler-icons-react";
import Nav from "../../Components/Navigation/Nav";
import { DatePicker } from "@mantine/dates";
import { useValidate } from "pangolin-hooks";
import { Contract } from "web3-eth-contract";
import { Col, Divider, Grid, NumberInput, Paper, TextInput, Title, Select, Button } from "@mantine/core";
import { useState } from "react";
import { connect } from "react-redux";
import { useNotifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { IRootState } from "../../store";

interface props {
    contract: Contract | null;
}

const RegisterDonner: React.FC<props> = ({ contract }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { showNotification } = useNotifications();
    const [form, validator] = useValidate({
        fname: { value: "", validate: "required", error: "" },
        lname: { value: "", validate: "required", error: "" },
        email: { value: "", validate: "required", error: "" },
        dob: { value: "", validate: "required", error: "" },
        mobile: { value: "", validate: "required", error: "" },
        uidai: { value: "", validate: "required", error: "" },
        weight: { value: "", validate: "required", error: "" },
        height: { value: "", validate: "required", error: "" },
        bmi: { value: "", validate: "required", error: "" },
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
        data.dob = date;
        data.age = age;
        data.id = 0;
        try {
            await contract?.methods.registerDoner(data).send({ from: accounts[0] });
            showNotification({
                title: "Success",
                autoClose: false,
                message: "Doner registration successful waiting for conformation",
                onClose: () => navigate("/"),
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
            <Paper withBorder p={"md"}>
                <Title order={4}>Add new donner</Title>
                <Divider my={"sm"} />
                <form onSubmit={handleSubmit}>
                    <Grid gutter={"sm"}>
                        <Col md={6}>
                            <TextInput
                                placeholder="First name"
                                required
                                label="Donner First Name"
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
                                label="Donner Last Name"
                                onChange={(e) => handleChange(e.currentTarget)}
                                value={form.lname.value}
                                name="lname"
                                error={form.lname.error}
                            />
                        </Col>
                        <Col md={6}>
                            <TextInput
                                placeholder="Donner email"
                                required
                                label="Donner Email Address"
                                onChange={(e) => handleChange(e.currentTarget)}
                                value={form.email.value}
                                name="email"
                                error={form.email.error}
                                icon={<At size={14} />}
                            />
                        </Col>
                        <Col md={6}>
                            <DatePicker
                                placeholder="Pick date"
                                required
                                label="Donner date of birth"
                                onChange={(val) =>
                                    handleChange({
                                        name: "dob",
                                        value: val,
                                    })
                                }
                                value={form.dob.value}
                                error={form.dob.error}
                            />
                        </Col>
                        <Col md={6}>
                            <NumberInput
                                placeholder="Mobile number"
                                required
                                label="Donner Mobile Number"
                                onChange={(val) =>
                                    handleChange({
                                        name: "mobile",
                                        value: val,
                                    })
                                }
                                value={form.mobile.value}
                                name="mobile"
                                error={form.mobile.error}
                            />
                        </Col>
                        <Col md={6}>
                            <NumberInput
                                placeholder="UIDAI no"
                                required
                                label="Donner UIDAI No"
                                onChange={(val) =>
                                    handleChange({
                                        name: "uidai",
                                        value: val,
                                    })
                                }
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
                                label="Donner Weight"
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
                                label="Donner Height"
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
                                label="Donner BMI"
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
                                label="Donner Blood Group"
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
                            <Select
                                placeholder="Gender"
                                required
                                label="Donner Gender"
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
                            <TextInput
                                placeholder="State"
                                required
                                label="Donner State"
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
                                label="Donner District"
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
                                label="Donner Postal Code"
                                onChange={(e) => handleChange(e.currentTarget)}
                                name="postal_code"
                                value={form.postal_code.value}
                                error={form.postal_code.error}
                                min={0}
                            />
                        </Col>
                        <Col md={6}>
                            <TextInput
                                placeholder="Address line"
                                required
                                label="Donner Address Line"
                                onChange={(e) => handleChange(e.currentTarget)}
                                value={form.address_line.value}
                                name="address_line"
                                error={form.address_line.error}
                            />
                        </Col>
                    </Grid>
                    <Button type="submit" mt="md" loading={loading}>
                        Add
                    </Button>
                </form>
            </Paper>
        </Nav>
    );
};

const mapStateToProps = (state: IRootState) => {
    return {
        contract: state.contractReducer.contract,
    };
};
export default connect(mapStateToProps)(RegisterDonner);
