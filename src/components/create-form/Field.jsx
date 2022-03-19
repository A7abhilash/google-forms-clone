import React, { useEffect, useState } from "react";
import { ButtonGroup, Card, Modal, ToggleButton } from "react-bootstrap";
import AddOptions from "./AddOptions";

function Field({ _field, handleSaveField, handleRemoveField }) {
  const [fieldTitle, setFieldTitle] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState([]);

  const radios = [
    { name: "Text", value: "text" },
    { name: "Checkbox", value: "checkbox" },
    { name: "Radio", value: "radio" },
  ];

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  useEffect(() => {
    if (_field) {
      setInitialValues();
    }
  }, [_field]);

  const setInitialValues = () => {
    setFieldTitle(_field.title);
    setFieldType(_field.fieldType);
    setOptions(_field.options);
  };

  const handleSave = () => {
    let field = {
      id: _field.id,
      title: fieldTitle,
      fieldType,
      options: fieldType === "text" ? [] : options,
    };
    handleSaveField(field);
    closeModal();
  };

  const handleCancel = () => {
    setInitialValues();
    closeModal();
  };

  return (
    <Card className="my-2">
      <Card.Header>
        <h6 className="text-truncate">{fieldTitle}</h6>

        <div className="d-flex align-items-center">
          <button className="btn btn-sm btn-warning" onClick={openModal}>
            Edit
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => handleRemoveField(_field.id)}
            style={{ marginLeft: 15 }}
          >
            Remove
          </button>
        </div>
      </Card.Header>

      <Modal show={visible} onHide={closeModal} animation="fade" size="lg">
        <Modal.Header>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Dialog scrollable size="lg">
            <div className="p-2">
              <div className=" my-1 form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={fieldTitle}
                  onChange={(e) => setFieldTitle(e.target.value)}
                  placeholder="Title"
                />
              </div>
              <div className=" my-1 form-group">
                <label>Type</label> <br />
                <ButtonGroup toggle>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      type="radio"
                      variant="info"
                      name="radio"
                      value={radio.value}
                      checked={fieldType === radio.value}
                      onChange={(e) => setFieldType(e.currentTarget.value)}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </div>
              {fieldType !== "text" && (
                <div className="my-1">
                  <AddOptions options={options} setOptions={setOptions} />
                </div>
              )}
            </div>
          </Modal.Dialog>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn btn-success" onClick={handleSave}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default Field;
