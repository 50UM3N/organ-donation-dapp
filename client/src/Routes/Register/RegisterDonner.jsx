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
} from "@mantine/core";
import { useState } from "react";
import { connect } from "react-redux";
import { userAdd } from "../../store/actions";
import { useNotifications } from "@mantine/notifications";
import { At } from "tabler-icons-react";
import Nav from "../../Components/Navigation/Nav";
import { DatePicker } from "@mantine/dates";
import { useNavigate } from "react-router-dom";
import useValidate from "../../Hooks/useValidate";
const RegisterDonner = ({ contract, user, userAdd }) => {
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
    const handleChange = (e) => {
        validator.validOnChange(e.currentTarget);
    };
    const getAge = (dateString) => {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validator.validate()) {
            console.log("validate error");
            return;
        }
        setLoading(true);
        let date = new Date(form.dob.value).getTime();
        let age = getAge(form.dob.value);
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        const data = validator.generalize();
        data.dob = date;
        data.age = age;
        data.id = 0;
        try {
            let response = await contract.methods
                .registerDoner(data)
                .send({ from: accounts[0] });
            showNotification({
                title: "Success",
                autoClose: false,
                message:
                    "Doner registration successful waiting for conformation",
                onClose: () => navigate("/"),
            });
            let doner = response.events.Register.returnValues[0];
            console.log(doner);
            // userAdd({
            //     id: doner.id,
            //     fname: doner.fname,
            //     lname: doner.lname,
            //     email: doner.email,
            //     dob: doner.dob,
            //     mobile: doner.mobile,
            //     uidai: doner.uidai,
            //     age: doner.age,
            //     weight: doner.weight,
            //     height: doner.height,
            //     bmi: doner.bmi,
            //     blood_group: doner.blood_group,
            //     gender: doner.gender,
            //     state: doner.state,
            //     district: doner.district,
            //     postal_code: doner.postal_code,
            //     address_line: doner.address_line,
            // });
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
    return (
        <Nav>
            <Paper p={"md"}>
                <Title order={4}>Add new donner</Title>
                <Divider my={"sm"} />
                <form onSubmit={handleSubmit}>
                    <Grid gutter={"sm"}>
                        <Col md={6}>
                            <TextInput
                                placeholder="First name"
                                required
                                label="Donner First Name"
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                        currentTarget: {
                                            name: "dob",
                                            value: val,
                                        },
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
                                        currentTarget: {
                                            name: "mobile",
                                            value: val,
                                        },
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
                                        currentTarget: {
                                            name: "uidai",
                                            value: val,
                                        },
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
                                        currentTarget: {
                                            name: "weight",
                                            value: val,
                                        },
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
                                        currentTarget: {
                                            name: "height",
                                            value: val,
                                        },
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
                                        currentTarget: {
                                            name: "bmi",
                                            value: val,
                                        },
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
                                        currentTarget: {
                                            name: "blood_group",
                                            value: val,
                                        },
                                    })
                                }
                                value={form.blood_group.value}
                                error={form.blood_group.error}
                                data={[
                                    "A+",
                                    "O+",
                                    "B+",
                                    "AB+",
                                    "A-",
                                    "O-",
                                    "B-",
                                    "AB-",
                                ]}
                            />
                        </Col>
                        <Col md={6}>
                            <Select
                                placeholder="Gender"
                                required
                                label="Donner Gender"
                                onChange={(val) =>
                                    handleChange({
                                        currentTarget: {
                                            name: "gender",
                                            value: val,
                                        },
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
const mapStateToProps = (state) => {
    return {
        contract: state.contractReducer.contract,
        user: state.userReducer,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        donerAdd: (user) => {
            dispatch(userAdd(user));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterDonner);
