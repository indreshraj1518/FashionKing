import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import React from "react";

const Topbar = () => {
  return (
    <div className="bg-rabit-red text-white">
      <div className="container mx-auto flex justify-between py-3 px-20  ">
        <div className="hidden  md:flex items-center space-x-4  ">
          <a href="#" className="hover:text-gray-300">
            <TbBrandMeta className="h-6 w-6" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <IoLogoInstagram className="h-6 w-6" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <RiTwitterXLine className="h-6 w-6" />
          </a>
        </div>
        <div className="text-sm text-center flex-grow">
          <span>we ship worldwide -fast and reliable shipping!</span>
        </div>
        <div className="text-sm hidden md:block">
          <a href="tel:+1234567890" className="hover:text-gray-300">
            +1(234)567-890
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
