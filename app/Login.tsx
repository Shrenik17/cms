import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
// import Layout from "@/pages/Components/bLayout";
// import { login } from "@/pages/api/login";
import { useRouter } from "next/navigation";
import { loginUser } from "./Api/login";


// import Dashboard from "./Dashboard";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [link, setLink] = useState("");
  const router = useRouter();
  const [validateForm, setValidateForm] = useState(false);
  const isFormValid = email !== "" && password !== "";

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e: any) => {
    setRememberMe(e.target.checked);
  };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   let response = await loginUser(email, password);
  //   // console.log("-------------",response.type);
  //   if (response && response.type) {
  //     router.push("/Dashboard");
  //   } else {
  //     window.alert("Please Enter Valid Details!");
  //   }
  //   // setValidateForm(true);
  //   console.log(email, password);
  // };
  

const handleSubmit = async (e: any) => {
  e.preventDefault();
    const response = await loginUser(email, password);
      console.log(response);
    
    if (response && response.token) {
      localStorage.setItem('token', response.token);      
      router.push('/Dashboard');
    } else {
      console.error("Invalid response:", response);
      window.alert("Please Enter Valid Details!");
    }
   // setValidateForm(true);
    console.log(email, password);
};

  return (
    <div className="h-screen">
      <br></br>

      <div className="flex w-auto h-auto mt-24 justify-center items-center">
        <br></br>
        <div
          className="bg-white shadow-xl w-full max-w-md"
          style={{ borderRadius: "15px", padding: "20px" }}
        >
          <div className="font-bold text-2xl p-2 border-b-2 border-blue">
            Login
          </div>
          {/* <img
            src="/abgLogo.jpg"
            height={150}
            width={300}
            alt="Logo"
            className="mx-auto mb-4"
          /> */}
          <br></br>
          {/* <h1 className="text-xl font-bold pb-4 leading-tight tracking-tight text-gray-900 ">
            Sign in to your account
          </h1> */}
          <form className="md:space-y-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <i className="fa fa-envelope icon"></i>
              <label htmlFor="email" className="block pb-2 text-gray-600">
                <label className="text-red">* </label>Email:
              </label>

              <input
                type="email"
                id="email"
                name="email"
                className="text-black w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter Email"
                onChange={handleEmailChange}
                value={email}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="pb-2 block text-gray-600">
                <label className="text-red">* </label>Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="text-black w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter Password"
                onChange={handlePasswordChange}
                value={password}
                required
              />
            </div>
            <Link href="/Dashboard">
              <button
                type="submit"
                className="cursor-pointer w-full text-white bg-blue hover:bg-primary-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                style={{ marginTop: "34px" }}
              >
                Sign in
              </button>
            </Link>
          </form>

          <br></br>
        </div>
      </div>
      <br></br>
    </div>
  );
};

export default Login;
