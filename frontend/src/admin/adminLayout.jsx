import { Link, Outlet } from "react-router-dom";
import React, { useState } from "react";
import logo from '../../public/WhatsApp Image 2024-06-30 at 3.20.11 PM.jpeg'

const AdminSideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const secondToggleNavbar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full text-black border bg-gray-100  shadow-md shadow-gray-500">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="  flex items-center justify-start rtl:justify-end">
              <button
                onClick={toggleNavbar}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className=" inline-flex items-center p-2 text-sm  rounded-lg   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 "
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <div className=" flex ms-2 md:me-24">
                <img
                  src={logo}
                  className=" h-10 me-3 "
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
                  ISKSAFH-KSA
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed shadow-lg shadow-black  top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform duration-700 delay-75  ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gray-100 `}
        aria-label="Sidebar"
      >
        <div className=" h-full px-3 pb-4 overflow-y-auto bg-gray-100  ">
          <ul className="space-y-2 font-medium">
            <li
              onClick={secondToggleNavbar}
              className="flex items-center p-2  rounded-lg text-black hover:bg-gray-600  group"
            >
              <Link to={"/admin/dashboard"}>
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li onClick={secondToggleNavbar}>
              <Link
                to={"/admin/subjects"}
                className="flex items-center p-2  rounded-lg text-black hover:bg-gray-600  group"
              >
                <span className="ms-3">Subject</span>
              </Link>
            </li>
            <li onClick={secondToggleNavbar}>
              <Link
                to={"/admin/create-users"}
                className="flex items-center p-2  rounded-lg text-black hover:bg-gray-600  group"
              >
                <span className="ms-3">Add Teachers</span>
              </Link>
            </li>
            <li onClick={secondToggleNavbar}>
              <Link
                to={"/admin/create-student"}
                className="flex items-center p-2  rounded-lg text-black hover:bg-gray-600  group"
              >
                <span className="ms-3">Add Students</span>
              </Link>
            </li>
            <li onClick={secondToggleNavbar}>
              <Link
                to={"all-users"}
                className="flex items-center p-2  rounded-lg text-black hover:bg-gray-600  group"
              >
                <span className="ms-3">View Teachers</span>
              </Link>
            </li>
            <li onClick={secondToggleNavbar}>
              <Link
                to={"/admin/all-students"}
                className="flex items-center p-2  rounded-lg text-black hover:bg-gray-600  group"
              >
                <span className="ms-3">View Students</span>
              </Link>
            </li>
            <li onClick={secondToggleNavbar}>
              <Link
                to={"/admin/subjects"}
                className="flex items-center p-2  rounded-lg text-black hover:bg-gray-600  group"
              >
                <span className="ms-3">Result</span>
              </Link>
            </li>
            <li onClick={secondToggleNavbar}>
              <Link
                to={"/admin/subjects"}
                className="flex items-center p-2  rounded-lg text-black hover:bg-gray-600  group"
              >
                <span className="ms-3">Report</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div class="p-4 sm:ml-0">
        <Outlet />
      </div>
    </>
  );
};

export default AdminSideBar;
