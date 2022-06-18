const DonationContract = artifacts.require("DonationContract");

const DATA = require("../data.json");

const Web3 = require("web3");

module.exports = async function (deployer, network, accounts) {
    // console.log(accounts);
    const toByte32 = (data) => {
        return Web3.utils.padRight(Web3.utils.asciiToHex(data), 64);
    };
    const toString = (byte) => {
        try {
            return Web3.utils.toUtf8(byte);
        } catch (e) {
            return Web3.utils.toAscii(byte);
        }
    };
    await deployer.deploy(
        DonationContract,
        toByte32("Soumen Khara"),
        toByte32("soumen@gmail.com"),
        toByte32("5589658954")
    );
    const contract = await DonationContract.deployed();
    let organs = await contract.contract.methods.getOrgans().call({ from: accounts[0] });
    organs = [
        ...organs.map((item) => ({
            organ_name: toString(item.organ_name),
            id: Number(item.id),
            valid_time: Number(item.valid_time),
        })),
    ];
    const admin = accounts[0];
    for (const [key, item] of Object.entries(DATA)) {
        const accountId = Number(key);
        const user = accounts[accountId];
        console.log("Creating User with Hospital: " + user);
        console.log("---------------------------------------------------------------------------");
        await contract.contract.methods
            .registerUser(
                [
                    "0x9332d7652828B818E5C0587b26c29e895CcB02BB",
                    toByte32(item.user.name),
                    toByte32(item.user.email),
                    toByte32(item.user.mobile),
                    toByte32(item.user.role),
                    false,
                    0,
                ],
                [
                    0,
                    toByte32(item.hospital.name),
                    toByte32(item.hospital.hospital_type),
                    toByte32(item.hospital.registration_number),
                    toByte32(item.hospital.address_line),
                    toByte32(item.hospital.state),
                    toByte32(item.hospital.district),
                    toByte32(item.hospital.town),
                    item.hospital.pincode,
                    toByte32(item.hospital.telephone),
                    toByte32(item.hospital.mobile),
                    toByte32(item.hospital.emergency_mobile),
                    toByte32(item.hospital.longitude),
                    toByte32(item.hospital.latitude),
                ]
            )
            .send({ from: user, gas: 6721975 });
        await contract.contract.methods.approveUser(user).send({ from: admin });
        console.log("  Creating donors for : " + user);
        const donors = item.donor;
        for (let i = 0; i < donors.length; i++) {
            const donor = donors[i];
            try {
                const dateArr = donor.dob.split("/");
                const dob = new Date(dateArr[2], dateArr[1], dateArr[0]);
                const don = await contract.contract.methods
                    .registerDoner([
                        donor.id,
                        toByte32(donor.fname),
                        toByte32(donor.lname),
                        toByte32(donor.email),
                        toByte32(String(dob.getTime())),
                        donor.mobile,
                        donor.uidai,
                        donor.age,
                        donor.weight,
                        donor.height,
                        donor.bmi,
                        toByte32(donor.blood_group),
                        toByte32(donor.gender),
                        toByte32(donor.address_line.slice(0, 30)),
                        toByte32(donor.state),
                        toByte32(donor.district),
                        toByte32(donor.postal_code),
                        toByte32(donor.demise),
                        donor.register_hospital_id,
                        donor.demise_hospital_id,
                    ])
                    .send({ from: user, gas: 6721975 });
                const donor_id = don.events.Register.returnValues._doner.id;
                console.log("    [create] Donor Id: " + donor_id);

                const donor_organs = donor.organs_pledged;
                for (let j = 0; j < donor_organs.length; j++) {
                    const organ_id = organs.filter((item) => item.organ_name === donor_organs[j])[0].id;
                    const oRes = await contract.contract.methods
                        .registerOrganForDoner(
                            donor_id,
                            organ_id,
                            organs.filter((item) => item.id === organ_id)[0].valid_time
                        )
                        .send({ from: user, gas: 6721975 });
                    const o_res_id = oRes.events.Register.returnValues._donerOrgans.id;
                    console.log(
                        `      [placed] Organ Placed for donor(${donor_id}): [${o_res_id}] ${donor_organs[j]}`
                    );
                }

                // donor demise
                const demise_id = [1, 2, 3, 4, 8, 10, 11];
                if (demise_id.includes(Number(donor_id))) {
                    await contract.contract.methods.donerDemise(donor_id).send({ from: user, gas: 6721975 });
                    console.log("    [demised] Donor Id: " + donor_id);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        console.log("  Creating requestors for : " + user);
        const requestors = item.requestor;
        for (let i = 0; i < requestors.length; i++) {
            const requestor = requestors[i];
            try {
                const dateArr = requestor.dob.split("/");
                const dob = new Date(dateArr[2], dateArr[1], dateArr[0]);
                const req = await contract.contract.methods
                    .registerRequestor([
                        requestor.id,
                        toByte32(requestor.fname),
                        toByte32(requestor.lname),
                        toByte32(requestor.gender),
                        toByte32(String(dob.getTime())),
                        requestor.age,
                        toByte32(requestor.email),
                        requestor.mobile,
                        requestor.uidai,
                        requestor.weight,
                        requestor.height,
                        requestor.bmi,
                        toByte32(requestor.blood_group),
                        toByte32(requestor.address_line.slice(0, 30)),
                        toByte32(requestor.state),
                        toByte32(requestor.district),
                        toByte32(requestor.postal_code),
                        requestor.register_hospital_id,
                    ])
                    .send({ from: user, gas: 6721975 });

                const requestor_id = req.events.Register.returnValues._requestor.id;
                console.log("   [create] Requestor Id: " + requestor_id);

                const requestor_organs = requestor.organRequest;
                for (let j = 0; j < requestor_organs.length; j++) {
                    const organ_id = organs.filter((item) => item.organ_name === requestor_organs[j])[0].id;
                    const oRes = await contract.contract.methods
                        .registerOrganForRequestor(requestor_id, organ_id)
                        .send({ from: user, gas: 6721975 });
                    const o_res_id = oRes.events.Register.returnValues._requestorOrgans.id;
                    console.log(
                        `     [request] Organ request for requestor(${requestor_id}): [${o_res_id}] ${requestor_organs[j]}`
                    );
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }
    const place_organs = [
        [6, 4, 3, 6],
        [7, 5, 4, 7],
    ];
    console.log("Organ transplant : ");
    console.log("---------------------------------------------------------------------------");
    for (let i = 0; i < place_organs.length; i++) {
        const o = place_organs[i];
        await contract.contract.methods
            .requestForOrgan(o[0], o[1], o[2], o[3])
            .send({ from: admin, gas: 6721975 });
        console.log("    Transplant: " + place_organs[i]);
    }
};
