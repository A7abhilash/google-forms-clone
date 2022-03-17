import React, { useState } from "react";
import FieldsContainer from "./FieldsContainer";
import FormHeader from "./FormHeader";

function CreateForm() {
  const [fields, setFields] = useState([]);

  return (
    <div className="mt-5 row">
      <div className="col-md-7 bg-light p-2 mx-2 mx-md-auto">
        <div className="row">
          <div className="col-12 pb-2">
            <h4 className="text-center">Create Form</h4>
            <hr />
          </div>
          <FormHeader />
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
              <button className="btn btn-block btn-success">Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateForm;
