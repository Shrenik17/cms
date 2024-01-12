import Image from "next/image";
import React from "react";
import logo from "../../assets/logo.png";
const Navbar = () => {
  return (
    <div className="absolute inset-0 flex h-24 navbar top-7">
      <div className="navbar-start">
        <div className=" dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <p>About</p>
            </li>
            <li>
              <p>The Journey</p>
            </li>
            <li>
              <p>Project</p>
            </li>
            <li>
              <p>Event</p>
            </li>
            <li>
              <p>Contact</p>
            </li>
            <li>
              <button className="px-6 py-3 mx-3 my-3 font-semibold text-white uppercase rounded bg-blue">
                Login
              </button>
            </li>
            <li>
              <button className="px-6 py-3 mx-3 my-3 font-semibold text-white uppercase rounded bg-blue">
                Language
              </button>
            </li>
          </ul>
        </div>
        <div>
          <Image src={logo} alt="" className="ml-16 h-30" />
        </div>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 menu menu-horizontal">
          <li>
            <p className="font-semibold uppercase">About</p>
          </li>
          <li>
            <p className="font-semibold uppercase">The Journey</p>
          </li>
          <li>
            <p className="font-semibold uppercase">Project</p>
          </li>
          <li>
            <p className="font-semibold uppercase">Event</p>
          </li>
          <li>
            <p className="font-semibold uppercase">Contact</p>
          </li>
        </ul>
      </div>
      <div className="hidden navbar-end lg:flex">
        <button className="px-6 py-3 mx-3 font-semibold text-white uppercase rounded bg-blue">
          Login
        </button>
        <button className="px-6 py-3 mx-3 font-semibold text-white uppercase rounded bg-blue">
          Language
        </button>
      </div>
    </div>
  );
};

export default Navbar;
