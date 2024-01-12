import React, { useState, useMemo } from "react";
import { Column, useTable } from "react-table";
import NoData from "../components/NoData";
import { getAllEventsNews } from "../Api/getAllEvents";
import { RxCross1 } from "react-icons/rx";

import { deleteEventNews } from "../Api/deleteEvent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../constants";
import Link from "next/link";
const Events = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [memberName, setMemberName] = useState("");

  const [title, setTitle] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [editEventType, setEditEventType] = useState("");
  const [editSelectedYear, setEditSelectedYear] = useState("");
  const [editSelectedImage, setEditSelectedImage] = useState<File | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [eventType, setEventType] = useState("Events");
  const [editEventLink, setEditEventLink] = useState("");
  const [participants, setParticipants] = useState("");
  const [editShortDesc, setEditShortDesc] = useState("");
  const [eventNewsID, setEventNewsID] = useState("");
  const [editParticipants, setEditParticipants] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [data, setData] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sortedData, setSortedData] = useState<any[]>([]);
  const [userData, setUserData] = useState<any[]>([]);
  const [options, setOptions] = useState("Events");
  const [dataUpdate, setDataUpdate] = useState(false);
  // State to store the selected year
  const [selectedYear, setSelectedYear] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleEditFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setEditSelectedImage(event.target.files[0]);
    }
  };
  // console.log(selectedFile);

  const formData = new FormData();
  const handleUpload = () => {
    if (selectedFile) {
      // title, eventNewsType, eventNewsYear, shortDesc, participants, eventNewsLink
      formData.append("eventImage", selectedFile);
      formData.append("title", title);
      formData.append("shortDesc", shortDesc);
      formData.append("eventNewsType", eventType);
      formData.append("eventNewsLink", eventLink);
      formData.append("eventNewsYear", selectedYear);
      formData.append("participants", participants);
      // console.log("selectedfile", selectedFile);

      fetch(baseUrl + "/events/addEventNews", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          // console.log("body", formData);
          // console.log("response", res);
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
          setSelectedFile(null);
          setEventLink("");
          setParticipants("");
          setSelectedYear("");
          setTitle("");
          setShortDesc("");
          // console.log("data", data);
          // console.log(res)
          // Perform any additional actions or update the UI as needed
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          // Handle the error and update the UI accordingly
        });
    }
  };
  const handleEdit = async (cell: any) => {
    setEventNewsID(cell.row.original.id);
    // console.log("Single USer Data", eventNewsID);
    await fetch(baseUrl + `/events/getEventsNewsById/${cell.row.original.id}`, {
      method: "GET", // Use GET method for a GET request
    })
      .then((res) => res.json())
      .then((res) => {
        setEditTitle(res[0].title);
        setEditEventLink(res[0].eventNewsLink);
        setEditEventType(res[0].eventNewsType);
        setEditParticipants(res[0].participants);
        // setEditSelectedImage(res[0].imagePath);
        setEditSelectedYear(res[0].eventNewsYear);
        setEditShortDesc(res[0].shortDesc);
      })
      .then(() => {
        openEditModal();
      });
  };

  // console.log("data event", data);
  // console.log("options", options);
  const getData = async () => {
    return await getAllEventsNews();
    // console.log("get members response", response);
  };
  // useEffect(() => {
  //   getData();
  // }, []);
  const handleDelete = async (cellValue: any) => {
    let response = await deleteEventNews(cellValue.row.original.id);
    console.log(response);
    if (response) {
      toast.error("Deleted Successfully!", {
        position: "bottom-right",
        autoClose: 1000,
      });
      setDataUpdate(!dataUpdate);
    }
    // getData();
  };
  useMemo(async () => {
    await getData().then((res) => {
      // console.log("res - ", res);
      if (res && res.length != 0) {
        const filteredData = res.filter(
          (item: any) => item.eventNewsType == options
        );
        // console.log("filtered", filteredData);
        setData(filteredData);
      }
    });
  }, [options]);

  useMemo(async () => {
    await getData().then((res) => {
      // console.log("res - ", res);
      if (res && res.length != 0) {
        const filteredData = res.filter(
          (item: any) => item.eventNewsType == options
        );
        // console.log("filtered", filteredData);
        setData(filteredData);
      }
    });
  }, [dataUpdate]);
  // console.log("sorted data", data);

  let columns = React.useMemo<Column<any>[]>(
    () => [
      // {
      //   Header: "Sr .No.",
      //   accessor: "title",
      // },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Year",
        accessor: "eventNewsYear",
      },
      {
        Header: "Participants",
        accessor: "participants",
      },
      {
        Header: "Image",
        accessor: "eventImage",
        Cell: ({ cell }) => {
          return (
            <div className="flex items-center justify-center h-full">
              <img
                src={cell.row.original.imagePath} // Assuming cell.value contains the image URL
                alt=""
                style={{ width: "100px", height: "auto" }} // Adjust the size as needed
              />
            </div>
          );
        },
      },
      {
        Header: "Link",
        accessor: "eventNewsLink",
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
  const openEditModal = () => {
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
  };
  let xdata = useMemo(() => data, [data]);

  // let tableInstance = useTable({ columns, data });
  // useEffect(()=>{
  //   if(data && data.length){
  //     tableInstance = useTable({ columns, data });
  //   }
  // },[data])

  const handleEditUpload = () => {
    if (editSelectedImage) {
      const formData = new FormData();
      formData.append("eventImage", editSelectedImage);
      formData.append("title", editTitle);
      formData.append("shortDesc", editShortDesc);
      formData.append("eventNewsType", editEventType);
      formData.append("eventNewsLink", editEventLink);
      formData.append("eventNewsYear", editSelectedYear);
      formData.append("participants", editParticipants);
      // console.log("formData in edit", formData);

      fetch(`http://127.0.0.1:5000/events/updateEventNews/${eventNewsID}`, {
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
          setDataUpdate(!dataUpdate);
          setEditSelectedImage(null);
          // console.log("File uploaded successfully:", data);
          // console.log("data", data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          // Handle the error and update the UI accordingly
        });
    }
    closeEditModal();
    getData();
  };
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

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
      <p className="pb-5 text-xl">Events Management</p>
      <ToastContainer />
      <div className="bg-white border border-grey">
        <div className="flex justify-between">
          <div className="items-center justify-start mt-3">
            <label className="px-2 my-4 ml-2 font-semibold">
              Select Type :{" "}
            </label>
            <select
              className="px-6 py-1 font-semibold bg-white border-b-2 border-gray-200 rounded shadow-md appearance-none focus:outline-none focus:shadow-outline"
              name="options"
              value={options}
              onChange={(event: any) => setOptions(event.target.value)}
            >
              <option value="Events">Event</option>
              <option value="News">News</option>
            </select>
          </div>

          <label
            className="block px-4 py-2 mx-3 my-3 font-semibold leading-tight text-white border border-gray-300 rounded shadow appearance-none cursor-pointer bg-blue hover:border-gray-400 focus:outline-none focus:shadow-outline"
            // htmlFor="my-modal-4"
            onClick={() => setIsOpen(true)}
          >
            Add Media
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
                  <h3 className="text-2xl font-bold">Add New Media</h3>
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
                      {/* <div className="divider"></div> */}
                      <div className="flex justify-between">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="relative inline-block text-left">
                            <label className="label">
                              <span className="text-lg label-text">
                                Select Type
                              </span>
                            </label>
                            <select
                              className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-400 focus:outline-none focus:shadow-outline"
                              name="eventType"
                              value={eventType}
                              onChange={(event: any) =>
                                setEventType(event.target.value)
                              }
                            >
                              <option value="Events">Event</option>
                              <option value="News">News</option>
                            </select>
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
                                Select a year
                              </option>
                              {years.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                          </div>
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
                              className="w-full px-4 py-2 border border-gray-300 rounded shadow h-[2.35rem]"
                              onChange={(event: any) =>
                                setTitle(event.target.value)
                              }
                            />
                          </div>

                          <div className="">
                            <label className="label">
                              <span className="text-lg label-text">
                                Select Image (.png)
                              </span>
                            </label>
                            <input
                              type="file"
                              accept=".png"
                              onChange={handleFileChange}
                              className="w-full px-2 py-1 border border-gray-300 rounded shadow h-[2.35rem]"
                            />
                          </div>
                          <div>
                            <label className="label">
                              <span className="text-lg label-text">
                                Enter Link
                              </span>
                            </label>
                            <input
                              name="eventLink"
                              type="text"
                              placeholder="Type here"
                              value={eventLink}
                              className="w-full px-4 py-2 border border-gray-300 rounded shadow h-[2.35rem]"
                              onChange={(event: any) =>
                                setEventLink(event.target.value)
                              }
                            />
                          </div>
                          <div>
                            <label className="label">
                              <span className="text-lg label-text">
                                Enter Participants
                              </span>
                            </label>
                            <input
                              name="participants"
                              type="text"
                              placeholder="Type here"
                              value={participants}
                              className="w-full px-4 py-2 border border-gray-300 rounded shadow h-[2.35rem]"
                              onChange={(event: any) =>
                                setParticipants(event.target.value)
                              }
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
                      </div>
                      <div className="flex justify-end mb-6">
                        <button
                          onClick={handleUpload}
                          disabled={
                            !selectedFile ||
                            !title ||
                            !eventType ||
                            !eventLink ||
                            !shortDesc ||
                            !participants
                          }
                          className="btn btn-primary"
                        >
                          <label>Submit</label>
                        </button>
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

        {data.length != 0 ? (
          <div className="p-4 overflow-x-scroll">
            <table className="min-w-full bg-white border border-grey">
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    <th>Sr. No</th>
                    {headerGroup.headers.map((column, index) => (
                      <th
                        {...column.getHeaderProps()}
                        className="px-4 py-2 font-bold border border-grey"
                        key={index}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                    {/* <th>Action</th> */}
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
                        <>
                          <td
                            {...cell.getCellProps()}
                            className="px-4 py-2 text-center border whitespace-nowrap border-grey"
                            key={index}
                          >
                            {cell.render("Cell")}
                          </td>
                        </>
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
                  <h3 className="text-2xl font-bold">Edit Media</h3>
                  <button
                    className="p-2 ml-auto text-2xl text-black bg-transparent border-0 outline-none focus:outline-none"
                    onClick={closeEditModal}
                  >
                    <RxCross1 />
                  </button>
                </div>
                <div className="items-start divider"></div>
                {/* Body */}
                <div className="relative flex-auto px-6">
                  {" "}
                  <div className="">
                    <div className="flex justify-between"></div>
                    <div>
                      <div className="flex justify-between">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="relative inline-block text-left">
                            <label className="label">
                              <span className="text-lg label-text">
                                Select Type
                              </span>
                            </label>
                            <select
                              className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-400 focus:outline-none focus:shadow-outline"
                              name="eventType"
                              value={editEventType}
                              onChange={(event: any) =>
                                setEditEventType(event.target.value)
                              }
                            >
                              {/* <option value={editEventType}>{editEventType}</option> */}
                              <option value="Event">Event</option>
                              <option value="News">News</option>
                            </select>
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
                              className="w-full px-4 py-2 border border-gray-300 rounded shadow h-[2.35rem]"
                              onChange={(event: any) =>
                                setEditTitle(event.target.value)
                              }
                            />
                          </div>

                          <div className="">
                            <label className="label">
                              <span className="text-lg label-text">
                                Select Image (.png)
                              </span>
                            </label>
                            <input
                              type="file"
                              accept=".png"
                              onChange={handleEditFileChange}
                              className="w-full px-2 py-1 border border-gray-300 rounded shadow h-[2.35rem]"
                            />
                          </div>
                          <div>
                            <label className="label">
                              <span className="text-lg label-text">
                                Enter Link
                              </span>
                            </label>
                            <input
                              name="memberName"
                              type="text"
                              placeholder="Type here"
                              value={editEventLink}
                              className="w-full px-4 py-2 border border-gray-300 rounded shadow h-[2.35rem]"
                              onChange={(event: any) =>
                                setEditEventLink(event.target.value)
                              }
                            />
                          </div>
                          <div>
                            <label className="label">
                              <span className="text-lg label-text">
                                Enter Participants
                              </span>
                            </label>
                            <input
                              name="participants"
                              type="text"
                              placeholder="Type here"
                              value={editParticipants}
                              className="w-full px-4 py-2 border border-gray-300 rounded shadow h-[2.35rem]"
                              onChange={(event: any) =>
                                setEditParticipants(event.target.value)
                              }
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
                      <div className="flex justify-end mb-6">
                        <button
                          onClick={handleEditUpload}
                          disabled={!editSelectedImage}
                          className="btn btn-primary"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
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

export default Events;
