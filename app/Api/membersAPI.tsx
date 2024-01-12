import { baseUrl } from "../../constants";
export const addMember = async (props: any) => {
  console.log("props in api", props);
  // const formData = new FormData();
  // formData.append("file", props.member_photo);
  // formData.append("memberName", props.memberName);
  // console.log(formData);
  // const res = await fetch("http://localhost:5000/members/addMember", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(props.file),
  // });
  // console.log(res);
};

export const getMember = async () => {
  const res = await fetch(baseUrl + "/members/getMembers", {
    method: "GET", // Use GET method for a GET request
  });
  const data = await res.json();
  return data;
};

export const deleteMember = async (props: any) => {
  const res = await fetch(baseUrl + `/members/deleteMember/${props}`, {
    method: "DELETE", // Use GET method for a GET request
  });
  const data = await res.json();
  return data;
};

export const getMemberById = async (props: any) => {
  const res = await fetch(baseUrl + `/members/getMember/${props}`, {
    method: "DELETE", // Use GET method for a GET request
  });
  const data = await res.json();
  return data[0];
};
