import React from "react";

export const Textinput = (props: any) => {
  console.log("kejwfw", props);
  const name = props.fields.field_name.toLowerCase();
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">{props.fields.field_name}</label>
      <input
        type="text"
        name={name}
        value={props.formData.field_name}
        placeholder="Enter Value"
        className="input input-bordered w-full max-w-xs"
        onChange={props.onChangehandler}
      />
    </div>
  );
};
export const DateInput = (props: any) => {
  console.log("kejwfw", props);
  const name = props.fields.field_name.toLowerCase();
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">{props.fields.field_name}</label>
      <input
        type="date"
        name={name}
        value={props.formData.field_name}
        placeholder="Enter Value"
        className="input input-bordered w-full max-w-xs"
        onChange={props.onChangehandler}
      />
    </div>
  );
};
export const Emailinput = (props: any) => {
  const name = props.fields.field_name.toLowerCase();
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">{props.field.field_name}</label>
      <input
        type="email"
        name={name}
        value={props.fields.field_name}
        placeholder="Enter Value"
        className="input input-bordered w-full max-w-xs"
        onChange={props.onChangehandler}
      />
    </div>
  );
};
export const TextareaInput = (props: any) => {
  console.log(props);
  const name = props.fields.field_name.toLowerCase();
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">{props.fields.field_name}</label>
      <input
        type="textarea"
        name={name}
        value={props.fields.field_name}
        placeholder="Enter Value"
        className="input input-bordered w-full max-w-xs"
        onChange={props.onChangehandler}
      />
    </div>
  );
};
export const FileInput = (props: any) => {
  //   console.log(props);
  const name = props.fields.field_name.toLowerCase();
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">{props.fields.field_name}</label>
      <input
        type="file"
        name={name}
        // value={props.fields.field_name}
        placeholder="Enter Value"
        className="file-input file-input-bordered w-full max-w-xs"
        onChange={props.onChangehandler}
      />
    </div>
  );
};
export const DropdownInput = (props: any) => {
  //   console.log(props);
  const name = props.fields.field_name.toLowerCase();
  const values = props.fields.field_values.split(",");
  //   console.log(values);
  return (
    <div className="form-control m-2 w-full max-w-xs">
      <label className="label block">
        {props.fields.field_name}
        <span className="text-red">*</span>
      </label>
      <select
        className="select select-bordered w-full max-w-xs"
        name={name}
        onChange={props.onChangehandler}
      >
        {values.map((item: any, index: any) => {
          //   console.log(item);
          return (
            <option value={item} key={index}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export const RadioInput = (props: any) => {
  const name = props.fields.field_name.toLowerCase();
  return (
    <div className="form-control m-2  max-w-xs">
      <label className="label block">
        Field Required<span className="text-red">*</span>
      </label>
      <div className="flex">
        <div className="m-4 flex mt-2">
          <input
            type="radio"
            name="required"
            value="Yes"
            className="radio"
            // checked={formFields[index].status}
            onChange={props.onChangehandler}
          />
          <label>&nbsp;Yes </label>
        </div>
        <div className="flex mt-2">
          <input
            type="radio"
            name="required"
            value="No"
            className="radio"
            // checked={formFields[index].status}
            onChange={(event: any) => props.onChangehandler(event)}
          />
          <label>&nbsp;No</label>
        </div>
      </div>
    </div>
  );
};
