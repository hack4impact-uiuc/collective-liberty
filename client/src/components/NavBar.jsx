import React from "react";
import { Link } from "react-router-dom";
import "../styles/colors.css";

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
            class="block lg:inline-block lg:mt-0 p-8 text-white bg-dark-green border-b-2 border-dark-green hover:text-blue-500"
            aria-label="Explore the Data"
          >
            Explore the Data
          </Link>
        </li>
        <li>
          <Link
            to="/"
            class="block lg:inline-block lg:mt-0 p-8 txt-dark-green px-16 border-b-2 border-white hover:text-blue-500 hover:border-teal-900"
            aria-label="About Us"
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            to="/"
            class="block lg:inline-block lg:mt-0 p-6 text-white bg-orange rounded hover:text-blue-500"
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
