import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t py-12">
      {/* what should be added */}
      <div className="container mx-auto flex flex-col md:flex-row   grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0  justify-around">
        <div>
          <h3 className="text-lg text-gray-800 mb-4 ">Newsletter</h3>
          <p className="text-gray-500 mb-4">
            Be the first to hear about new products, excution events,and online
            offers
          </p>
          <p className="font-medium text-sm text-gray-600 mb-3">
            Sign up and 10% off your first order.
          </p>
          {/* Newsletter form */}
          <form action="" className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w:[32rem]  text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all  "
              required
            />
            <button
              type="submit"
              className="bg-black text-white text-sm rounded-r-md hover:bg-gray-800 transition-all px-2 py-2"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* shop Links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
          <ul>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Men's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Women's Top Wear
              </Link>
            </li>{" "}
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Men's Bottom Wear
              </Link>
            </li>{" "}
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Women's Bottom Wear
              </Link>
            </li>
          </ul>
        </div>
        {/* Support links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Support</h3>
          <ul>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                About Us
              </Link>
            </li>{" "}
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                FAQs
              </Link>
            </li>{" "}
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Features
              </Link>
            </li>
          </ul>
        </div>
        {/* Follow us */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4 ">Follow Us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-800"
            >
              <TbBrandMeta />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-800"
            >
              <IoLogoInstagram />
            </a>{" "}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-800"
            >
              <RiTwitterXLine />
            </a>
          </div>
          <p className="text-gray-500">Call Us</p>
          <p>
            <FiPhoneCall className="inline-block mr-2" />
            0123-456-789
          </p>
        </div>
      </div>
      {/* footer bootom */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-500 text-sm tracking-tighter text-center">
          © 2025,CompileTab. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
