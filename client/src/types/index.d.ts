interface Window {
    ethereum: any;
    web3: any;
}

interface Doner {
    id: number;
    fname: string;
    lname: string;
    email: string;
    dob: string;
    mobile: string;
    age: string;
    weight: string;
    height: string;
    bmi: string;
    blood_group: string;
    gender: string;
    address_line: string;
    state: string;
    district: string;
    postal_code: string;
}

interface Requestor {
    id: number;
    fname: string;
    lname: string;
    email: string;
    dob: string;
    mobile: string;
    age: string;
    weight: string;
    height: string;
    bmi: string;
    blood_group: string;
    gender: string;
    address_line: string;
    state: string;
    district: string;
    postal_code: string;
}
interface DonerOrgans {
    id: number;
    available: boolean;
    organ_map_id: number;
    blood_group: string;
    doner_map_id: number;
    time: number;
    organ: string;
}

interface RequestorOrgans {
    id: number;
    transplanted: boolean;
    organ_map_id: number;
    blood_group: string;
    requestor_map_id: number;
    organ: string;
}

interface Organs {
    id: number;
    valid_time: number;
    organ_name: string;
}
