const DonationContract = artifacts.require("DonationContract");

module.exports = function (deployer) {
    deployer.deploy(
        DonationContract,
        "Soumen",
        "ABC Road",
        "soumen@gmail.com",
        "9876543210"
    );
};
