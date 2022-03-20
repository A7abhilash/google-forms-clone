import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useForms } from "../../App";
import Loading from "../../containers/Loading";
import CreateForm from "../create-form/CreateForm";

function EditForm() {
  const { id } = useParams();
  const { formsAppContract, address } = useForms();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(null);

  const getForm = async () => {
    setLoading(true);
    try {
      const _form = await formsAppContract.methods.forms(id).call();
      if (_form.id === "0") {
        alert("Invalid form...");
        window.location.replace("/");
      }

      if (address !== _form.owner) {
        // window.location.replace(`/view-form/${id}`);
        alert("Arrey bhai kya kar raha hain");
        window.location.replace(`/`);
      }

      const _fields = await formsAppContract.methods.getFields(id).call();
      // get submissions
      _form["fields"] = _fields;
      console.log(_form);
      // _form["submissions"]=_submissions
      setForm(_form);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getForm();
    }
  }, [id]);

  if (loading) {
    return <Loading loadingMsg="Loading form..." />;
  }

  return (
    <div className="row mt-5 bg-light p-2 rounded">
      <div className="col-12 text-center">
        <h3>Edit Form</h3>
      </div>
      <div className="col-12 mx-1 my-2">
        <Tabs>
          <Tab eventKey="edit" title="Edit">
            <CreateForm form={form} />
          </Tab>
          <Tab eventKey="submissions" title="Submissions">
            Submissions
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default EditForm;
