

export const loginUser = async (email: any, password: any) => {
  try{
  let body = {
    user_email: email,
    password: password,
  };

  const res = await fetch("http://127.0.0.1:5000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),

  });
  //return res.json();
  
 if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error in loginUser:", error);
    throw error;
  }
};
