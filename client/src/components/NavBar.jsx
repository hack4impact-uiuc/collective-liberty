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
      <div class="w-full block justify-end lg:flex lg:items-center lg:w-auto leading-none">
        <div class="text-2xl lg:flex-grow">
          <a
            href=""
            class="block mt-4 lg:inline-block lg:mt-0 p-8 text-white hover:text-blue-500 mr-10 bg-black"
          >
            Explore the Data
          </a>
          <a
            href=""
            class="block mt-4 lg:inline-block lg:mt-0 p-8  text-black hover:text-blue-500 mr-10"
          >
            About Us
          </a>
          <a
            href=""
            class="block mt-4 lg:inline-block lg:mt-0 p-6 text-white hover:text-blue-500 bg-orange-500"
          >
            Donate Now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
