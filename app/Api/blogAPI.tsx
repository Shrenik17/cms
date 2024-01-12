import { baseUrl } from "../../constants";

export const fetchBlog = async () => {
  const res = await fetch(baseUrl+ "/blog/getAllBlogs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log("data", data);
  return data;
};

export const addBlog = async (props: any) => {
  console.log(props);
  // const res = await fetch(baseUrl+ "/addBlog", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(props),
  // });
  // console.log(res);
};

export const fetchSingleBlog = async (props: any) => {
  const res = await fetch(baseUrl+ `/blog/getSingleBlog/${props}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};
export const deleteblog = async (props: any) => {
  const res = await fetch(baseUrl+ `/blog/deleteBlog/${props}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res);
};
