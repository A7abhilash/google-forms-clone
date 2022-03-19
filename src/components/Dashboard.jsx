import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForms } from "../App";
import plus from "../plus.png";

function Dashboard() {
  const { formsAppContract, address } = useForms();

  const [forms, setForms] = useState([]);

  // TODO: Get user's-forms
  const getUserForms = async () => {
    try {
      let _forms = await formsAppContract.methods
        .getForms()
        .call({ from: address });
      console.log(_forms);
      setForms(_forms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserForms();
  }, []);

  return (
    <div className="row">
      <div className="col-md-4 m-2 m-md-0 p-2">
        <Link
          to="create-form"
          className="bg-light d-flex align-items-center justify-content-center shadow text-decoration-none text-dark"
          style={{ borderRadius: 15, height: "20vh" }}
        >
          <div className="d-block text-center p-3">
            <img
              src={plus}
              alt="Create Form"
              style={{ width: 50, height: 50, marginBottom: 10 }}
            />
            <h4>Create Form</h4>
          </div>
        </Link>
      </div>
      {forms.map((form, index) => (
        <div key={`Form-key-${index}`} className="col-md-4 m-2 m-md-0 p-2">
          <Link
            to={`/edit-form/${form.id}`}
            className="bg-light d-flex align-items-center justify-content-center shadow text-decoration-none text-dark"
            style={{ borderRadius: 15, height: "20vh" }}
          >
            <div className="d-block text-center p-3">
              <h6>{form.title}</h6>
              <p className="text-truncate">{form.description}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
