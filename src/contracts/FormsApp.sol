pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract FormsApp{
	string public name;

	// Store forms...
	mapping(address=>uint)	userFormCount;

	uint public formsCount;
	mapping(uint => Form) public forms;

	struct Form{
		uint id;
		string title;
		string description;
		uint timestamp;
		string endTime;
		address owner;
		bool allowResponse;
		uint fieldsCount;
		uint submissionsCount;
	}

	// Store fields
	
	mapping(uint => mapping(uint => Field)) public fields; // formId=>Field

	struct Field{
		uint id;
		string title;
		string[] options;
		string fieldType;
	}
	
	event NewFormCreated(uint indexed id, string title, string description, uint timestamp, string endTime, address owner, bool allowResponse, uint fieldsCount, Field[] fields, uint submissionsCount);

	constructor() public{
		name = "FormsApp";
		
		formsCount=0;
	}

	function createForm(string memory _title, string memory _description, string memory _endTime, bool _allowResponse, uint _fieldsCount, Field[] memory _fields) public {
		require(bytes(_title).length>0, "Form title is requried!");
		require(bytes(_description).length>0, "Form description is requried!");
		require(bytes(_endTime).length>0, "Form end time is requried!");
		require(_fields.length>0, "Form needs atleast one field!");
		
		formsCount++;
		userFormCount[msg.sender]++;
		// Field[] fields;
		
		forms[formsCount] = Form(formsCount, _title, _description, block.timestamp, _endTime, msg.sender, _allowResponse,  _fieldsCount, 0);

		for(uint i=1; i<=_fields.length; i++){
			// fields[formsCount][i] = _fields[i-1];
			string[] memory options = new string[](_fields[i-1].options.length);
			for(uint j=0; j<_fields[i-1].options.length; j++){
				options[j]=_fields[i-1].options[j];
			}
			fields[formsCount][i] = Field(_fields[i-1].id, _fields[i-1].title, options, _fields[i-1].fieldType);
		}

		emit NewFormCreated(formsCount, _title, _description, block.timestamp, _endTime, msg.sender, _allowResponse, _fieldsCount, _fields,  0);
	}

	function getForms() public view returns (Form[] memory){
		Form[] memory _forms = new Form[](userFormCount[msg.sender]);
		uint j=0;
		for(uint i=1; i<=formsCount; i++){
			if(forms[i].owner==msg.sender){
				_forms[j]=forms[i];
                j++;
			}
		}

		return _forms;
	}
}