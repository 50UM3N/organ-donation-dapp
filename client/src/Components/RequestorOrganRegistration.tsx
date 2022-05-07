import { connect } from "react-redux";
import React, { useState } from "react";
import { Contract } from "web3-eth-contract";

import { Button, Modal, Select, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { handleRPCError } from "../utils/handleError";

interface props {
    contract: Contract | null;
    organs: Array<Organs>;
    requestor: Requestor;
}

const RequestorOrganRegistration: React.FC<props> = ({ contract, organs, requestor }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [organId, setOrganId] = useState<string | null>("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        try {
            await contract?.methods
                .registerOrganForRequestor(requestor.id, Number(organId))
                .send({ from: accounts[0] });
            showNotification({
                title: "Success",
                message: "Successfully donate the organ",
            });
            setOrganId(null);
            setLoading(false);
        } catch (err: any) {
            showNotification({
                color: "red",
                title: "Error",
                message: handleRPCError(err).message,
            });
            setLoading(false);
        }
    };
    return (
        <>
            <Button onClick={() => setOpen(true)} size="xs">
                Request Organ
            </Button>
            <Modal
                opened={open}
                onClose={() => setOpen(false)}
                title={
                    "Organ request form id: " +
                    requestor.id +
                    " Name " +
                    requestor.fname +
                    " " +
                    requestor.lname
                }
            >
                {organs && (
                    <form onSubmit={handleSubmit}>
                        <Select
                            value={organId}
                            onChange={(val) => setOrganId(val)}
                            label="Choose the organ you wan to donate"
                            required
                            placeholder="Select an organ"
                            data={
                                [
                                    ...organs.map((item) => ({
                                        value: String(item.id),
                                        label: `${item.organ_name} (${item.valid_time} hr)`,
                                    })),
                                ] as Array<{ value: string; label: string }>
                            }
                        />
                        <Text my="md" color="orange">
                            The user details get from the contract you dont have to give
                        </Text>
                        <Button size="xs" loading={loading} type="submit">
                            Request
                        </Button>
                    </form>
                )}
            </Modal>
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    contract: state.contractReducer.contract,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RequestorOrganRegistration);
