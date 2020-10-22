import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav class="flex items-center justify-between flex-wrap p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-10">
        <img
          align="center"
          width="160"
          height="72"
          src="https://collectiveliberty.org/wp-content/uploads/2020/04/cropped-CollectiveLiberty_FullLogo_01_hi.png"
          alt="Collective Liberty Logo"
        />
      </div>
      <ul class="w-full block justify-end lg:flex lg:items-center lg:w-auto leading-none text-xl lg:flex-grow">
        <li>
          <Link
            to="/"
            class="block lg:inline-block lg:mt-0 p-8 text-white bg-teal-900 border-b-2 border-teal-900 hover:text-blue-500"
            aria-label="Explore the Data"
          >
            Explore the Data
          </Link>
        </li>
        <li>
          <Link
            to="/"
            class="block lg:inline-block lg:mt-0 p-8 text-teal-900 px-16 border-b-2 border-white hover:text-blue-500 hover:border-teal-900"
            aria-label="About Us"
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            to="/"
            class="block lg:inline-block lg:mt-0 p-6 text-white bg-orange-600 rounded hover:text-blue-500"
            aria-label="Donate Now"
          >
            Donate Now
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
