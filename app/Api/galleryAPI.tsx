import { baseUrl } from "../../constants";

export const getAllGalleryImages = async () => {
  const res = await fetch(baseUrl + "/gallery/getAllGalleryImages", {
    method: "GET", 
  });
  const data = await res.json();
  return data;
};

export const  deleteGalleryImages = async (props: any) => {
    const res = await fetch(
      baseUrl + `/gallery/deleteGalleryImages/${props}`,
      {
        method: "DELETE", 
      }
    );
    const data = await res.json();
    return data;
  };
