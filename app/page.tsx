"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import Users from "./adminPages/Users";
import Blogs from "./adminPages/Blogs";
// import Activities from "./adminPages/Activities";
// import AddSection from "./adminPages/AddSection";
// import { fetchSection } from "./Api/api";
// import DynamicForm from "./adminPages/DynamicForm";
import Members from "./adminPages/Members";
import Login from "./Login";

const Home = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default Home;
