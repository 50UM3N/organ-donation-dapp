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
import { At } from "tabler-icons-react";
import Nav from "../Components/Navigation/Nav";
import { DatePicker } from "@mantine/dates";
const Home = () => {
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
                            />
                        </Col>
                        <Col md={6}>
                            <TextInput
                                placeholder="Last name"
                                required
                                label="Donner Last Name"
                            />
                        </Col>
                        <Col md={6}>
                            <TextInput
                                placeholder="Donner email"
                                required
                                label="Donner Email Address"
                                icon={<At size={14} />}
                            />
                        </Col>
                        <Col md={6}>
                            <DatePicker
                                placeholder="Pick date"
                                required
                                label="Donner date of birth"
                            />
                        </Col>
                        <Col md={6}>
                            <TextInput
                                placeholder="Mobile number"
                                required
                                label="Donner Mobile Number"
                            />
                        </Col>
                        <Col md={6}>
                            <TextInput
                                placeholder="UIDAI no"
                                required
                                label="Donner UIDAI No"
                            />
                        </Col>
                        <Col md={6}>
                            <NumberInput
                                placeholder="Weight"
                                required
                                label="Donner Weight"
                                min={0}
                            />
                        </Col>
                        <Col md={6}>
                            <NumberInput
                                placeholder="Height"
                                required
                                label="Donner Height"
                                min={0}
                            />
                        </Col>
                        <Col md={6}>
                            <NumberInput
                                placeholder="BMI"
                                required
                                label="Donner BMI"
                                min={0}
                            />
                        </Col>
                        <Col md={6}>
                            <Select
                                placeholder="Blood group"
                                required
                                label="Donner Blood Group"
                                data={[
                                    { label: "A+" },
                                    { label: "O+" },
                                    { label: "B+" },
                                    { label: "AB+" },
                                    { label: "A-" },
                                    { label: "O-" },
                                    { label: "B-" },
                                    { label: "AB-" },
                                ]}
                            />
                        </Col>
                        <Col md={6}>
                            <Select
                                placeholder="Gender"
                                required
                                label="Donner Gender"
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
                            />
                        </Col>
                        <Col md={6}>
                            <TextInput
                                placeholder="District"
                                required
                                label="Donner District"
                            />
                        </Col>
                        <Col md={6}>
                            <NumberInput
                                placeholder="Postal code"
                                required
                                label="Donner Postal Code"
                                min={0}
                            />
                        </Col>
                        <Col md={6}>
                            <TextInput
                                placeholder="Address line"
                                required
                                label="Donner Address Line"
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

export default Home;
