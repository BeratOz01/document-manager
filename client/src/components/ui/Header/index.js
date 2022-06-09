import React from "react";
import { Link } from "react-scroll";

function Header({ account, connect }) {
  return (
    <div>
      <nav className="shadow-sm w-full montserrat">
        <div className="w-full">
          <div className="flex items-center h-20 w-full">
            <div className="flex items-center  mx-20  justify-between w-full">
              <div className="flex justify-center items-center flex-shrink-0">
                <h1 className="font-bold text-xl cursor-pointer">
                  Document Manager
                </h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    to="hero"
                    smooth={true}
                    offset={-50}
                    duration={500}
                    className="cursor-pointer hover:bg-blue-600 text-black hover:text-white px-3 py-2 rounded-md text-md font-bold transition duration-750"
                  >
                    Home
                  </Link>
                  <Link
                    to="about"
                    smooth={true}
                    offset={50}
                    duration={500}
                    className="cursor-pointer hover:bg-blue-600 text-black hover:text-white px-3 py-2 rounded-md text-md font-bold transition duration-750"
                  >
                    About
                  </Link>
                  <Link
                    to="contact"
                    smooth={true}
                    offset={50}
                    duration={500}
                    className="cursor-pointer hover:bg-blue-600 text-black hover:text-white px-3 py-2 rounded-md text-md font-bold transition duration-750"
                  >
                    Contact
                  </Link>
                  <div
                    className="bg-blue-600 text-white font-light montserrat rounded-md cursor-pointer w-52 d-flex transition duration-750 hover:bg-white hover:text-blue-600 hover:border-2 hover:border-blue-600"
                    onClick={account ? null : connect}
                  >
                    <p className="py-2 px-3 text-center">
                      {account
                        ? account.slice(0, 15) + "..."
                        : "Connect Wallet"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
