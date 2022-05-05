import Web3 from "web3";

export const toByte32 = (data: string): string => {
    return Web3.utils.padRight(Web3.utils.asciiToHex(data), 64);
};

export const toString = (byte: string): string => {
    try {
        return Web3.utils.toUtf8(byte);
    } catch (e) {
        return Web3.utils.toAscii(byte);
    }
};

export const utils = Web3.utils;
