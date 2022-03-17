import React from "react";

function AddOptions({ options, setOptions }) {
  const handleAddNewOption = () => {
    setOptions((prev) => [...prev, "Option"]);
  };

  const handleRemoveField = (idx) => {
    setOptions((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div>
      Options
      <div className="my-2">
        <div>
          {options?.map((option, index) => (
            <div key={`Option-${index}`} className="input-group my-2">
              <input
                type="text"
                className="form-control"
                value={option}
                onChange={(e) => {
                  setOptions((prev) =>
                    prev.map((item, i) => (index === i ? e.target.value : item))
                  );
                }}
                placeholder="Option"
              />
              <span
                className="cursor-pointer input-group-text"
                onClick={() => handleRemoveField(index)}
              >
                Remove
              </span>
            </div>
          ))}
        </div>

        <button className="btn btn-primary mt-2" onClick={handleAddNewOption}>
          Add Option
        </button>
      </div>
    </div>
  );
}

export default AddOptions;
