import Web3 from "web3";
import donationArtifact from "../artifact/DonationContract.json";
import { AbiItem } from "web3-utils";

const provider = async () => {
    const { abi, networks } = donationArtifact;
    let web3 = null;
    if (window.ethereum)
        try {
            await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            web3 = new Web3(window.ethereum);
        } catch (e: any) {
            return { contract: null, accounts: null, web3: null, error: e };
        }
    else if (window.web3) web3 = new Web3(window.web3.currentProvider);
    else web3 = new Web3("http://127.0.0.1:9545/");
    const contract = new web3.eth.Contract(abi as AbiItem[], networks[5777].address);
    const accounts = await web3.eth.getAccounts();
    return { contract, accounts, web3, error: null };
};

export default provider;
