// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Migrations {

    address public owner = msg.sender;
    uint public last_completed_migration;

    modifier restricted() {
        require(
            msg.sender == owner,
            "This function is restricted to the contract's owner"
        );
        _;
    }

  uint256 donor_id=0;
    struct Donor{
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
    
    uint256 organ_id=0;
    struct Organ{
        uint256 id;
        uint256 donor_id;   // Foreign Key to Primary Key in Donor
        string organ_name;
        string description;
        uint256 valid_time;
        string organ_condition;
        bool available;
    }

    uint256 requestor_id=0;
    struct Requestor{
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

    uint256 requestor_hospital_id=0;
    struct Requestor_hospital{
        uint256 requestor_id;
        uint256 id;
        string address_line;
        string city;
        string state;
        uint256 pincode;
    }

    uint256 requestor_organ_id=0;
    struct Requestor_organ{
        uint256 requestor_id;
        uint256 requestor_hospital_id;
        uint256 organ_id;
        bool critical;
        uint256 request_raise_time;
    }

    mapping(uint256 => Donor) donor_map;    // For mapping the donor
    mapping(uint256 => Organ) organ_map;    // For mapping the organs donated by the donor
    mapping(uint256 => Requestor) requestor_map;    //For mapping the requestor 
    mapping(uint256 => Requestor_hospital) requestor_hospital_map;    //For mapping the requestor hospital
    mapping(uint256 =>  Requestor_organ) requestor_organ_map;    //For mapping the requestor organ
    
    function add_donor(uint256 id, Donor memory donor) private {
        donor_map[id] = donor;
    }

    event Register(Donor _donor);

    // For registering the donor 
    function register_donor(Donor memory d) public {
        d.id = ++donor_id;
        Donor memory donor = Donor(d.id,
            d.fname,
            d.lname,
            d.email,
            d.dob,
            d.mobile,
            d.uidai,
            d.age,
            d.weight,
            d.gender,
            d.address_line,
            d.height,
            d.bmi,
            d.blood_group,
            d.state
        );
        // donor_id++;
        add_donor(donor_id, donor);
        emit Register(donor);
    }

    function add_organ(uint256 id, Organ memory organ) private {
        organ_map[id] = organ;
    }

    event Register(Organ _organ);

    // For registering the organ donor is donating
    function register_organ(Organ memory o) public {
        o.id = ++organ_id;
        o.donor_id = donor_id;  // This is to map which donor donating which organ
        // last_donorID is o.donor_id 
        Organ memory organ = Organ(o.id,
            o.donor_id,
            o.organ_name,
            o.description,
            o.valid_time,
            o.organ_condition,
            o.available
        );
        add_organ(organ_id, organ);
        emit Register(organ);
    }

    function add_requestor(uint256 id, Requestor memory requestor) private{
        requestor_map[id] = requestor;
    }

    event Register(uint256 id, Requestor _requestor);

    // For registering the request from requestor
    function register_requestor(Requestor memory r) public {
        r.id = ++requestor_id;
        Requestor memory requestor = Requestor(
            r.id,
            r.fname,
            r.lname,
            r.email,
            r.dob,
            r.mobile,
            r.uidai,
            r.age,
            r.weight,
            r.gender,
            r.address_line,
            r.height,
            r.bmi,
            r.blood_group,
            r.state
        );
        add_requestor(requestor_id, requestor);
        emit Register(requestor_id,requestor);
    }

    function add_requestor_hospital(uint256 id, Requestor_hospital memory requestor_hospital)private{
        requestor_hospital_map[id] = requestor_hospital;
    }

    event Register(uint256 id, Requestor_hospital _requestor_hospital);

    // For adding the requestor hospital details
    function register_requestor_hospital(Requestor_hospital memory rh) public{
        rh.id = ++requestor_hospital_id;
        rh.requestor_id = requestor_id;
        Requestor_hospital memory requestor_hospital = Requestor_hospital(
            rh.requestor_id,
            rh.id,
            rh.address_line,
            rh.city,
            rh.state,
            rh.pincode
        );
        add_requestor_hospital(requestor_hospital_id, requestor_hospital);
        emit Register(requestor_hospital_id, requestor_hospital);
    }

    function add_request_organ(uint256 id, Requestor_organ memory request_organ)private{
        requestor_organ_map[id] = request_organ;
    }

    event Register(uint256 id, Requestor_organ _request_organ);

    function register_requestor_organs(Requestor_organ memory ro) public{
        ro.requestor_id = requestor_id;
        ro.requestor_hospital_id = requestor_hospital_id;
        ro.organ_id = ++requestor_organ_id;
        Requestor_organ memory request_organ = Requestor_organ(
            ro.requestor_id,
            ro.requestor_hospital_id,
            ro.organ_id,
            ro.critical,
            ro.request_raise_time
        );
        add_request_organ(requestor_organ_id, request_organ);
        emit Register(requestor_organ_id, request_organ);
    }
  }
}
