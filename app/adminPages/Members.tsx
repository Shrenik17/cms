import React, { useState, useEffect } from "react";
import { Column, useTable } from "react-table";
import NoData from "../components/NoData";
import { deleteMember, getMember } from "../Api/membersAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxCross1 } from "react-icons/rx";
import { baseUrl } from "../../constants";
const Members = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [memberName, setMemberName] = useState("");
  const [memberProfession, setMemberProfession] = useState("");
  const [editMemberName, setEditMemberName] = useState("");
  const [responseType, setResponseType] = useState<any>("");
  const [editMemberProfession, setEditMemberPRofession] = useState("");
  const [data, setData] = useState<any[]>([]); // Provide a type
  const [memberID, setMemberID] = useState<any>(null); // Provide a type
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };
  const handleEditFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const getData = async () => {
    let response = await getMember();
    setData(response.data);
    if (response.type) {
      setResponseType("true");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [dataUpdate]);

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("memberPhoto", selectedFile);
      formData.append("memberName", memberName);
      formData.append("memberProfession", memberProfession);
     // console.log("formData", formData);

      fetch(baseUrl + "/members/addMember", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          console.log("response", res);
          return res.json();
        })
        .then((data) => {
          toast.success("Added Successfully!", {
            position: "bottom-right",
            autoClose: 1000,
          });
          // console.log("File uploaded successfully:", data);
          setIsOpen(false);
          setDataUpdate(!dataUpdate);
          // console.log("data", data);
          // console.log(res)
          // Perform any additional actions or update the UI as needed
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          // Handle the error and update the UI accordingly
        });
    }
    // getData();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (cellValue: any) => {
    let response = await deleteMember(cellValue.row.original.id);
    // getData();
    if (response) {
      setDataUpdate(!dataUpdate);
      toast.error("Deleted Successfully!", {
        position: "bottom-right",
        autoClose: 1000,
      });
    }
  };

  const handleEdit = async (cell: any) => {
    setMemberID(cell.row.original.id);
    //console.log("Single USer Data", memberID);
    await fetch(baseUrl + `/members/getMember/${cell.row.original.id}`, {
      method: "GET", // Use GET method for a GET request
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        setEditMemberName(res.data[0].memberName);
        setEditMemberPRofession(res.data[0].memberProfession);
      })
      .then(() => {
        openModal();
      });
  };

  const handleEditSubmit = () => {
    //console.log("function called", memberID);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("memberPhoto", selectedFile);
      formData.append("memberName", editMemberName);
      formData.append("memberProfession", editMemberProfession);
      console.log("formData", formData);

      fetch(baseUrl + `/members/updateMember/${memberID}`, {
        method: "PUT",
        body: formData,
      })
        .then((res) => {
          console.log("response", res);
          return res.json();
        })
        .then((data) => {
          toast.success("Updated Successfully!", {
            position: "bottom-right",
            autoClose: 1000,
          });
          // console.log("File uploaded successfully:", data);
          setIsModalOpen(false);
          setSelectedFile(null);
          setDataUpdate(!dataUpdate);
          // console.log("data", data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          // Handle the error and update the UI accordingly
        });
    }
    closeModal();
    getData();
  };

  const columns = React.useMemo<Column<any>[]>(
    () => [
      
      {
        Header: "Member Name",
        accessor: "memberName",
      },
      {
        Header: "Member Profession",
        accessor: "memberProfession",
      },
      {
        Header: "Member Photo",
        accessor: "member_photo",
        Cell: ({ cell }) => {
          return (
            <div className="flex items-center justify-center h-full">
              <img
                src={cell.row.original.memberPhoto_path} // Assuming cell.value contains the image URL
                alt="Member"
                style={{ width: "100px", height: "auto" }} // Adjust the size as needed
              />
            </div>
          );
        },
      },
      {
        Header: "Actions",
        Cell: ({ cell }: any) => (
          <div className="flex justify-center space-x-2">
            <label
              className="px-4 py-2 font-bold bg-blue-500 rounded cursor-pointer hover:bg-blue-700"
              onClick={(e) => handleEdit(cell)}
              htmlFor="my-modal-5"
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="black"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="css-i6dzq1"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </label>

            {/* --------------------Edit user Modal Start----------------------*/}

            <button
              className="px-4 py-2 font-bold bg-red-500 rounded hover:bg-red-700"
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
    <div className="h-screen p-3 overflow-auto pb-28 bg-bggrey">
      <p className="pb-5 text-xl">Member Management</p>
      <ToastContainer />
      <div className="bg-white border border-grey">
        <div className="flex justify-end">
          <label
            className="block px-4 py-2 mx-3 my-3 font-semibold leading-tight text-white border border-gray-300 rounded shadow appearance-none cursor-pointer bg-blue hover:border-gray-400 focus:outline-none focus:shadow-outline"
            // htmlFor="my-modal-4"
            onClick={() => setIsOpen(true)}
          >
            Add Member
          </label>
        </div>

        {/* --------------------Add user Modal Start----------------------*/}
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              {/* Content */}
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                {/* Header */}
                <div className="flex items-center justify-between px-4 mt-4 border-gray-300 border-solid rounded-t">
                  <h3 className="text-2xl font-bold">Add New Member</h3>
                  <button
                    className="p-2 ml-auto text-2xl text-black bg-transparent border-0 outline-none focus:outline-none"
                    onClick={() => setIsOpen(false)}
                  >
                    <RxCross1 />
                  </button>
                </div>
                <div className="items-start divider"></div>
                {/* Body */}
                <div className="relative flex-auto px-6">
                  {" "}
                  <div className="">
                    <div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="label">
                            <span className="text-lg label-text">
                              Enter Member Name
                            </span>
                          </label>
                          <input
                            name="memberName"
                            type="text"
                            placeholder="Type here"
                            value={memberName}
                            className="w-full input input-bordered"
                            onChange={(event: any) =>
                              setMemberName(event.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label className="label">
                            <span className="text-lg label-text">
                              Enter Member Profession
                            </span>
                          </label>
                          <input
                            name="memberProfession"
                            type="text"
                            placeholder="Type here"
                            value={memberProfession}
                            className="w-full input input-bordered"
                            onChange={(event: any) =>
                              setMemberProfession(event.target.value)
                            }
                          />
                        </div>
                        <div className="">
                          <label className="label">
                            <span className="text-lg label-text">
                              Select Member Photo
                            </span>
                          </label>
                          <input
                            type="file"
                            accept=".png"
                            onChange={handleFileChange}
                            className="w-full file-input file-input-bordered file-input-md"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end mt-3 mb-3">
                        <form method="dialog">
                          {/* <div className="flex justify-end"> */}
                          <button
                            onClick={handleUpload}
                            disabled={
                              !selectedFile || !memberName || !memberProfession
                            }
                            className="btn btn-primary"
                          >
                            Submit
                          </button>
                          {/* </div> */}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isOpen && <div className="fixed inset-0 bg-black opacity-50"></div>}
        {/* --------------------Add user Modal End----------------------*/}

        {responseType == "true" ? (
          <div className="p-4 overflow-x-auto">
            <table className="min-w-full bg-white border border-grey">
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    <th>Sr.No.</th>
                    {headerGroup.headers.map((column, index) => (
                      <th
                        {...column.getHeaderProps()}
                        className="px-4 py-2 font-bold border border-grey"
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
                      <td className="px-4 py-2 text-center border whitespace-nowrap border-grey">
                        {index + 1}
                      </td>
                      {row.cells.map((cell, index) => (
                        <td
                          {...cell.getCellProps()}
                          className="px-4 py-2 text-center border whitespace-nowrap border-grey"
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
      <div className="flex items-center justify-center">
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              {/* Content */}
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                {/* Header */}
                <div className="flex items-center justify-between px-4 mt-4 border-gray-300 border-solid rounded-t">
                  <h3 className="text-2xl font-bold">Edit Member Details</h3>
                  <button
                    className="p-2 ml-auto text-2xl text-black bg-transparent border-0 outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <RxCross1 />
                  </button>
                </div>
                <div className="items-start divider"></div>
                {/* Body */}
                <div className="relative flex-auto px-6">
                  {" "}
                  <div className="flex flex-wrap justify-between">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="label">
                          <span className="text-lg label-text">
                            Enter Member Name
                          </span>
                        </label>
                        <input
                          name="memberName"
                          type="text"
                          placeholder="Type here"
                          value={editMemberName}
                          className="w-full input input-bordered"
                          onChange={(event: any) =>
                            setEditMemberName(event.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="label">
                          <span className="text-lg label-text">
                            Enter Member Profession
                          </span>
                        </label>
                        <input
                          name="memberProfession"
                          type="text"
                          placeholder="Type here"
                          value={editMemberProfession}
                          className="w-full input input-bordered"
                          onChange={(event: any) =>
                            setEditMemberPRofession(event.target.value)
                          }
                        />
                      </div>
                      <div className="">
                        <label className="label">
                          <span className="text-lg label-text">
                            Select Member Photo
                          </span>
                        </label>
                        <input
                          type="file"
                          accept=".png"
                          onChange={handleEditFileChange}
                          className="w-full file-input file-input-bordered file-input-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Footer */}
                <div className="flex items-center justify-end p-6 border-gray-300 border-solid rounded-b">
                  <button
                    className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                    type="button"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    className={`${
                      !editMemberProfession || !editMemberName || !selectedFile
                        ? "bg-grey"
                        : ""
                    } bg-[#5393E8] text-white active:bg-[#5393E8] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type="button"
                    onClick={handleEditSubmit}
                    disabled={
                      !editMemberProfession || !editMemberName || !selectedFile
                    }
                  >
                    Save Changes
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

export default Members;
