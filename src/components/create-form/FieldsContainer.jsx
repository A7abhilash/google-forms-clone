import React from "react";
import Field from "./Field";

function FieldsContainer({ fields = [], setFields }) {
  const handleAddNewField = () => {
    let field = {
      id: new Date().getTime().toString(),
      title: "Title",
      fieldType: "text",
      options: [],
    };

    setFields((prev) => [...prev, field]);
  };

  const handleSaveField = (field) => {
    const _fields = fields.map((item) => (item.id === field.id ? field : item));
    setFields(_fields);
  };

  const handleRemoveField = (id) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  return (
    <div className="my-2">
      {fields.map((field, index) => (
        <Field
          key={`Field-no-${index}`}
          _field={field}
          handleSaveField={handleSaveField}
          handleRemoveField={handleRemoveField}
        />
      ))}
      <button className="btn btn-primary" onClick={handleAddNewField}>
        Add Field
      </button>
    </div>
  );
}

export default FieldsContainer;
