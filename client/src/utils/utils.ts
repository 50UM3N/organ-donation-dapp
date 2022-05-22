import Web3 from "web3";

export const distanceCalculate = (hlongitude: any, hLatitude: any, rlongitude: any, rlatitude: any) => {
    const p = 0.017453292519943295; // Math.PI / 180
    const c = Math.cos;
    const a =
        0.5 -
        c((rlatitude - hLatitude) * p) / 2 +
        (c(hLatitude * p) * c(rlatitude * p) * (1 - c((rlongitude - hlongitude) * p))) / 2;
    const distance = 12742 * Math.asin(Math.sqrt(a));
    return (Math.round(distance / 2) * 10) / 60;
};

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
