import React from "react";

const NavBar = () => {
  return (
    <nav class="flex items-center justify-between flex-wrap p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-10">
        <img
          align="center"
          width="160"
          height="72"
          src="https://collectiveliberty.org/wp-content/uploads/2020/04/cropped-CollectiveLiberty_FullLogo_01_hi.png"
        />
      </div>
      <ul
        role="navigation"
        class="w-full block justify-end lg:flex lg:items-center lg:w-auto leading-none text-2xl lg:flex-grow"
      >
        <li>
          <a
            href=""
            class="block mt-4 lg:inline-block lg:mt-0 p-8 text-white hover:text-blue-500 mr-10 bg-black"
            aria-label="Explore the Data"
          >
            Explore the Data
          </a>
        </li>
        <li>
          <a
            href=""
            class="block mt-4 lg:inline-block lg:mt-0 p-8  text-black hover:text-blue-500 mr-10"
            aria-label="About Us"
          >
            About Us
          </a>
        </li>
        <li>
          <a
            href=""
            class="block mt-4 lg:inline-block lg:mt-0 p-6 text-white hover:text-blue-500 bg-orange-500"
            aria-label="Donate Now"
          >
            Donate Now
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
