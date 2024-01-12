import { baseUrl } from "../../constants";

export const getReport = async () => {
    const res = await fetch(baseUrl + "/report/getReport", {
      method: "GET", // Use GET method for a GET request
    });
    const data = await res.json();
    return data;
  };
  

  export const deleteReport = async (props: any) => {
    const res = await fetch(baseUrl + `/report/deleteReport/${props}`, {
      method: "DELETE", // Use GET method for a GET request
    });
    const data = await res.json();
    return data;
  };

  
export const getReportById = async (props: any) => {
  const res = await fetch(baseUrl + `/report/getReportById/${props}`, {
    method: "GET", // Use GET method for a GET request
  });
  const data = await res.json();
  return data[0];
};
