pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract FormsApp{
	string public name;

	// Store forms...
	uint public formsCount;
	mapping(uint => Form) public forms;

	struct Form{
		uint id;
		string title;
		string description;
		uint timestamp;
		string endTime;
		address owner;
		string googleId;
		bool disabled;
		uint fieldsCount;
		// Field[] fields;
		mapping(uint => Field) fields;
		uint submissionsCount;
	}

	struct Field{
		uint id;
		string title;
	}
	
	event NewFormCreated(uint indexed id, string title, string description, uint timestamp, string endTime, address owner, string googleId, bool disabled, uint fieldsCount, Field[] fields, uint submissionsCount);

	constructor() public{
		name = "FormsApp";

		formsCount=0;
	}

	function createForm(string memory _title, string memory _description, string memory _endTime, string memory _googleId, bool _disabled, uint _fieldsCount, Field[] memory _fields) public {
		require(bytes(_title).length>0, "Form title is requried");
		require(bytes(_description).length>0, "Form description is requried");
		require(bytes(_endTime).length>0, "Form end time is requried");
		require(bytes(_googleId).length>0, "Owner's google id is requried");
		
		formsCount++;
		// Field[] fields;
		
		forms[formsCount] = Form(formsCount, _title, _description, block.timestamp, _endTime, msg.sender, _googleId, _disabled,  _fieldsCount, 0);

		for(uint i=1; i<=_fields.length; i++){
			forms[formsCount].fields[i] = _fields[i-1];
		}

		emit NewFormCreated(formsCount, _title, _description, block.timestamp, _endTime, msg.sender, _googleId, _disabled, _fieldsCount, _fields,  0);
	}
}