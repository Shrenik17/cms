


import { baseUrl } from "../../constants";

//   };
export const deleteEventNews = async (props: any) => {
    const res = await fetch(
      baseUrl + `/events/deleteEvent/${props}`,
      {
        method: "DELETE", // Use GET method for a GET request
      }
    );
    const data = await res.json();
    return data;
  };