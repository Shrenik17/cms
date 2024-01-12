
// export const getEventNewsById = async (props: any) => {
//     const res = await fetch(`http://localhost:5000//getEventsNewsById/${props}`, {
//       method: "GET", // Use GET method for a GET request
//     });
//     const data = await res.json();
//     return data[0];

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