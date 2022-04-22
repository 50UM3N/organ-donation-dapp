// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DonationContract {
    address public owner = msg.sender;
    modifier restricted() {
        require(
            msg.sender == owner,
            "This function is restricted to the contract's owner"
        );
        _;
    }

    uint256 doner_id = 0;
    struct Doner {
        uint256 id;
        string fname;
        string lname;
        string email;
        uint256 dob;
        uint256 mobile;
        uint256 uidai;
        uint256 age;
        uint256 weight;
        uint256 height;
        uint256 bmi;
        string blood_group;
        string gender;
        string address_line;
        string state;
        string district;
        string postal_code;
    }

    uint256 organ_id = 0;
    struct Organ {
        uint256 id;
        uint256 doner_id; // Foreign Key to Primary Key in Doner
        string organ_name;
        string description;
        uint256 valid_time;
        string organ_condition;
        bool available;
    }

    uint256 requestor_id = 0;
    struct Requestor {
        uint256 id;
        string fname;
        string lname;
        string email;
        uint256 dob;
        uint256 mobile;
        uint256 uidai;
        uint256 age;
        uint256 weight;
        string gender;
        string address_line;
        uint256 height;
        uint256 bmi;
        string blood_group;
        string state;
    }

    uint256 requestor_hospital_id = 0;
    struct Requestor_hospital {
        uint256 requestor_id;
        uint256 id;
        string address_line;
        string city;
        string state;
        uint256 pincode;
    }

    uint256 requestor_organ_id = 0;
    struct Requestor_organ {
        uint256 requestor_id;
        uint256 requestor_hospital_id;
        uint256 organ_id;
        bool critical;
        uint256 request_raise_time;
    }

    address[] USER_IDX_ARR; // store the inserted address
    struct User {
        address id;
        string name;
        string user_address;
        string email;
        string mobile;
        string role;
        bool verified;
    }
    address admin;
    mapping(address => User) user_map;

    mapping(uint256 => Doner) doner_map; // For mapping the doner
    mapping(uint256 => Organ) organ_map; // For mapping the organs donated by the doner
    mapping(uint256 => Requestor) requestor_map; //For mapping the requestor
    mapping(uint256 => Requestor_hospital) requestor_hospital_map; //For mapping the requestor hospital
    mapping(uint256 => Requestor_organ) requestor_organ_map; //For mapping the requestor organ

    constructor(
        string memory name,
        string memory user_address,
        string memory email,
        string memory mobile
    ) {
        admin = msg.sender;
        User memory user = User(
            admin,
            name,
            user_address,
            email,
            mobile,
            "admin",
            true
        );
        userSet(admin, user);
    }

    event Register(User _user);
    event UserVerified(string _message);
    event Register(Doner _doner);
    event Register(Organ _organ);
    event Register(uint256 id, Requestor _requestor);
    event Register(uint256 id, Requestor_hospital _requestor_hospital);
    event Register(uint256 id, Requestor_organ _request_organ);

    function registerUser(User memory u) public {
        address user_address = msg.sender;
        u.role = "user";
        u.verified = false;
        User memory user = u;
        userSet(user_address, user);
        emit Register(user);
    }

    function approveUser(address _address) public restricted {
        User storage user = user_map[_address];
        user.verified = true;
        emit UserVerified("User update success");
    }

    // For registering the doner
    function registerDoner(Doner memory d) public {
        d.id = ++doner_id;
        Doner memory doner = d;
        addDoner(doner_id, doner);
        emit Register(doner);
    }

    // For registering the organ doner is donating
    function registerOrgan(Organ memory o) public {
        o.id = ++organ_id;
        o.doner_id = doner_id; // This is to map which doner donating which organ
        // last_donerID is o.doner_id
        Organ memory organ = o;
        addOrgan(organ_id, organ);
        emit Register(organ);
    }

    // For registering the request from requestor
    function registerRequestor(Requestor memory r) public {
        r.id = ++requestor_id;
        Requestor memory requestor = r;
        addRequestor(requestor_id, requestor);
        emit Register(requestor_id, requestor);
    }

    // For adding the requestor hospital details
    function registerRequestorHospital(Requestor_hospital memory rh) public {
        rh.id = ++requestor_hospital_id;
        rh.requestor_id = requestor_id;
        Requestor_hospital memory requestor_hospital = rh;
        addRequestorHospital(requestor_hospital_id, requestor_hospital);
        emit Register(requestor_hospital_id, requestor_hospital);
    }

    // For adding the requestor organs details
    function registerRequestorOrgans(Requestor_organ memory ro) public {
        ro.requestor_id = requestor_id;
        ro.requestor_hospital_id = requestor_hospital_id;
        ro.organ_id = ++requestor_organ_id;
        Requestor_organ memory request_organ = ro;
        addRequestOrgan(requestor_organ_id, request_organ);
        emit Register(requestor_organ_id, request_organ);
    }

    function getUser() public view returns (User memory) {
        return user_map[msg.sender];
    }

    function addUser(uint256 id, Doner memory doner) private {
        doner_map[id] = doner;
    }

    function addDoner(uint256 id, Doner memory doner) private {
        doner_map[id] = doner;
    }

    function addOrgan(uint256 id, Organ memory organ) private {
        organ_map[id] = organ;
    }

    function addRequestor(uint256 id, Requestor memory requestor) private {
        requestor_map[id] = requestor;
    }

    function addRequestorHospital(
        uint256 id,
        Requestor_hospital memory requestor_hospital
    ) private {
        requestor_hospital_map[id] = requestor_hospital;
    }

    function userSet(address key, User memory user) private {
        USER_IDX_ARR.push(key);
        user.id = key;
        user_map[key] = user;
    }

    function addRequestOrgan(uint256 id, Requestor_organ memory request_organ)
        private
    {
        requestor_organ_map[id] = request_organ;
    }

    function getUnverifiedUser()
        public
        view
        restricted
        returns (User[] memory)
    {
        uint256 counter = 0;

        for (uint256 i = 0; i < USER_IDX_ARR.length; i++) {
            User memory item = user_map[USER_IDX_ARR[i]];
            if (!item.verified) counter++;
        }

        User[] memory users = new User[](counter);
        uint256 j = 0;
        for (uint256 i = 0; i < USER_IDX_ARR.length; i++) {
            User memory item = user_map[USER_IDX_ARR[i]];
            if (!item.verified) {
                users[j] = item;
                j++;
            }
        }
        return users;
    }
}
