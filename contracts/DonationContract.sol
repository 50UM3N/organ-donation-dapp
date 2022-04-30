// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DonationContract {
    address admin;
    modifier restricted() {
        require(
            msg.sender == admin,
            "This function is restricted to the contract's owner"
        );
        _;
    }
    modifier checkAvailable(uint256 _IDX) {
        require(_IDX > 0, "There is no data available");
        _;
    }

    uint256 DONER_IDX = 0;
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

    uint256 ORGAN_IDX = 0;
    struct Organ {
        uint256 id;
        string organ_name;
        uint256 valid_time; // time in minuts
    }

    uint256 REQUESTOR_IDX = 0;
    struct Requestor {
        uint256 id;
        string fname;
        string lname;
        string gender;
        uint256 dob;
        uint256 age;
        string email;
        uint256 mobile;
        uint256 uidai;
        uint256 weight;
        uint256 height;
        uint256 bmi;
        string blood_group;
        string address_line;
        string state;
        string district;
        string postal_code;
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

    uint256 DONER_ORGANS_IDX = 0;
    struct DonerOrgans {
        uint256 id;
        uint256 doner_map_id;
        uint256 organ_map_id;
        string blood_group;
        uint256 time;
        bool available;
    }

    uint256 REQUESTOR_ORGANS_IDX = 0;
    struct RequestorOrgans {
        uint256 id;
        uint256 requestor_map_id;
        uint256 organ_map_id;
        string blood_group;
        bool transplanted;
    }

    mapping(address => User) user_map;
    mapping(uint256 => Doner) doner_map; // For mapping the doner
    mapping(uint256 => Organ) organ_map; // For mapping the organs donated by the doner
    mapping(uint256 => Requestor) requestor_map; //For mapping the requestor
    mapping(uint256 => DonerOrgans) doner_organ_map;
    mapping(uint256 => RequestorOrgans) requestor_organ_map;

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
        organ_map[ORGAN_IDX + 1] = Organ(ORGAN_IDX + 1, "Lung", 4);
        ORGAN_IDX++;
        organ_map[ORGAN_IDX + 1] = Organ(ORGAN_IDX + 1, "Heart", 4);
        ORGAN_IDX++;
        organ_map[ORGAN_IDX + 1] = Organ(ORGAN_IDX + 1, "Liver", 24);
        ORGAN_IDX++;
        organ_map[ORGAN_IDX + 1] = Organ(ORGAN_IDX + 1, "Pancreas", 24);
        ORGAN_IDX++;
        organ_map[ORGAN_IDX + 1] = Organ(ORGAN_IDX + 1, "Kidney", 72);
        ORGAN_IDX++;
        organ_map[ORGAN_IDX + 1] = Organ(ORGAN_IDX + 1, "Cornea", 14 * 24);
        ORGAN_IDX++;
        organ_map[ORGAN_IDX + 1] = Organ(ORGAN_IDX + 1, "Bones", 5 * 365 * 24);
        ORGAN_IDX++;
        organ_map[ORGAN_IDX + 1] = Organ(ORGAN_IDX + 1, "Skin", 5 * 365 * 24);
        ORGAN_IDX++;
        organ_map[ORGAN_IDX + 1] = Organ(
            ORGAN_IDX + 1,
            "Heart Valves",
            10 * 365 * 24
        );
        ORGAN_IDX++;
        userSet(admin, user);
    }

    event Register(User _user);
    event UserVerified(string _message);
    event Register(Doner _doner);
    event Register(Organ _organ);
    event Register(uint256 id, Requestor _requestor);
    event Register(DonerOrgans _donerOrgans);
    event Register(RequestorOrgans _requestorOrgans);

    // This function return the organs this is the organ that to be seleted
    function getOrgans()
        public
        view
        checkAvailable(ORGAN_IDX)
        returns (Organ[] memory)
    {
        Organ[] memory organs = new Organ[](ORGAN_IDX);
        uint256 j = 0;
        for (uint256 i = 1; i <= ORGAN_IDX; i++) organs[j++] = organ_map[i];
        return organs;
    }

    // this function returns the organs that the requestor is request
    function getRequestorOrgans(uint256 _id)
        public
        view
        returns (RequestorOrgans[] memory)
    {
        RequestorOrgans[] memory _requestororgans = new RequestorOrgans[](
            REQUESTOR_ORGANS_IDX
        );
        uint256 j = 0;
        for (uint256 i = 1; i <= REQUESTOR_ORGANS_IDX; i++) {
            if (requestor_organ_map[i].requestor_map_id == _id)
                _requestororgans[j++] = requestor_organ_map[i];
        }

        return _requestororgans;
    }

    // this function pleaze the organ for the a doner
    function registerOrganForRequestor(uint256 _requestor_id, uint256 _organ_id)
        public
    {
        requestor_organ_map[REQUESTOR_ORGANS_IDX + 1] = RequestorOrgans(
            REQUESTOR_ORGANS_IDX + 1,
            _requestor_id,
            _organ_id,
            requestor_map[_requestor_id].blood_group,
            false
        );
        REQUESTOR_ORGANS_IDX++;
        emit Register(requestor_organ_map[REQUESTOR_ORGANS_IDX]);
    }

    // this function returns the organs that the doner is pleazed
    function getDonerOrgans(uint256 _id)
        public
        view
        returns (DonerOrgans[] memory)
    {
        DonerOrgans[] memory _donerorgans = new DonerOrgans[](DONER_ORGANS_IDX);
        uint256 j = 0;
        for (uint256 i = 1; i <= DONER_ORGANS_IDX; i++) {
            if (doner_organ_map[i].doner_map_id == _id)
                _donerorgans[j++] = doner_organ_map[i];
        }
        return _donerorgans;
    }

    // this function pleaze the organ for the a doner
    function registerOrganForDoner(
        uint256 _doner_id,
        uint256 _organ_id,
        uint256 _time
    ) public {
        doner_organ_map[DONER_ORGANS_IDX + 1] = DonerOrgans(
            DONER_ORGANS_IDX + 1,
            _doner_id,
            _organ_id,
            doner_map[_doner_id].blood_group,
            _time,
            false
        );
        DONER_ORGANS_IDX++;
        emit Register(doner_organ_map[DONER_ORGANS_IDX]);
    }

    // This function register the user
    function registerUser(User memory _user) public {
        address user_address = msg.sender;
        _user.role = "user";
        _user.verified = false;
        User memory user = _user;
        userSet(user_address, user);
        emit Register(user);
    }

    //  This function1 set the user in the map
    function userSet(address key, User memory user) private {
        USER_IDX_ARR.push(key);
        user.id = key;
        user_map[key] = user;
    }

    // this function approved the user
    function approveUser(address _address) public restricted {
        User storage user = user_map[_address];
        user.verified = true;
        emit UserVerified("Voter update success");
    }

    // For registering the doner
    function registerDoner(Doner memory _doner) public {
        _doner.id = ++DONER_IDX;
        Doner memory doner = _doner;
        addDoner(DONER_IDX, doner);
        emit Register(doner);
    }

    // This function add the doner in the map
    function addDoner(uint256 id, Doner memory doner) private {
        doner_map[id] = doner;
    }

    // this functon return the doner list
    function getDoner()
        public
        view
        checkAvailable(DONER_IDX)
        returns (Doner[] memory)
    {
        Doner[] memory doner = new Doner[](DONER_IDX);
        uint256 j = 0;
        for (uint256 i = 1; i <= DONER_IDX; i++) doner[j++] = doner_map[i];
        return doner;
    }

    // return doner by the id
    function getDonerById(uint256 id)
        public
        view
        checkAvailable(DONER_IDX)
        returns (Doner memory)
    {
        require(id <= DONER_IDX && id > 0, "Check the donor id !");
        Doner memory doner = doner_map[id];
        return doner;
    }

    // For registering the request from requestor
    function registerRequestor(Requestor memory _requestor) public {
        _requestor.id = ++REQUESTOR_IDX;
        Requestor memory requestor = _requestor;
        addRequestor(REQUESTOR_IDX, requestor);
        emit Register(REQUESTOR_IDX, requestor);
    }

    // This function add the requestor in the map
    function addRequestor(uint256 id, Requestor memory requestor) private {
        requestor_map[id] = requestor;
    }

    // This function return all the requestor
    function getRequestor()
        public
        view
        checkAvailable(REQUESTOR_IDX)
        returns (Requestor[] memory)
    {
        Requestor[] memory requestor = new Requestor[](REQUESTOR_IDX);
        uint256 j = 0;
        for (uint256 i = 1; i <= REQUESTOR_IDX; i++)
            requestor[j++] = requestor_map[i];
        return requestor;
    }

    // this function return requestor by it's id
    function getRequestorById(uint256 id)
        public
        view
        checkAvailable(REQUESTOR_IDX)
        returns (Requestor memory)
    {
        require(id <= REQUESTOR_IDX && id > 0, "Check the requestor id !");
        Requestor memory requestor = requestor_map[id];
        return requestor;
    }

    //  This function return the current login user by its address
    function getUser() public view returns (User memory) {
        return user_map[msg.sender];
    }

    // This function returns the unverifid user i.e agency or hospial
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
