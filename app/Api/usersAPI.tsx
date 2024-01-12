export const fetchUsers = async () => {
  // const res = await fetch("http://localhost:8080/users", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // const data = await res.json();
  // return data;
};

export const addUser = async (props: any) => {
  const res = await fetch("http://localhost:8080/addusers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
  console.log(res);
};

export const deleteUser = async (props: any) => {
  const res = await fetch(`http://localhost:8080/deleteuser/${props}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res);
};

export const getSingleUser = async (props: any) => {
  const res = await fetch(`http://localhost:8080/getSingleUser/${props}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  return data[0];
};
