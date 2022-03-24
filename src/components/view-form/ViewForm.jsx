import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useForms } from "../../App";
import Loading from "../../containers/Loading";

function ViewForm() {
  const { id } = useParams();
  const { formsAppContract, address } = useForms();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(null);
  const [fields, setFields] = useState([]);

  // const [answers, setAnswers] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isSubmittingAllowed, setIsSubmittingAllowed] = useState(true);

  const getForm = async () => {
    setLoading(true);
    try {
      const _form = await formsAppContract.methods.forms(id).call();
      //   console.log(_form);
      if (_form.id === "0") {
        alert("Invalid form...");
        window.location.replace("/");
      }

      const _fields = await formsAppContract.methods.getFields(id).call();
      //   console.log(_fields);

      setFields(_fields);
      setForm(_form);

      let now = new Date().getTime();
      let endTime = new Date(Number(_form.endTime)).getTime();

      if (now > endTime || !_form.allowResponse) {
        setIsSubmittingAllowed(false);
      }

      //   TODO: Check if current user has submitted the form. If yes, then retrieve the submission!
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

  const handleSubmit = () => {
    try {
      let now = new Date().getTime();
      let endTime = new Date(Number(form.endTime)).getTime();

      if (!isSubmittingAllowed || isSubmitted || now > endTime) {
        alert("This form is not taking the responses anymore...");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loading loadingMsg="Loading form..." />;
  }
  return (
    <div className="row mt-5 bg-light p-2 rounded">
      <div className="col-md-8 mx-1 mx-md-auto my-3">
        <h4>{form.title}</h4>
        <p>{form.description}</p>
        {form.endTime && (
          <small>
            <em>
              End Time: {new Date(Number(form.endTime)).toLocaleString()}{" "}
            </em>
          </small>
        )}
      </div>
      <hr />
      {isSubmittingAllowed ? (
        <div className="col-md-8 mx-1 mx-md-auto my-3">
          <ListGroup>
            {fields.map((field) => (
              <ListGroup.Item key={field.id} variant="light">
                <h6>{field.title}</h6>
                {field.fieldType === "text" ? (
                  <textarea
                    className="form-control"
                    placeholder="Your Answer..."
                  ></textarea>
                ) : (
                  field.options.map((option, index) => (
                    <div key={`Option+${field.id}-${index}`}>
                      <input
                        type={field.fieldType}
                        name={field.title}
                        value={option}
                        // onChange={ }
                      />
                      <label
                        htmlFor={field.title}
                        style={{ marginLeft: 10, marginBottom: 5 }}
                      >
                        {option}
                      </label>
                      <br />
                    </div>
                  ))
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
          {!isSubmitted && (
            <div>
              <hr />
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="col-md-8 mx-1 mx-md-auto my-3">
          <p>
            <strong>This form is not taking the responses anymore...</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default ViewForm;
