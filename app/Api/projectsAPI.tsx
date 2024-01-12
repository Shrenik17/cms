import { baseUrl } from "../../constants";

export const getAllProjects = async () => {
  const res = await fetch(baseUrl + "/projects/getAllProjects", {
    method: "GET", // Use GET method for a GET request
  });
  const data = await res.json();
  return data;
};

export const deleteProjects = async (props: any) => {
  const res = await fetch(baseUrl + `/projects/deleteProject/${props}`, {
    method: "DELETE", // Use GET method for a GET request
  });
  const data = await res.json();
  return data;
};
