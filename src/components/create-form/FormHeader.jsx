import React from "react";

function FormHeader({
  title,
  setTitle,
  description,
  setDescription,
  endTime,
  setEndTime,
  allowResponse,
  setAllowResponse,
}) {
  return (
    <div className="col-12 mb-3">
      <div className="form-group">
        <label>Form Title</label>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Form Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Form Description</label>
        <textarea
          className="form-control my-2"
          placeholder="Form Description"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label>End Time</label>
        <input
          type="datetime-local"
          className="form-control my-2"
          placeholder="Form End Time"
          required
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <div className="form-group d-flex align-items-center">
        <label>Allow Responses</label>
        <input
          type="checkbox"
          className="my-2"
          value={allowResponse}
          checked={allowResponse}
          onChange={(e) => setAllowResponse(e.target.checked)}
          style={{ marginLeft: 10, marginBottom: -5 }}
        />
      </div>
      <hr className="bg-secondary" />
    </div>
  );
}

export default FormHeader;
