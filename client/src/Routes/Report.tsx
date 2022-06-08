import { connect } from "react-redux";
import React from "react";
import Nav from "../Components/Navigation/Nav";
import { Container } from "@mantine/core";

interface props {
    contract: Contract;
}

const Report: React.FC<props> = ({ contract }) => {
    return (
        <Nav>
            <Container>Report</Container>
        </Nav>
    );
};

const mapStateToProps = (state: RootState) => ({ contract: state.contractReducer.contract });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
