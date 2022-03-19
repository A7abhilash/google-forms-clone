import React, { useState } from "react";
import { useForms } from "../../App";
import FieldsContainer from "./FieldsContainer";
import FormHeader from "./FormHeader";

function CreateForm() {
  const { formsAppContract, address, getErrorMessage } = useForms();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endTime, setEndTime] = useState("");
  const [allowResponse, setAllowResponse] = useState(true);
  const [fields, setFields] = useState([]);

  const createForm = async () => {
    try {
      console.log(title);
      console.log(description);
      console.log(endTime);
      console.log(allowResponse);
      console.log(fields);

      formsAppContract.methods
        .createForm(
          title,
          description,
          new Date(endTime).getTime().toString(),
          allowResponse,
          fields.length,
          fields
        )
        .send({ from: address })
        .on("receipt", () => {
          alert("Successfully created new form...");
          window.location.replace("/forms/edit/1");
          // window.location.replace("/")
        });
    } catch (error) {
      console.log(error);
      // alert(getErrorMessage(error));
    }
  };

  return (
    <div className="mt-5 row">
      <div className="col-md-7 bg-light p-2 mx-2 mx-md-auto">
        <div className="row">
          <div className="col-12 pb-2">
            <h4 className="text-center">Create Form</h4>
            <hr />
          </div>
          <FormHeader
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            endTime={endTime}
            setEndTime={setEndTime}
            allowResponse={allowResponse}
            setAllowResponse={setAllowResponse}
          />
          <div className="col-12 mb-3">
            <h5>Fields</h5>
            <FieldsContainer fields={fields} setFields={setFields} />
            <hr />
            <div className="d-flex align-items-center justify-content-between">
              <button
                className="btn btn-outline-secondary"
                onClick={() => window.location.replace("/")}
              >
                Cancel
              </button>
              <button
                className="btn btn-block btn-success"
                onClick={createForm}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateForm;
