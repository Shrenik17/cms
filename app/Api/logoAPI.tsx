import { baseUrl } from "../../constants";

export const getAllLogoImages = async () => {
  const res = await fetch(baseUrl + "/logo/getAllLogoImages", {
    method: "GET", 
  });
  const data = await res.json();
  return data;
};

export const  deleteLogoImages = async (props: any) => {
    const res = await fetch(
      baseUrl + `/logo/deleteLogoImages/${props}`,
      {
        method: "DELETE", 
      }
    );
    const data = await res.json();
    return data;
  };
