import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

function Submissions({ _submissions = [], _fields = [] }) {
  const [submissions, setSubmissions] = useState([]);
  const [fields, setFields] = useState([]);
  const [viewSubmission, setViewSubmission] = useState(null);

  useEffect(() => {
    if (_fields.length && _submissions.length) {
      setSubmissions(_submissions);
      setFields(_fields);
      setViewSubmission(_submissions[0]);
    }
  }, [_submissions, _fields]);

  if (!submissions.length) {
    return (
      <div className="text-center my-3">
        <h5>No submissions received at!!!</h5>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-md-4 mx-2 mx-auto my-2 border-end">
        <ListGroup>
          {submissions.map((submission) => (
            <ListGroupItem
              key={submission.timestamp}
              className="text-truncate cursor-pointer"
              active={submission.user === viewSubmission.user}
              onClick={() => setViewSubmission(submission)}
            >
              <small>{submission.user}</small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
      <div className="col-md-7 mx-2 mx-auto my-2">
        <ListGroup>
          <ListGroupItem className="text-warning">
            <strong>
              <em>
                Submitted on:{" "}
                {new Date(viewSubmission.timestamp * 1000).toLocaleString()}
              </em>
            </strong>
          </ListGroupItem>
          {fields.map((field, i) => (
            <ListGroup.Item key={field.id} variant="light">
              <h6>{field.title}</h6>
              {field.fieldType === "text" ? (
                <p> {viewSubmission.answers[i][0]}</p>
              ) : (
                field.options.map((option, index) => (
                  <div key={`Option+${field.id}-${index}`}>
                    <input
                      type={field.fieldType}
                      name={field.title}
                      value={option}
                      // disabled={isSubmitted}
                      checked={viewSubmission.answers[i].includes(option)}
                      readOnly
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
      </div>
    </div>
  );
}

export default Submissions;
