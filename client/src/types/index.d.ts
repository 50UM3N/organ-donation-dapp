interface Window {
    ethereum: any;
    web3: any;
}

interface RequestOrganList {
    id: number;
    donerId: number;
    requestorId: number;
    donerOrganId: number;
    requestorOrganId: number;
}

interface User {
    role: string;
    name: string;
    email: string;
    mobile: string;
    verified: boolean;
    hospital: null | Hospital;
}

interface Hospital {
    id: number;
    name: string;
    hospital_type: string;
    registration_number: string;
    address_line: string;
    state: string;
    district: string;
    town: string;
    pincode: number;
    telephone: string;
    mobile: string;
    emergency_mobile: string;
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
    register_hospital_id: number;
    demise_hospital_id: number;
    demise: boolean;
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
    register_hospital_id: number;
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
    matchOrgans: Array<DonerOrgans>;
}

interface Organs {
    id: number;
    valid_time: number;
    organ_name: string;
}
