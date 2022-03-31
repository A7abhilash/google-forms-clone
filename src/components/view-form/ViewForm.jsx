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
  const [mySubmissions, setMySubmissions] = useState([]);

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
      const _submission = await formsAppContract.methods
        .getUserSubmission(id)
        .call({ from: address });
      // console.log(_submission.answers);
      if (_submission.user === address) {
        setIsSubmitted(true);
        setMySubmissions(_submission.answers);
      }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSubmittingAllowed) return;

    try {
      let now = new Date().getTime();
      let endTime = new Date(Number(form.endTime)).getTime();

      if (!isSubmittingAllowed || isSubmitted || now > endTime) {
        alert("This form is not taking the responses anymore...");
        window.location.reload();
      }

      // handle submission

      let _submission = [];

      fields.forEach((field) => {
        // console.log(e.target[field.title]);
        let options = [];
        if (field.fieldType === "checkbox") {
          e.target[field.title].forEach((item) => {
            if (item.checked) {
              options.push(item.value);
            }
          });
        } else {
          if (e.target[field.title].value) {
            options.push(e.target[field.title].value);
          }
        }
        if (!options.length) {
          options.push("");
        }

        _submission.push({
          id: field.id,
          title: field.title,
          fieldType: field.fieldType,
          options,
        });
      });
      // console.log(_submission);

      formsAppContract.methods
        .submitForm(id, _submission)
        .send({ from: address })
        .on("receipt", () => {
          alert("form submitted");
          window.location.reload();
        });
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
          {isSubmitted && (
            <h5 className="text-center text-primary">Your Response:</h5>
          )}
          <form onSubmit={handleSubmit}>
            <ListGroup>
              {fields.map((field, i) => (
                <ListGroup.Item key={field.id} variant="light">
                  <h6>{field.title}</h6>
                  {field.fieldType === "text" ? (
                    isSubmitted ? (
                      <p> {mySubmissions[i][0]}</p>
                    ) : (
                      <textarea
                        className="form-control bg-light"
                        placeholder="Your Answer..."
                        name={field.title}
                      ></textarea>
                    )
                  ) : (
                    field.options.map((option, index) => (
                      <div key={`Option+${field.id}-${index}`}>
                        {isSubmitted ? (
                          <input
                            type={field.fieldType}
                            name={field.title}
                            value={option}
                            // disabled={isSubmitted}
                            checked={mySubmissions[i].includes(option)}
                            readOnly
                          />
                        ) : (
                          <input
                            type={field.fieldType}
                            name={field.title}
                            value={option}
                          />
                        )}
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
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            )}
          </form>
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
