import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Column, useTable } from "react-table";
import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import NoData from "../components/NoData";
import { deleteblog, fetchBlog, fetchSingleBlog } from "../Api/blogAPI";
import { baseUrl } from "../../constants";

const Blogs = () => {

  const [singleBlogData, setSingleBlogData] = useState<any>({});
  const [data, setData] = useState<any[]>([]); // Provide a type
  const [isModalOpen, setIsModalOpen] = useState(false);
  const AddBlogContent = dynamic(
    () => import("../adminComponent/AddBlogContent"),
    {
      ssr: false, // This ensures it's not loaded on the server side
    }
  );
  // console.log(selectedFile);
  const getData = async () => {
    let response = await fetchBlog();
    setData(response.data);
   // console.log("get members response", response);
  };
  useEffect(() => {
    getData();
  }, []);

  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (cellValue: any) => {
    let response = await deleteblog(cellValue.row.original.blog_id);
    getData();
  };

  const getSingleBlog = async (cellValue: any) => {
   // console.log("id", cellValue.row.original.blog_id);
    let response = await fetchSingleBlog(cellValue.row.original.blog_id);
    setSingleBlogData(response.data);
    openModal();
  };

  //console.log(singleBlogData);
  const columns = React.useMemo<Column<any>[]>(
    () => [
      // {
      //   Header: "Member Id",
      //   accessor: "id",
      // },
      {
        Header: "Blog Heading",
        accessor: "blogHeading",
      },
      {
        Header: "Blog Posted Date",
        accessor: "postedDate",
      },
      {
        Header: "Written By",
        accessor: "writtenBy",
      },
      {
        Header: "Actions",
        Cell: ({ cell }: any) => (
          <div className="flex justify-center space-x-2">
            <label
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded cursor-pointer"
              onClick={(e) => getSingleBlog(cell)}
              htmlFor="my-modal-5"
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="css-i6dzq1"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </label>

            <button
              className="bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded"
              onClick={(e) => handleDelete(cell)}
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="red"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="css-i6dzq1"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="p-3 bg-bggrey h-screen">
      <p className="text-xl pb-5">Blogs Management</p>
      <div className="border border-grey bg-white">
        <div className="flex justify-end">
          <label
            className="uppercase px-4 py-2 mx-3 my-3 bg-blue rounded text-white font-semibold hover:cursor-pointer"
            htmlFor="my-modal-4"
          >
            Add Blogs
          </label>
        </div>

        {/* --------------------Add user Modal Start----------------------*/}
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box w-7/12 max-w-5xl">
            <div className="flex justify-between">
              <h3 className="font-bold text-lg">Add New Member</h3>
              <label htmlFor="my-modal-4" className="hover:cursor-pointer">
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  stroke="black"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="css-i6dzq1"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </label>
            </div>
            <AddBlogContent />
            {/* <div>
              <div className="divider"></div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="label">
                    <span className="label-text text-lg">
                      Enter Blog Heading
                    </span>
                  </label>
                  <input
                    name="blogHeading"
                    type="text"
                    placeholder="Type here"
                    value={blogHeading}
                    className="input input-bordered w-full"
                    onChange={(event: any) =>
                      setBlogHeading(event.target.value)
                    }
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
                <MyDraftJSEditor onData={handlehtml} />
              </div>

              <div className="modal-action flex justify-end mt-16">
                <form method="dialog">
                  <button
                    onClick={handleUpload}
                    // disabled={!selectedFile}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div> */}
          </div>
        </div>
        {/* --------------------Add user Modal End----------------------*/}

        {data.length != 0 ? (
          <div className="overflow-x-auto p-4">
            <table className="min-w-full bg-white border border-grey">
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column, index) => (
                      <th
                        {...column.getHeaderProps()}
                        className="py-2 px-4 border border-grey font-bold"
                        key={index}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      className="border border-gray-300"
                      key={index}
                    >
                      {row.cells.map((cell, index) => (
                        <td
                          {...cell.getCellProps()}
                          className="py-2 px-4 whitespace-nowrap border border-grey text-center"
                          key={index}
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <NoData />
        )}
      </div>
      <div className="flex justify-center items-center h-screen">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={openModal}
        >
          Open Modal
        </button>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-scroll outline-none focus:outline-none">
            <div className="relative h-screen w-screen mx-auto my-6">
              {/* Content */}
              <div className="relative flex flex-col h-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                {/* Header */}
                <div className="flex items-start justify-between pt-3 px-3 border-solid border-gray-300 rounded-t">
                  <h3 className="font-bold text-lg">Edit Member Details</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="divider"></div>
                {/* Body */}
                <div className="relative flex-auto overflow-y-auto">
                  <div className="px-6">
                    <div className="flex flex-wrap justify-between">
                      <div className="grid grid-cols-2 gap-6">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: singleBlogData.htmlContent,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Footer */}
                <div className="flex items-center justify-end p-6 border-solid border-gray-300 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black opacity-50"></div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
