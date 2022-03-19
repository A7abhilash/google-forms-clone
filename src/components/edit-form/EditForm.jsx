import React from "react";
import { useParams } from "react-router-dom";

function EditForm() {
  const { id } = useParams();

  return (
    <div className="mt-5">
      EditForm
      <p>{id}</p>
    </div>
  );
}

export default EditForm;
