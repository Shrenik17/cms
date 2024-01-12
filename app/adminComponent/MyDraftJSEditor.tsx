import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function MyDraftJSEditor(props: any) {
  const [text, setText] = useState("");

  const handleChange = (value: any) => {
    setText(value);
  };
  const toolbarOptions = [
    [{ header: [] }], // headings
    [{ font: [] }], // font style
    ["bold", "italic", "underline", "strike"], // default buttons
    [{ align: [] }], // add alignment dropdown
    [{ list: "ordered" }, { list: "bullet" }], // list buttons
    ["link", "image"], // add image button
    ["clean"], // remove formatting button
  ];
  return (
    <div>
      <ReactQuill
        className="custom-editor"
        theme="snow"
        value={text}
        onChange={setText}
        modules={{ toolbar: toolbarOptions }}
      />
    </div>
  );
}

export default MyDraftJSEditor;
