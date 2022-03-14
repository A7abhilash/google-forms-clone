import React from "react";
import FormHeader from "./FormHeader";

function CreateForm() {
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateForm;
