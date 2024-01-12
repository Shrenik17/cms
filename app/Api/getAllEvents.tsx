import { baseUrl } from "../../constants";

export const getAllEventsNews = async () => {
  const res = await fetch(baseUrl + "/events/getAllEventsNews", {
    method: "GET", // Use GET method for a GET request
  });
  const data = await res.json();
  return data;
};
