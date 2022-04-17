import React from "react";
import { Col, Divider, Grid, NumberInput, Paper, TextInput, Title, Select, Button } from "@mantine/core";
import { At } from "tabler-icons-react";
import Nav from "../../Components/Navigation/Nav";
import { DatePicker } from "@mantine/dates";
import { useValidate } from "pangolin-hooks";
const RegisterDonner = () => {
    const [form, validator] = useValidate({
        fname: { value: "", validate: "required", error: "" },
        lname: { value: "", validate: "required", error: "" },
        email: { value: "", validate: "required", error: "" },
        dob: { value: "", validate: "required", error: "" },
        mobile: { value: "", validate: "required", error: "" },
        uidai: { value: "", validate: "required", error: "" },
        age: { value: "", validate: "required", error: "" },
        weight: { value: "", validate: "required", error: "" },
        height: { value: "", validate: "required", error: "" },
        bmi: { value: "", validate: "required", error: "" },
        blood_group: { value: "", validate: "required", error: "" },
        gender: { value: "", validate: "required", error: "" },
        state: { value: "", validate: "required", error: "" },
        district: { value: "", validate: "required", error: "" },
        postal_code: { value: "", validate: "required|number", error: "" },
        address_line: { value: "", validate: "required", error: "" },
    });
    const handleChange = (evt: { name: string; value: any }) => {
        validator.validOnChange(evt);
    };
    return (
        <Nav>
            <Paper p={"md"}>
                <Title order={4}>Add new donner</Title>
                <Divider my={"sm"} />
                <form>
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
                            <TextInput
                                placeholder="Mobile number"
                                required
                                label="Donner Mobile Number"
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
                                label="Donner UIDAI No"
                                onChange={(e) => handleChange(e.currentTarget)}
                                value={form.uidai.value}
                                name="uidai"
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
                    <Button type="submit" mt="md">
                        Add
                    </Button>
                </form>
            </Paper>
        </Nav>
    );
};

export default RegisterDonner;
