const DonationContract = artifacts.require("DonationContract");

module.exports = function (deployer) {
    deployer.deploy(
        DonationContract,
        "0x536f756d656e",
        "0x5061727569204b616e63686120526f6164",
        "0x736f756d656e406761696c2e636f6d",
        "0x2b39312d3938373435363332313"
    );
};
