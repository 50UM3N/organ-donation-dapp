// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DonationContract {
    address admin;
    modifier restricted() {
        require(msg.sender == admin, "This ");
        _;
    }
    modifier checkAvailable(uint256 _IDX) {
        require(_IDX > 0, "There");
        _;
    }

    // some return struct

    // requestorOrganMatch
    struct RequestMatchOrgans {
        RequestorOrgans requestorOrgans;
        DonerOrgans[] matchOrgans;
    }

    uint256 DONER_IDX = 0;
    struct Doner {
        uint256 id;
        bytes32 fname;
        bytes32 lname;
        bytes32 email;
        uint256 dob;
        uint256 mobile;
        uint256 uidai;
        uint256 age;
        uint256 weight;
        uint256 height;
        uint256 bmi;
        bytes32 blood_group;
        bytes32 gender;
        bytes32 address_line;
        bytes32 state;
        bytes32 district;
        bytes32 postal_code;
        bool demise;
        uint256 register_hospital_id;
        uint256 demise_hospital_id;
    }

    uint256 ORGAN_IDX = 0;
    struct Organ {
        uint256 id;
        bytes32 organ_name;
        uint256 valid_time; // time in minuts
    }

    uint256 ORGAN_REQUEST_IDX = 0;
    struct OrganRequest {
        uint256 id;
        uint256 requestor_organ_map_id;
        uint256 doner_organ_map_id;
        uint256 doner_map_id;
        uint256 requestor_map_id;
    }

    uint256 REQUESTOR_IDX = 0;
    struct Requestor {
        uint256 id;
        bytes32 fname;
        bytes32 lname;
        bytes32 gender;
        uint256 dob;
        uint256 age;
        bytes32 email;
        uint256 mobile;
        uint256 uidai;
        uint256 weight;
        uint256 height;
        uint256 bmi;
        bytes32 blood_group;
        bytes32 address_line;
        bytes32 state;
        bytes32 district;
        bytes32 postal_code;
        uint256 register_hospital_id;
    }

    address[] USER_IDX_ARR; // store the inserted address
    struct User {
        address id;
        bytes32 name;
        bytes32 email;
        bytes32 mobile;
        bytes32 role;
        bool verified;
        uint256 hospital_id;
    }

    uint256 DONER_ORGANS_IDX = 0;
    struct DonerOrgans {
        uint256 id;
        uint256 doner_map_id;
        uint256 organ_map_id;
        bytes32 blood_group;
        uint256 time;
        bool available;
    }

    uint256 REQUESTOR_ORGANS_IDX = 0;
    struct RequestorOrgans {
        uint256 id;
        uint256 requestor_map_id;
        uint256 organ_map_id;
        bytes32 blood_group;
        bool transplanted;
    }
    uint256 HOSPITAL_IDX = 0;
    struct Hospital {
        uint256 id;
        bytes32 name;
        bytes32 hospital_type; // private/ govt
        bytes32 registration_number; // alpha numeric nuumber like 52ADE2585SDW
        bytes32 address_line; // 32 charecter
        bytes32 state; // 32 charecter
        bytes32 district; // 32 charecter
        bytes32 town; // 32 charecter
        uint256 pincode; // 32 charecter
        bytes32 telephone; // 32 charecter
        bytes32 mobile; // 32 charecter
        bytes32 emergency_mobile; // 32 charecter
    }

    mapping(address => User) user_map;
    mapping(uint256 => Doner) doner_map; // For mapping the doner
    mapping(uint256 => Organ) organ_map; // For mapping the organs donated by the doner
    mapping(uint256 => Requestor) requestor_map; //For mapping the requestor
    mapping(uint256 => DonerOrgans) doner_organ_map; //
    mapping(uint256 => RequestorOrgans) requestor_organ_map; //
    mapping(uint256 => Hospital) hospital_map; //
    mapping(uint256 => OrganRequest) organ_request_map; //

    constructor(
        bytes32 name,
        bytes32 email,
        bytes32 mobile
    ) {
        admin = msg.sender;
        User memory user = User(admin, name, email, mobile, "admin", true, 0);
        organ_map[ORGAN_IDX + 1] = Organ(ORGAN_IDX + 1, "Lung", 4); //Lung
        ORGAN_IDX++;
        organ_map[ORGAN_IDX + 1] = Organ(ORGAN_IDX + 1, "Heart", 4); //Heart
        ORGAN_IDX++;
        organ_map[ORGAN_IDX + 1] = Organ(ORGAN_IDX + 1, "Liver", 24); // Liver
        ORGAN_IDX++;
        organ_map[ORGAN_IDX + 1] = Organ(ORGAN_IDX + 1, "Pancreas", 24); // Pancreas
        ORGAN_IDX++;
        organ_map[ORGAN_IDX + 1] = Organ(ORGAN_IDX + 1, "Kidney", 72); // Kidney
        ORGAN_IDX++;
        organ_map[ORGAN_IDX + 1] = Organ(ORGAN_IDX + 1, "Cornea", 14 * 24); // Cornea
        ORGAN_IDX++;
        organ_map[ORGAN_IDX + 1] = Organ(ORGAN_IDX + 1, "Bones", 5 * 365 * 24); // Bones
        ORGAN_IDX++;
        organ_map[ORGAN_IDX + 1] = Organ(ORGAN_IDX + 1, "Skin", 5 * 365 * 24); // Skin
        ORGAN_IDX++;
        organ_map[ORGAN_IDX + 1] = Organ(
            ORGAN_IDX + 1,
            "Heart Valves",
            10 * 365 * 24
        ); // Heart Valves
        ORGAN_IDX++;
        USER_IDX_ARR.push(admin);
        user.id = admin;
        user_map[admin] = user;
    }

    event Register(User _user, Hospital _hospital);
    event UserVerified(string _message);
    event Register(Doner _doner);
    event Register(Organ _organ);
    event Register(uint256 id, Requestor _requestor);
    event Register(DonerOrgans _donerOrgans);
    event Register(RequestorOrgans _requestorOrgans);

    /**
     * returns the list of organs from which organs are to be selected
     */
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

    /**
     * This function returns the matched organs which the requestor requested
     */
    function getRequestorOrgans(uint256 _id)
        public
        view
        returns (RequestMatchOrgans[] memory)
    {
        RequestMatchOrgans[]
            memory _requestMatchOrgans = new RequestMatchOrgans[](
                REQUESTOR_ORGANS_IDX
            );

        // lppoing trouth the organs that are for the particulart requestor
        uint256 j = 0;
        for (uint256 i = 1; i <= REQUESTOR_ORGANS_IDX; i++) {
            // check that the requestor organ id is equal to the requstoer id
            if (requestor_organ_map[i].requestor_map_id == _id) {
                // store the matched organ
                _requestMatchOrgans[j].requestorOrgans = requestor_organ_map[i];
                // find the matching organs that available for the requestor organ
                uint256 matchOrgansCount = 0; // count
                for (uint256 k = 1; k <= DONER_ORGANS_IDX; k++) {
                    if (doner_organ_map[k].available) {
                        if (
                            (doner_organ_map[k].organ_map_id ==
                                requestor_organ_map[i].organ_map_id) &&
                            memcmp(
                                doner_organ_map[k].blood_group,
                                requestor_organ_map[i].blood_group
                            )
                        ) matchOrgansCount++;
                    }
                }
                DonerOrgans[] memory matchOrgans = new DonerOrgans[](
                    matchOrgansCount
                );
                uint256 l = 0;
                for (uint256 k = 1; k <= DONER_ORGANS_IDX; k++) {
                    if (doner_organ_map[k].available) {
                        if (
                            (doner_organ_map[k].organ_map_id ==
                                requestor_organ_map[i].organ_map_id) &&
                            memcmp(
                                doner_organ_map[k].blood_group,
                                requestor_organ_map[i].blood_group
                            )
                        ) matchOrgans[l++] = doner_organ_map[k];
                    }
                }
                _requestMatchOrgans[j].matchOrgans = matchOrgans;
                j++;
            }
        }

        return _requestMatchOrgans;
    }

    /**
     * This function register the organ requested by the requestor
     */
    function registerOrganForRequestor(uint256 _requestor_id, uint256 _organ_id)
        public
    {
        REQUESTOR_ORGANS_IDX++;
        requestor_organ_map[REQUESTOR_ORGANS_IDX] = RequestorOrgans(
            REQUESTOR_ORGANS_IDX,
            _requestor_id,
            _organ_id,
            requestor_map[_requestor_id].blood_group,
            false
        );
        emit Register(requestor_organ_map[REQUESTOR_ORGANS_IDX]);
    }

    /**
     * returns an array of structure containing the Organs pledged by Doner
     */
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

    /**
     * This function register the organs pledged by Doners
     */
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

    /**
     * This function register the user
     * add the user in the map
     * also add the address in the USER_IDX_ARR
     */
    function registerUser(User memory _user, Hospital memory _hospital) public {
        address user_address = msg.sender;
        _user.role = "user";
        _user.verified = false;
        USER_IDX_ARR.push(user_address);
        _user.id = user_address;
        HOSPITAL_IDX++;
        _user.hospital_id = HOSPITAL_IDX;
        _hospital.id = HOSPITAL_IDX;
        hospital_map[HOSPITAL_IDX] = _hospital;
        user_map[user_address] = _user;
        emit Register(_user, _hospital);
    }

    /**
     * This function call will verify the user
     * user is identified by the address
     */
    function approveUser(address _address) public restricted {
        user_map[_address].verified = true;
        emit UserVerified("Voter update success");
    }

    /**
     * This function registers doners and adds it to the doner map
     */
    function registerDoner(Doner memory _doner) public {
        _doner.id = ++DONER_IDX;
        _doner.demise = false;
        _doner.register_hospital_id = user_map[msg.sender].hospital_id;
        _doner.demise_hospital_id = 0;
        doner_map[DONER_IDX] = _doner;
        emit Register(_doner);
    }

    /**
     * returns an array of structure containing all doner info
     */
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

    /**
     * returns doner info equal to the id
     */
    function getDonerById(uint256 id)
        public
        view
        checkAvailable(DONER_IDX)
        returns (
            Doner memory _doner,
            Hospital memory _request_hospital,
            Hospital memory _demise_hospital
        )
    {
        require(id <= DONER_IDX && id > 0, "Check the donor id !");
        _doner = doner_map[id];

        return (
            _doner,
            hospital_map[_doner.register_hospital_id],
            hospital_map[_doner.demise_hospital_id]
        );
    }

    /**
     * When the doner will die we will get the hospital id
     * Make the organ donated available
     */
    function donerDemise(uint256 doner_id) public {
        doner_map[doner_id].demise = true;
        doner_map[doner_id].demise_hospital_id = user_map[msg.sender]
            .hospital_id;
        for (uint256 i = 1; i <= DONER_ORGANS_IDX; i++) {
            if (doner_organ_map[i].doner_map_id == doner_id) {
                doner_organ_map[i].available = true;
            }
        }
    }

    /**
     * This function is for registering the Requestor
     */
    function registerRequestor(Requestor memory _requestor) public {
        _requestor.id = ++REQUESTOR_IDX;
        _requestor.register_hospital_id = user_map[msg.sender].hospital_id;
        requestor_map[REQUESTOR_IDX] = _requestor;
        emit Register(REQUESTOR_IDX, _requestor);
    }

    /**
     * returns an array of structure containing all requestor info
     */
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

    /**
     * returns requestor info equal to the specified id
     */
    function getRequestorById(uint256 id)
        public
        view
        checkAvailable(REQUESTOR_IDX)
        returns (Requestor memory _requestor, Hospital memory _request_hospital)
    {
        require(id <= REQUESTOR_IDX && id > 0, "Check the requestor id !");
        _requestor = requestor_map[id];
        return (_requestor, hospital_map[_requestor.register_hospital_id]);
    }

    event RequestForOrgan(OrganRequest _organ_request);

    function requestForOrgan(
        uint256 _requestor_organ_map_id,
        uint256 _doner_organ_map_id,
        uint256 _doner_map_id,
        uint256 _requestor_map_id
    ) public {
        require(doner_organ_map[_doner_organ_map_id].available, "Something");
        ORGAN_REQUEST_IDX++;
        organ_request_map[ORGAN_REQUEST_IDX].id = ORGAN_REQUEST_IDX;
        organ_request_map[ORGAN_REQUEST_IDX]
            .requestor_organ_map_id = _requestor_organ_map_id;
        organ_request_map[ORGAN_REQUEST_IDX]
            .doner_organ_map_id = _doner_organ_map_id;
        organ_request_map[ORGAN_REQUEST_IDX].doner_map_id = _doner_map_id;
        organ_request_map[ORGAN_REQUEST_IDX]
            .requestor_map_id = _requestor_map_id;

        doner_organ_map[_doner_organ_map_id].available = false;

        emit RequestForOrgan(organ_request_map[ORGAN_REQUEST_IDX]);
    }

    function getOrganRequestor()
        public
        view
        checkAvailable(ORGAN_REQUEST_IDX)
        returns (OrganRequest[] memory _organ_request)
    {
        uint256 j = 0;
        _organ_request = new OrganRequest[](ORGAN_REQUEST_IDX);
        for (uint256 i = 1; i <= ORGAN_REQUEST_IDX; i++) {
            _organ_request[j] = organ_request_map[i];
            j++;
        }
        return _organ_request;
    }

    function transplanted(uint256 _requestor_organ_map_id) public {
        requestor_organ_map[_requestor_organ_map_id].transplanted = true;
    }

    /**
     * This function return the current login user by its address
     */
    function getUser()
        public
        view
        returns (User memory user, Hospital memory hospital)
    {
        user = user_map[msg.sender];
        hospital = hospital_map[user.hospital_id];
        return (user, hospital);
    }

    /**
     * This function returns the unverified user
     * user is agency or hospial
     */
    function getUnverifiedUser()
        public
        view
        restricted
        returns (User[] memory users, Hospital[] memory hospitals)
    {
        uint256 counter = 0;

        for (uint256 i = 0; i < USER_IDX_ARR.length; i++) {
            User memory item = user_map[USER_IDX_ARR[i]];
            if (!item.verified) counter++;
        }

        users = new User[](counter);
        hospitals = new Hospital[](counter);
        uint256 j = 0;
        for (uint256 i = 0; i < USER_IDX_ARR.length; i++) {
            User memory item = user_map[USER_IDX_ARR[i]];
            if (!item.verified) {
                users[j] = item;
                hospitals[j] = hospital_map[item.hospital_id];
                j++;
            }
        }
        return (users, hospitals);
    }

    function memcmp(bytes32 a, bytes32 b) internal pure returns (bool) {
        return (a.length == b.length) && (a == b);
    }
}
