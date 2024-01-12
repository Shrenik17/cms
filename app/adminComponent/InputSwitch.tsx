import React, { useState } from "react";

const InputSwitch = (props: any) => {
  console.log();

  const addValue = (index: number) => {
    const updatedFields = [...props.formFields];
    updatedFields[index].values.push("");
    props.setFormFields(updatedFields);
  };

  const removeValue = (fieldIndex: number, valueIndex: number) => {
    const updatedFields = [...props.formFields];
    updatedFields[fieldIndex].values.splice(valueIndex, 1);
    props.setFormFields(updatedFields);
  };

  const handleChange = (
    fieldIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const updatedFields = [...props.formFields];
    updatedFields[fieldIndex][name] = value;
    props.setFormFields(updatedFields);
  };

  const handleValueChange = (
    fieldIndex: number,
    valueIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const updatedFields = [...props.formFields];
    updatedFields[fieldIndex].values[valueIndex] = value;
    props.setFormFields(updatedFields);
  };

  //   console.log(props.inputType);
  if (props.inputType === "radio") {
    return (
      <div className="m-3">
        <p>Enter Radio button values</p>
        <div className="m-4 mt-2">
          <div className="flex m-2 ">
            {props.field.values.map((value: any, valueIndex: number) => (
              <input
                key={valueIndex}
                required
                type="text"
                name="name"
                value={value}
                placeholder={`Value ${valueIndex + 1}`}
                className="input input-bordered w-full max-w-xs m-3"
                onChange={(event) =>
                  handleValueChange(props.index, valueIndex, event)
                }
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else if (props.inputType === "dropdown") {
    return (
      <div>
        <label>Enter Dropdown values</label>
        <div className="flex flex-wrap">
          {props.field.values.map((value: any, valueIndex: number) => (
            <div className="flex m-3" key={valueIndex}>
              <input
                // placeholder="Enter Field Name"
                className="input input-bordered w-full max-w-xs"
                type="text"
                value={value}
                placeholder={`Value ${valueIndex + 1}`}
                onChange={(event) =>
                  handleValueChange(props.index, valueIndex, event)
                }
              />
              <div className="flex items-center ml-2">
                {valueIndex >= 2 && (
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="red"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="css-i6dzq1"
                    type="button"
                    onClick={() => removeValue(props.index, valueIndex)}
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                )}
              </div>
              {/* <button onClick={() => removeField(index)}>Remove</button> */}
            </div>
          ))}
        </div>
        <div className="flex justify-end items-center">
          <button
            type="button"
            className="bg-blue py-1 px-2 rounded text-white"
            onClick={() => addValue(props.index)}
          >
            Add value
          </button>
        </div>
      </div>
    );
  }
};

export default InputSwitch;
