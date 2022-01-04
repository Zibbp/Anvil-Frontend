import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

const Navbar = () => {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const { theme, setTheme } = useTheme();

  const menu = [
    { title: "Home", path: "/" },
    { title: "Channels", path: "/channels" },
  ];

  return (
    <>
      <nav className="bg-white shadow dark:bg-ytd-800">
        <div className="container px-6 py-2 mx-auto md:flex">
          <div className="flex items-center justify-between">
            <div>
              <a
                className="text-2xl font-bold text-gray-800 dark:text-gray-100 lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                href="#"
              >
                Anvil
              </a>
            </div>

            <div className="flex md:hidden">
              <button
                type="button"
                className="text-gray-500 dark:text-ytd-200 hover:text-gray-600 dark:hover:text-gray-400 dark:hover:bg-ytd-700 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="w-full md:flex md:items-center md:justify-between">
            <div className="flex flex-col px-2 py-3 -mx-4 md:flex-row md:mx-0 md:py-0">
              {menu.map((item, index) => (
                <Link key={index} href={item.path}>
                  <a className="px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-gray-900 dark:hover:bg-ytd-700 hover:text-gray-100 md:mx-2">
                    {item.title}
                  </a>
                </Link>
              ))}
            </div>

            <div className="relative flex">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>

              <input
                type="text"
                className="w-full mr-4  py-2 pl-10 pr-4 text-gray-700 bg-white dark:bg-ytd-800 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Search"
              />
              <div className=" justify-end flex items-end space-x-1">
                <div className="relative">
                  <div
                    onClick={() => setShow(!show)}
                    className="bg-white dark:bg-ytd-800 flex items-center justify-between  rounded w-auto cursor-pointer"
                  >
                    <p className="pl-3 py-3 text-gray-600 dark:text-gray-4000 text-sm leading-3 tracking-normal font-normal">
                      {theme == "light" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      )}
                      {theme == "dark" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                          />
                        </svg>
                      )}
                      {theme == "system" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                    </p>
                    <div className="cursor-pointer text-gray-600 dark:text-gray-400 mr-3"></div>
                  </div>
                  {show && (
                    <ul className="visible z-10 transition duration-300 opacity-100 bg-white dark:bg-gray-800 shadow rounded mt-2 pb-1 w-auto absolute">
                      <li
                        onClick={() => setTheme("light")}
                        className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm dark:hover:bg-gray-600 dark:hover:text-white leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </li>
                      <li
                        onClick={() => setTheme("dark")}
                        className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm dark:hover:bg-gray-600 dark:hover:text-white leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                          />
                        </svg>
                      </li>
                      <li
                        onClick={() => setTheme("system")}
                        className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm dark:hover:bg-gray-600 dark:hover:text-white leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
