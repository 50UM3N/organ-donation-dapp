type Contract = import("web3-eth-contract").Contract | null;

interface ContractState {
    loading: boolean;
    error: null | string | object;
    contract: Contract;
}

type ThemeState = "dark" | "light";

type UserState = null | User;

interface Web3State {
    loading: boolean;
    error: null | string | object;
    web3: null | any;
}

type RootState = import("./../store").RootState;
