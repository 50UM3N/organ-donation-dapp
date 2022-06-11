// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DonationContract {
    address admin;

    // Restricted for only admin
    modifier restricted() {
        require(msg.sender == admin);
        _;
    }

    // This modifier check that the the mapping has any key value or not
    modifier checkAvailable(uint256 _IDX) {
        require(_IDX > 0);
        _;
    }

    // Contains all the organs with it's name and time
    uint256 ORGAN_IDX = 0;
    struct Organ {
        uint256 id; // id
        bytes32 organ_name; // Organ name i.e Kidney, Liver
        uint256 valid_time; // Organ Available time in minuts
    }

    // This structure is for the requestor helps to display the organ that maps to the corresponding
    struct RequestMatchOrgans {
        RequestorOrgans requestorOrgans;
        DonerOrgans[] matchOrgans;
        Hospital[] matchHospital;
    }

    // contains all the organ that place by a doner and match by a requestor i.e organ placed table
    // This map helps that a requesto conform a request for a matched organ
    uint256 ORGAN_REQUEST_IDX = 0;
    struct OrganRequest {
        uint256 id; // id
        uint256 requestor_organ_map_id; // The organs id that a request request
        uint256 doner_organ_map_id; // The organ id that a doner donate
        uint256 doner_map_id; // The doner id
        uint256 requestor_map_id; // The requestor id
    }

    // Actual doner map/ table
    // All the table has a idx that helps as a id of each data
    // the idx is a incremental variable never decrement or duplicate
    uint256 DONER_IDX = 0;
    struct Doner {
        uint256 id;
        bytes32 fname;
        bytes32 lname;
        bytes32 email;
        bytes32 dob;
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

    // The organs that a doner donate
    uint256 DONER_ORGANS_IDX = 0;
    struct DonerOrgans {
        uint256 id;
        uint256 doner_map_id;
        uint256 organ_map_id;
        bytes32 blood_group;
        uint256 time;
        bool available;
    }

    // Requestor structure
    uint256 REQUESTOR_IDX = 0;
    struct Requestor {
        uint256 id;
        bytes32 fname;
        bytes32 lname;
        bytes32 gender;
        bytes32 dob;
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

    // the organs that a requestor request
    uint256 REQUESTOR_ORGANS_IDX = 0;
    struct RequestorOrgans {
        uint256 id;
        uint256 requestor_map_id;
        uint256 organ_map_id;
        bytes32 blood_group;
        bool transplanted;
    }

    // This is the user structure that contains all the user and also admin with it's role
    // if the user is admin that there is no connection for hospital otherwise the user id
    // will store in the hospital map
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

    // The hospital containing all the hospital data
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
        bytes32 longitude; // 32 charecter later converted into flote
        bytes32 latitude; // 32 charecter later converted into flote
    }

    mapping(address => User) user_map; // actual user map
    mapping(uint256 => Doner) doner_map; // For mapping the doner function : getDoner
    mapping(uint256 => Organ) organ_map; // All organs that are donatable function : getOrgans
    mapping(uint256 => Requestor) requestor_map; // For mapping the requestor function : getRequestor
    mapping(uint256 => DonerOrgans) doner_organ_map; // All the organs that a doner donetes function : getDonerOrgans
    mapping(uint256 => RequestorOrgans) requestor_organ_map; // All the organs that a requestor requests function : getRequestorOrgans
    mapping(uint256 => Hospital) hospital_map; // All the hospitals function : getHospitals
    mapping(uint256 => OrganRequest) organ_request_map; // all the requested placed organs function : getOrganRequestor

    /**
     |------------------------------------------------------------------------------------------------
     | This is the constructor that run only when the a user deploy the contract this constructor 
     | take sone parameters that are,  
     | @param name name of the admin
     | @param email email of the admin
     | @param mobile mobile number of the admin 
     | All the paremetes are bytes32 if pass string not work
     |------------------------------------------------------------------------------------------------
    */
    constructor(
        bytes32 name,
        bytes32 email,
        bytes32 mobile
    ) {
        admin = msg.sender;
        User memory user = User(admin, name, email, mobile, "admin", true, 0);
        // creating all the pre defined organs and its lifespan
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
        organ_map[ORGAN_IDX + 1] = Organ(ORGAN_IDX + 1, "Heart Valves", 10 * 365 * 24);
        ORGAN_IDX++;
        USER_IDX_ARR.push(admin);
        user.id = admin;
        user_map[admin] = user;
    }

    event Register(User _user, Hospital _hospital);
    event Register(Doner _doner);
    event Register(Organ _organ);
    event Register(uint256 id, Requestor _requestor);
    event Register(DonerOrgans _donerOrgans);
    event Register(RequestorOrgans _requestorOrgans);
    event UserVerified(address _address);
    event DonerDemise(
        uint256[] _hospitals,
        uint256[] _users,
        Hospital[] _matchedHospitals,
        Organ[] _matchedOrgans
    );
    event RequestForOrgan(OrganRequest _organ_request);

    /**
     |------------------------------------------------------------------------------------------------
     | Helps to get all the hospitals and returns an array
     | @return _hospital array of hospitals
     |------------------------------------------------------------------------------------------------
    */

    function getHospitals() public view returns (Hospital[] memory _hospital) {
        _hospital = new Hospital[](HOSPITAL_IDX);
        uint256 j = 0;
        for (uint256 i = 1; i <= HOSPITAL_IDX; i++) _hospital[j++] = hospital_map[i];
        return _hospital;
    }

    /**
     |------------------------------------------------------------------------------------------------
     | Helps to get all the prelisted organs and requrns an array
     | @return organs array of prelisted organs
     |------------------------------------------------------------------------------------------------
     */
    function getOrgans() public view checkAvailable(ORGAN_IDX) returns (Organ[] memory) {
        Organ[] memory organs = new Organ[](ORGAN_IDX);
        uint256 j = 0;
        for (uint256 i = 1; i <= ORGAN_IDX; i++) organs[j++] = organ_map[i];
        return organs;
    }

    /**
     |------------------------------------------------------------------------------------------------
     | Helps to find the organs that match to a requestor with the doner with all the conditions
     | for the particular doner. This function takes two parameters
     | @param _id The id of the requestor
     | @param _add The address 
     | @return _requestMatchOrgans all the match organs array 
     |------------------------------------------------------------------------------------------------
     */
    function getRequestorOrgans(uint256 _id, address _add) public view returns (RequestMatchOrgans[] memory) {
        uint256 counter = 0;
        for (uint256 i = 1; i <= REQUESTOR_ORGANS_IDX; i++) {
            // 1 check that the requestor is belong to the hospital that register
            // 2 check that the requesot id is equal
            if (
                (requestor_map[requestor_organ_map[i].requestor_map_id].register_hospital_id ==
                    user_map[_add].hospital_id) && (requestor_organ_map[i].requestor_map_id == _id)
            ) {
                counter++;
            }
        }
        RequestMatchOrgans[] memory _requestMatchOrgans = new RequestMatchOrgans[](counter);

        // looping through the organs that are for the particular requestor
        uint256 j = 0;
        for (uint256 i = 1; i <= REQUESTOR_ORGANS_IDX; i++) {
            // check that the requestor organ id is equal to the requstoer id
            if (
                (requestor_map[requestor_organ_map[i].requestor_map_id].register_hospital_id ==
                    user_map[_add].hospital_id) && (requestor_organ_map[i].requestor_map_id == _id)
            ) {
                // store the matched organ
                _requestMatchOrgans[j].requestorOrgans = requestor_organ_map[i];
                // find the matching organs that available for the requestor organ
                uint256 matchOrgansCount = 0; // count
                for (uint256 k = 1; k <= DONER_ORGANS_IDX; k++) {
                    // checking the organ is available
                    if (doner_organ_map[k].available) {
                        // mathc for the compatibilaty
                        if (
                            (doner_organ_map[k].organ_map_id == requestor_organ_map[i].organ_map_id) &&
                            memcmp(doner_organ_map[k].blood_group, requestor_organ_map[i].blood_group)
                        ) matchOrgansCount++;
                    }
                }
                DonerOrgans[] memory matchOrgans = new DonerOrgans[](matchOrgansCount);
                Hospital[] memory matchHospitals = new Hospital[](matchOrgansCount);
                // checking the orgns matched or not
                uint256 l = 0;
                for (uint256 k = 1; k <= DONER_ORGANS_IDX; k++) {
                    // checking the organ is available
                    if (doner_organ_map[k].available) {
                        // mathc for the compatibilaty
                        if (
                            (doner_organ_map[k].organ_map_id == requestor_organ_map[i].organ_map_id) &&
                            memcmp(doner_organ_map[k].blood_group, requestor_organ_map[i].blood_group)
                        ) {
                            matchOrgans[l] = doner_organ_map[k];
                            matchHospitals[l] = hospital_map[
                                doner_map[doner_organ_map[k].doner_map_id].demise_hospital_id
                            ];
                            l++;
                        }
                    }
                }
                _requestMatchOrgans[j].matchOrgans = matchOrgans;
                _requestMatchOrgans[j].matchHospital = matchHospitals;
                j++;
            }
        }

        return _requestMatchOrgans;
    }

    /**
     |------------------------------------------------------------------------------------------------
     | Helps to get all the requestor organs for report
     | @return _requestororgans all the match organs array 
     |------------------------------------------------------------------------------------------------
     */
    function getRequestorOrgans() public view returns (RequestorOrgans[] memory) {
        uint256 j = 0;
        RequestorOrgans[] memory _requestororgans = new RequestorOrgans[](REQUESTOR_ORGANS_IDX);
        for (uint256 i = 1; i <= REQUESTOR_ORGANS_IDX; i++) {
            _requestororgans[j++] = requestor_organ_map[i];
        }
        return _requestororgans;
    }

    /**
     |------------------------------------------------------------------------------------------------
     | Helps to register a organ that a requestor want
     | @param _requestor_id requestor map id
     | @param _organ_id organ id
     | This function emit a event and this event catch by the browser
     |------------------------------------------------------------------------------------------------
     */
    function registerOrganForRequestor(uint256 _requestor_id, uint256 _organ_id) public {
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
     |------------------------------------------------------------------------------------------------
     |  Helps to get the doner organs for a particular doner
     |  @param _id doner id
     |  @return _donerorgans array of doner organs
     |------------------------------------------------------------------------------------------------
     */
    function getDonerOrgans(uint256 _id) public view returns (DonerOrgans[] memory) {
        uint256 j = 0;
        uint256 counter = 0;
        for (uint256 i = 1; i <= DONER_ORGANS_IDX; i++) {
            if (doner_organ_map[i].doner_map_id == _id) counter++;
        }
        DonerOrgans[] memory _donerorgans = new DonerOrgans[](counter);
        for (uint256 i = 1; i <= DONER_ORGANS_IDX; i++) {
            if (doner_organ_map[i].doner_map_id == _id) _donerorgans[j++] = doner_organ_map[i];
        }
        return _donerorgans;
    }

    /**
     |------------------------------------------------------------------------------------------------
     |  Helps to get all the doner organs for report
     |  @return _donerorgans array of doner organs
     |------------------------------------------------------------------------------------------------
     */
    function getDonerOrgans() public view returns (DonerOrgans[] memory) {
        uint256 j = 0;
        DonerOrgans[] memory _donerorgans = new DonerOrgans[](DONER_ORGANS_IDX);
        for (uint256 i = 1; i <= DONER_ORGANS_IDX; i++) {
            _donerorgans[j++] = doner_organ_map[i];
        }
        return _donerorgans;
    }

    /**
     |------------------------------------------------------------------------------------------------
     | Helps to register a organ for the requestor
     | @param _doner_id doner map id
     | @param _organ_id organ map id
     | @param _time time in minute
     | Fires an event 
     |------------------------------------------------------------------------------------------------
     */
    function registerOrganForDoner(
        uint256 _doner_id,
        uint256 _organ_id,
        uint256 _time
    ) public {
        DONER_ORGANS_IDX++;
        doner_organ_map[DONER_ORGANS_IDX] = DonerOrgans(
            DONER_ORGANS_IDX,
            _doner_id,
            _organ_id,
            doner_map[_doner_id].blood_group,
            _time,
            false
        );

        emit Register(doner_organ_map[DONER_ORGANS_IDX]);
    }

    /**
     |------------------------------------------------------------------------------------------------
     | Helps to register an user with its hsopital address, it also store the user and the hospital 
     | in the map and store the user address in the hospital to reference the user
     | @param _user user structure
     | @param _hospital hospital structure
     | Fires an event
     |------------------------------------------------------------------------------------------------
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
     |------------------------------------------------------------------------------------------------
     | Helps to approved the user i.d set the verified flag to true for a user/hospital
     | @param _address addredd of the user
     | Fires an event helps to notify the verified user
     |------------------------------------------------------------------------------------------------
     */
    function approveUser(address _address) public restricted {
        user_map[_address].verified = true;
        emit UserVerified(_address);
    }

    /**
     |------------------------------------------------------------------------------------------------
     | Helps to register an doner 
     | @param _doner doner structure
     | Fires an event that help to return the doner id
     |------------------------------------------------------------------------------------------------
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
     |------------------------------------------------------------------------------------------------
     | Helps to ge all the doner available
     | @return doner array of doners
     |------------------------------------------------------------------------------------------------
     */
    function getDoner() public view checkAvailable(DONER_IDX) returns (Doner[] memory) {
        Doner[] memory doner = new Doner[](DONER_IDX);
        uint256 j = 0;
        for (uint256 i = 1; i <= DONER_IDX; i++) doner[j++] = doner_map[i];
        return doner;
    }

    /**
     |------------------------------------------------------------------------------------------------
     | Helps to get a doner information by it's id
     | @param id doner id
     | return _doner, register_hospital, demise_hospital
     |------------------------------------------------------------------------------------------------
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

        return (_doner, hospital_map[_doner.register_hospital_id], hospital_map[_doner.demise_hospital_id]);
    }

    /**
     |------------------------------------------------------------------------------------------------
     | When a doner demise then this helps to register it's demise hospital and add the avilable to 
     | for all organ.
     | @param doner_id doner map id
     | Fires an event that notify the matched hospital that organs is availeble
     |------------------------------------------------------------------------------------------------
     */
    function donerDemise(uint256 doner_id) public {
        // set that the doner is demise
        doner_map[doner_id].demise = true;
        doner_map[doner_id].demise_hospital_id = user_map[msg.sender].hospital_id;
        // set all organs availavle to true
        for (uint256 i = 1; i <= DONER_ORGANS_IDX; i++) {
            if (doner_organ_map[i].doner_map_id == doner_id) {
                doner_organ_map[i].available = true;
            }
        }
        // getting the count of matched hospitals
        uint256 counter = 0;
        for (uint256 i = 1; i <= REQUESTOR_ORGANS_IDX; i++) {
            for (uint256 k = 1; k <= DONER_ORGANS_IDX; k++) {
                if (doner_organ_map[k].doner_map_id == doner_id) {
                    if (
                        (doner_organ_map[k].organ_map_id == requestor_organ_map[i].organ_map_id) &&
                        memcmp(doner_organ_map[k].blood_group, requestor_organ_map[i].blood_group)
                    ) {
                        counter++;
                    }
                }
            }
        }
        // for matched hospitals id
        uint256[] memory _hospitals = new uint256[](counter);
        // matched user id
        uint256[] memory _users = new uint256[](counter);
        // matched hospital details
        Hospital[] memory _matchedHospitals = new Hospital[](counter);
        // matched organ details
        Organ[] memory _matchedOrgans = new Organ[](counter);

        // getting the match details
        uint256 j = 0;
        for (uint256 i = 1; i <= REQUESTOR_ORGANS_IDX; i++) {
            for (uint256 k = 1; k <= DONER_ORGANS_IDX; k++) {
                if (doner_organ_map[k].doner_map_id == doner_id) {
                    if (
                        (doner_organ_map[k].organ_map_id == requestor_organ_map[i].organ_map_id) &&
                        memcmp(doner_organ_map[k].blood_group, requestor_organ_map[i].blood_group)
                    ) {
                        _hospitals[j] = requestor_map[requestor_organ_map[i].requestor_map_id]
                            .register_hospital_id;
                        _users[j] = requestor_organ_map[i].requestor_map_id;
                        _matchedHospitals[j] = hospital_map[
                            doner_map[doner_organ_map[k].doner_map_id].demise_hospital_id
                        ];
                        _matchedOrgans[j] = organ_map[doner_organ_map[k].organ_map_id];
                        j++;
                    }
                }
            }
        }
        emit DonerDemise(_hospitals, _users, _matchedHospitals, _matchedOrgans);
    }

    /**
     |------------------------------------------------------------------------------------------------
     | Helps to register a requestor
     | @param _requestor requestor structure
     | Fires an event
     |------------------------------------------------------------------------------------------------
     */
    function registerRequestor(Requestor memory _requestor) public {
        _requestor.id = ++REQUESTOR_IDX;
        _requestor.register_hospital_id = user_map[msg.sender].hospital_id;
        requestor_map[REQUESTOR_IDX] = _requestor;
        emit Register(REQUESTOR_IDX, _requestor);
    }

    /**
     |------------------------------------------------------------------------------------------------
     |  Helps to get the requestor 
     |  @param _id requestor id
     |  @return requestor array of requestor 
     |------------------------------------------------------------------------------------------------
     */
    function getRequestor(address _id)
        public
        view
        checkAvailable(REQUESTOR_IDX)
        returns (Requestor[] memory)
    {
        // find the count that match the _id
        uint256 counter = 0;
        if (_id == admin) {
            counter = REQUESTOR_IDX;
        } else {
            for (uint256 i = 1; i <= REQUESTOR_IDX; i++) {
                Requestor memory _requestor = requestor_map[i];
                if (_requestor.register_hospital_id == user_map[_id].hospital_id) counter++;
            }
        }
        // getting the data
        Requestor[] memory requestor = new Requestor[](counter);
        uint256 j = 0;
        if (_id == admin) {
            for (uint256 i = 1; i <= REQUESTOR_IDX; i++) {
                requestor[j++] = requestor_map[i];
            }
        } else {
            for (uint256 i = 1; i <= REQUESTOR_IDX; i++) {
                Requestor memory _requestor = requestor_map[i];
                if (_requestor.register_hospital_id == user_map[_id].hospital_id) requestor[j++] = _requestor;
            }
        }
        return requestor;
    }

    /**
     |------------------------------------------------------------------------------------------------
     | Helps to get a requestor information by it's id
     | @param id requestor id
     | return _requestor, register_hospital
     |------------------------------------------------------------------------------------------------
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

    /**
     |------------------------------------------------------------------------------------------------
     | Helps to place the organ i.e place order the organ that availavle and matched the doner and the
     | requestor, this function take four parameters.
     | @param _requestor_organ_map_id requestor organ id
     | @param _doner_organ_map_id doner organ id
     | @param _doner_map_id doner id
     | @param _requestor_map_id requesor id
     | Fires an event that notify the doner hospital that a organ is placed
     |------------------------------------------------------------------------------------------------
     */

    function requestForOrgan(
        uint256 _requestor_organ_map_id,
        uint256 _doner_organ_map_id,
        uint256 _doner_map_id,
        uint256 _requestor_map_id
    ) public {
        require(doner_organ_map[_doner_organ_map_id].available);
        ORGAN_REQUEST_IDX++;
        organ_request_map[ORGAN_REQUEST_IDX].id = ORGAN_REQUEST_IDX;
        organ_request_map[ORGAN_REQUEST_IDX].requestor_organ_map_id = _requestor_organ_map_id;
        organ_request_map[ORGAN_REQUEST_IDX].doner_organ_map_id = _doner_organ_map_id;
        organ_request_map[ORGAN_REQUEST_IDX].doner_map_id = _doner_map_id;
        organ_request_map[ORGAN_REQUEST_IDX].requestor_map_id = _requestor_map_id;
        requestor_organ_map[_requestor_organ_map_id].transplanted = true;
        doner_organ_map[_doner_organ_map_id].available = false;

        emit RequestForOrgan(organ_request_map[ORGAN_REQUEST_IDX]);
    }

    /**
     |------------------------------------------------------------------------------------------------
     | Helps to get the all request that are placed
     | @return _organ_request all the requested organ
     |------------------------------------------------------------------------------------------------
     */

    function getOrganRequestor() public view returns (OrganRequest[] memory _organ_request) {
        uint256 j = 0;
        _organ_request = new OrganRequest[](ORGAN_REQUEST_IDX);
        for (uint256 i = 1; i <= ORGAN_REQUEST_IDX; i++) {
            _organ_request[j] = organ_request_map[i];
            j++;
        }
        return _organ_request;
    }

    /**
     |------------------------------------------------------------------------------------------------
     | Helps to change the status transplanted
     | @param _requestor_organ_map_id all the requested organ
     |------------------------------------------------------------------------------------------------
     */

    function transplanted(uint256 _requestor_organ_map_id) public {
        requestor_organ_map[_requestor_organ_map_id].transplanted = true;
    }

    /**
     |------------------------------------------------------------------------------------------------
     | Helps to get the user with the help of caller address
     | return user, hospital
     |------------------------------------------------------------------------------------------------
     */
    function getUser() public view returns (User memory user, Hospital memory hospital) {
        user = user_map[msg.sender];
        hospital = hospital_map[user.hospital_id];
        return (user, hospital);
    }

    /**
     |------------------------------------------------------------------------------------------------
     | Helps to get all the unverified user with it's hospital
     | return user, hospital array
     |------------------------------------------------------------------------------------------------
     */
    function getUnverifiedUser()
        public
        view
        restricted
        returns (User[] memory users, Hospital[] memory hospitals)
    {
        // find the count for the users
        uint256 counter = 0;
        for (uint256 i = 0; i < USER_IDX_ARR.length; i++) {
            User memory item = user_map[USER_IDX_ARR[i]];
            if (!item.verified) counter++;
        }
        // get the user
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

    /**
     |------------------------------------------------------------------------------------------------
     | Helps to compair two bye
     | @param a first byte
     | @param b second byte
     | @return boolean
     |------------------------------------------------------------------------------------------------
     */

    function memcmp(bytes32 a, bytes32 b) internal pure returns (bool) {
        return (a.length == b.length) && (a == b);
    }
}
