import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-50 py-10">
      <div className="flex flex-col items-center sm:flex-row sm:justify-between container mx-auto">
        <p className="text-sm text-gray-400">
          © Copyright by face media in 2022. All Rights Reserved.
        </p>

        <div className="flex mt-3 -mx-2 sm:mt-0">
          <a
            href="/"
            className="mx-2 text-sm text-gray-400 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
            aria-label="Reddit"
          >
            {" "}
            Teams{" "}
          </a>

          <a
            href="/"
            className="mx-2 text-sm text-gray-400 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
            aria-label="Reddit"
          >
            {" "}
            Privacy{" "}
          </a>

          <a
            href="/"
            className="mx-2 text-sm text-gray-400 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
            aria-label="Reddit"
          >
            {" "}
            Cookies{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
