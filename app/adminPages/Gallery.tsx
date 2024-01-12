import React, { useState ,useEffect} from 'react'
import { Column , useTable} from 'react-table';
import NoData from "../components/NoData";
import { RxCross1 } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../constants";
import { getAllGalleryImages , deleteGalleryImages } from "../Api/galleryAPI";
const Gallery = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title,setTitle] = useState("");
  const [galleryImageLink, setGalleryImageLink] = useState("");
  const [editSelectedImage, setEditSelectedImage] = useState<File | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editGalleryImageLink, setGalleryEditImageLink] = useState("");
  const [galleryImageId, setGalleryImageId] = useState("");
  const [data, setData] = useState<any>([]);
  const [shortDesc, setShortDesc] = useState("");
  const [editShortDesc, setEditShortDesc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      setEditSelectedImage(event.target.files[0]);
    }
  };
 
  const formData = new FormData();
  const handleUpload =() =>{
    if(selectedFile){
      formData.append("title",title);
      formData.append("galleryImageLink",galleryImageLink);
      formData.append("galleryImage",selectedFile);
      formData.append("shortDesc", shortDesc);

      fetch(baseUrl + "/gallery/addGalleryImage", {
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
          setGalleryImageLink("");
          setTitle("");
          setShortDesc("");

        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          // Handle the error and update the UI accordingly
        });
    }
  }
 
  const handleEdit = async (cell: any) => {
    setGalleryImageId(cell.row.original.id);
    
    await fetch(baseUrl + `/gallery/getGalleryImageById/${cell.row.original.id}`, {
      method: "GET", // Use GET method for a GET request
    })
      .then((res) => res.json())
      .then((res) => {
        setEditTitle(res[0].title);
        setGalleryEditImageLink(res[0].galleryImageLink);
        setEditShortDesc(res[0].shortDesc);
      })
      .then(() => {
        openEditModal();
      });
  };
  // const getData = async () => {
  //   let response = await getAllGalleryImages();
  //   setData(response.data);
  //   if (response.type) {
  //     setResponseType("true");
  //   }
  // };

  const getData = async () => {
    return await getAllGalleryImages();
  };
  
  useEffect(() => {
    getData();
  }, []);
  
  useEffect(() => {
    getData();
  }, [dataUpdate]);

  const handleDelete = async (cellValue: any) => {
    let response = await deleteGalleryImages(cellValue.row.original.id);
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
  
  let columns = React.useMemo<Column<any>[]>(
      () => [
        {
          Header: "Title",
          accessor: "title",
        },
        {
          Header: "Image",
          accessor: "galleryImage",
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
          accessor: "galleryImageLink",
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

  const handleEditUpload = () => {
    if (editSelectedImage) {
      const formData = new FormData();
      formData.append("galleryImage", editSelectedImage);
      formData.append("title", editTitle);
      formData.append("shortDesc", editShortDesc);   
      formData.append("galleryImageLink", editGalleryImageLink);

      // console.log("formData in edit", formData);

      fetch(`http://127.0.0.1:5000/gallery/updateGalleryImages/${galleryImageId}`, {
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
  return (
    <div className="h-screen p-3 overflow-auto pb-28 bg-bggrey">
      <p className="pb-5 text-xl">Gallery Management</p>
      <ToastContainer />
      <div className="bg-white border border-grey">
        <div className="flex justify-between">
          <div className="items-center justify-start mt-3">
      
          </div>

          <label
            className="block px-4 py-2 mx-3 my-3 font-semibold leading-tight text-white border border-gray-300 rounded shadow appearance-none cursor-pointer bg-blue hover:border-gray-400 focus:outline-none focus:shadow-outline"
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
                   
                      <div className="flex justify-between">
                        <div className="grid grid-cols-3 gap-4">
                  
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
                              name="galleryImageLink"
                              type="text"
                              placeholder="Type here"
                              value={galleryImageLink}
                              className="w-full px-4 py-2 border border-gray-300 rounded shadow h-[2.35rem]"
                              onChange={(event: any) =>
                                setGalleryImageLink(event.target.value)
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
                            !galleryImageLink ||
                            !shortDesc 
                         
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
                  <h3 className="text-2xl font-bold">Edit Gallery</h3>
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
                              value={editGalleryImageLink}
                              className="w-full px-4 py-2 border border-gray-300 rounded shadow h-[2.35rem]"
                              onChange={(event: any) =>
                                setGalleryEditImageLink(event.target.value)
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
}

export default Gallery;