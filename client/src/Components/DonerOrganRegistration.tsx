import { Button, Modal, Select, Text } from "@mantine/core";
import React, { useState } from "react";
import { connect } from "react-redux";

import { Contract } from "web3-eth-contract";
import { handleRPCError } from "../utils/handleError";
import { showNotification } from "@mantine/notifications";

interface props {
    donerId: number;
    contract: Contract | null;
    organs: Array<Organs>;
    doner: Doner;
}

const DonerOrganRegistration: React.FC<props> = ({ donerId, contract, organs, doner }) => {
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
                .registerOrganForDoner(
                    doner.id,
                    Number(organId),
                    organs.filter((item) => item.id === Number(organId))[0].valid_time
                )
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
                Pledge Organ
            </Button>
            <Modal
                opened={open}
                onClose={() => setOpen(false)}
                title={"Organ donation form id: " + doner.id + " Name " + doner.fname + " " + doner.lname}
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
                            Donate
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
export default connect(mapStateToProps, mapDispatchToProps)(DonerOrganRegistration);
