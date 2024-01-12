import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { baseUrl } from "../../constants";

const AddBlogContent = () => {
  const [value, setValue] = useState("");
  const [blogHeading, setBlogHeading] = useState("");
  const [postedDate, setPostedDate] = useState("");
  const [writtenBy, setWrittenBy] = useState("");

  const toolbarOptions = [
    [{ header: [] }], // headings
    [{ font: [] }], // font style
    ["bold", "italic", "underline", "strike"], // default buttons
    [{ align: [] }], // add alignment dropdown
    [{ list: "ordered" }, { list: "bullet" }], // list buttons
    ["link", "image"], // add image button
    ["clean"], // remove formatting button
  ];

  const handleUpload = () => {
    const data: any = {
      blogHeading: blogHeading,
      postedDate: postedDate,
      writtenBy: writtenBy,
      htmlContent: value,
    };
    console.log("add data", data);
    fetch(baseUrl + "/blog/addBlog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log("response", res);
        return res.json();
      })
      .then((data) => {
        console.log("File uploaded successfully:", data);
        console.log("data", data);
        // console.log(res)
        // Perform any additional actions or update the UI as needed
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        // Handle the error and update the UI accordingly
      });
  };
  return (
    <div>
      <div className="divider"></div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="label">
            <span className="label-text text-lg">Enter Blog Heading</span>
          </label>
          <input
            name="blogHeading"
            type="text"
            placeholder="Type here"
            value={blogHeading}
            className="input input-bordered w-full"
            onChange={(event: any) => setBlogHeading(event.target.value)}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text text-lg">Enter Blog Date</span>
          </label>
          <input
            name="blogDate"
            type="date"
            placeholder="Type here"
            value={postedDate}
            className="input input-bordered w-full"
            onChange={(event: any) => setPostedDate(event.target.value)}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text text-lg">Enter Written By</span>
          </label>
          <input
            name="writtenBy"
            type="text"
            placeholder="Type here"
            value={writtenBy}
            className="input input-bordered w-full"
            onChange={(event: any) => setWrittenBy(event.target.value)}
          />
        </div>
      </div>
      <div className="mt-5">
        <label className="label">
          <span className="label-text text-lg">Blog Content</span>
        </label>
        <div>
          <ReactQuill
            className="custom-editor"
            theme="snow"
            value={value}
            onChange={setValue}
            modules={{ toolbar: toolbarOptions }}
          />
        </div>
      </div>

      <div className="modal-action flex justify-end mt-16">
        <form method="dialog">
          {/* <div className="flex justify-end"> */}
          <button
            onClick={handleUpload}
            // disabled={!selectedFile}
            className="btn btn-primary"
          >
            Submit
          </button>
          {/* </div> */}
        </form>
      </div>
    </div>
  );
};

export default AddBlogContent;
