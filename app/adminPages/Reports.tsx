import React, { useState, useEffect } from "react";
import { Column, useTable } from "react-table";
import NoData from "../components/NoData";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxCross1 } from "react-icons/rx";
import { baseUrl } from "../../constants";
import { getReport ,deleteReport } from "../Api/reportAPI";
const Report = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [shortDesc, setShortDesc] = useState("");
    const [publishedBy, setPublishedBy] = useState("");
    const [data, setData] = useState<any[]>([]);
    const [reportID, setReportID] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editSelectedYear, setEditSelectedYear] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editShortDesc, setEditShortDesc] = useState("");
    const [editPublishedBY, setEditPublishedBY] = useState("");
    const [responseType, setResponseType] = useState<any>("");
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
        let response = await getReport();
       // console.log(response.data);
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

      const handleUpload =() =>{
     if(selectedFile){
      const formData = new FormData();
      formData.append("title", title);
      formData.append("publishedBy",publishedBy);
      formData.append("reportYear",selectedYear);
      formData.append("reportPdf", selectedFile);
      formData.append("shortDesc", shortDesc);

      fetch(baseUrl + "/report/addReport", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
     
          return res.json();
        })
        .then((data) => {
          toast.success("Added Successfully!", {
            position: "bottom-right",
            autoClose: 1000,
          });
           console.log("File uploaded successfully:", data);
          setIsOpen(false);
          setDataUpdate(!dataUpdate);
        
          // Perform any additional actions or update the UI as needed
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          // Handle the error and update the UI accordingly
        });
    }
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const handleDelete = async (cellValue: any) => {
    let response = await deleteReport(cellValue.row.original.id);
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
    setReportID(cell.row.original.id);
   console.log("id",reportID);
    await fetch(baseUrl + `/report/getReportById/${cell.row.original.id}`, {
      method: "GET", // 
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        setEditTitle(res.data[0].title);
        setEditPublishedBY(res.data[0].publishedBy);
        setEditSelectedYear(res.data[0].reportYear);
      })
      .then(() => {
        openModal();
      });
  };
  
  const handleEditSubmit = () => {
    console.log("function called", reportID);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("title", editTitle);
      formData.append("publishedBy",editPublishedBY);
      formData.append("reportYear",editSelectedYear);
      formData.append("reportPdf", selectedFile);
      formData.append("shortDesc", editShortDesc);
      console.log("formData", formData);

      fetch(baseUrl + `/report/updateReport/${reportID}`, {
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
      
          setIsModalOpen(false);
          setSelectedFile(null);
          setDataUpdate(!dataUpdate);
          
        })
        .catch((error) => {
          console.error("Error uploading file:", error);

        });
    }
    closeModal();
    getData();
  };



  const  openPdfInNewTab = async (cell: any) => {
    setReportID(cell.row.original.id);
    
    fetch(`${baseUrl}/report/getReportPdf/${cell.row.original.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error opening file");
        }
        return response.blob();
      })
      .then((blob) => {
        // Create a temporary URL for the file
        const url = URL.createObjectURL(blob);

        // Open the file in a new tab
        window.open(url, "_blank");

        // Clean up the temporary URL
        URL.revokeObjectURL(url);
      })

  };

  const columns = React.useMemo<Column<any>[]>(
    () => [
     
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Published By",
        accessor: "publishedBy",
      },
      {
        Header: "Year",
        accessor: "reportYear",
      },
      {
        Header: "Description",
        accessor: "shortDesc",
        Cell: ({ cell }: any) => (
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {cell.row.original.shortDesc.slice(0, 25)}
          </div>
        ),
      },


      {
        Header: "ViewPdf",
        accessor: "reportPdf",
        Cell: ({ cell }) => {
          return (
            <div className="flex items-center justify-center h-full">
           <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#007bff"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="css-i6dzq1"
                onClick={() => openPdfInNewTab(cell)}
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
          );
        },
      },
      {
        Header: "Actions",
        Cell: ({ cell }: any) => (
          <div className="flex justify-center space-x-2">
            {/* <label
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
            </label> */}

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
    const currentYear = new Date().getFullYear();

    // Generate an array of years from 2015 to the current year
    const years = Array.from({ length: currentYear - 2014 }, (_, index) =>
      (currentYear - index).toString()
    );
  
    // Event handler for when a year is selected
    const handleYearSelect = (e: any) => {
      setSelectedYear(e.target.value);
    };
    const handleEditYearSelect = (e: any) => {
      setEditSelectedYear(e.target.value);
    };
  
    return (
      <div className="h-screen p-3 overflow-auto pb-28 bg-bggrey">
      <p className="pb-5 text-xl">Report Management</p>
      <ToastContainer />
      <div className="bg-white border border-grey">
        <div className="flex justify-end">
          <label
            className="block px-4 py-2 mx-3 my-3 font-semibold leading-tight text-white border border-gray-300 rounded shadow appearance-none cursor-pointer bg-blue hover:border-gray-400 focus:outline-none focus:shadow-outline"
            // htmlFor="my-modal-4"
            onClick={() => setIsOpen(true)}
          >
            Add Report
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
                  <h3 className="text-2xl font-bold">Add New Report</h3>
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
                              Enter Title
                            </span>
                          </label>
                          <input
                            name="title"
                            type="text"
                            placeholder="Type here"
                            value={title}
                            className="w-full input input-bordered"
                            onChange={(event: any) =>
                              setTitle(event.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label className="label">
                            <span className="text-lg label-text">
                               Published By
                            </span>
                          </label>
                          <input
                            name="publishedBy"
                            type="text"
                            placeholder="Type here"
                            value={publishedBy}
                            className="w-full input input-bordered"
                            onChange={(event: any) =>
                              setPublishedBy(event.target.value)
                            }
                          />
                        </div>
                        <div className="relative inline-block text-left">
                            <label className="label">
                              <span className="text-lg label-text">
                                Select Year
                              </span>
                            </label>
                            <select
                              className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-400 focus:outline-none focus:shadow-outline"
                              name="year"
                              value={selectedYear}
                              onChange={handleYearSelect}
                            >
                              <option value="" disabled>
                                Select year
                              </option>
                              {years.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                          </div>
                        <div className="">
                          <label className="label">
                            <span className="text-lg label-text">
                              Select Pdf File
                            </span>
                          </label>
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="w-full file-input file-input-bordered file-input-md"
                          />
                        </div>
                        <div>
                            <label className="label">
                              <span className="text-lg label-text">
                                Short Description
                              </span>
                            </label>
                            <textarea
                              rows={3}
                              placeholder="Enter Short Description"
                              className="w-full px-4 py-1 border border-gray-300 rounded shadow"
                              name="shortDesc"
                              value={shortDesc}
                              onChange={(event: any) =>
                                setShortDesc(event.target.value)
                              }
                            ></textarea>
                          </div>
                      </div>

                      <div className="flex justify-end mt-3 mb-3">
                        <form method="dialog">
                          {/* <div className="flex justify-end"> */}
                          <button
                            onClick={handleUpload}
                            disabled={
                              !selectedFile || !title || !publishedBy || !selectedYear
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
                  <h3 className="text-2xl font-bold">Edit Report Details</h3>
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
                            Enter Title
                          </span>
                        </label>
                        <input
                          name="title"
                          type="text"
                          placeholder="Type here"
                          value={editTitle}
                          className="w-full input input-bordered"
                          onChange={(event: any) =>
                            setEditTitle(event.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="label">
                          <span className="text-lg label-text">
                           Published By
                          </span>
                        </label>
                        <input
                          name="memberProfession"
                          type="text"
                          placeholder="Type here"
                          value={editPublishedBY}
                          className="w-full input input-bordered"
                          onChange={(event: any) =>
                            setEditPublishedBY(event.target.value)
                          }
                        />
                      </div>
                      <div className="relative inline-block text-left">
                            <label className="label">
                              <span className="text-lg label-text">
                                Select Year
                              </span>
                            </label>
                            <select
                              className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-400 focus:outline-none focus:shadow-outline"
                              name="year"
                              value={editSelectedYear}
                              onChange={handleEditYearSelect}
                            >
                              <option value="" disabled>
                                Select a year
                              </option>
                              {years.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                          </div>
                      <div className="">
                        <label className="label">
                          <span className="text-lg label-text">
                            Select Report Pdf
                          </span>
                        </label>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleEditFileChange}
                          className="w-full file-input file-input-bordered file-input-md"
                        />
                      </div>
                      <div>
                            <label className="label">
                              <span className="text-lg label-text">
                                Short Description
                              </span>
                            </label>
                            <textarea
                              rows={3}
                              placeholder="Enter Short Description"
                              className="w-full px-4 py-1 border border-gray-300 rounded shadow"
                              name="shortDesc"
                              value={editShortDesc}
                              onChange={(event: any) =>
                                setEditShortDesc(event.target.value)
                              }
                            ></textarea>
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
                      !editPublishedBY || !editTitle || !selectedFile
                        ? "bg-grey"
                        : ""
                    } bg-[#5393E8] text-white active:bg-[#5393E8] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type="button"
                    onClick={handleEditSubmit}
                    disabled={
                      !editPublishedBY || !editTitle || !selectedFile
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
    )
};

export default Report;
