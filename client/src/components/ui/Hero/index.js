import React from "react";

const Hero = () => {
  return (
    <main
      className="mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"
      id="hero"
    >
      <div className="sm:text-center lg:text-left">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl montserrat">
          <span className="block xl:inline text-center">
            Store {"&"} Control Access Of Your Documents
          </span>{" "}
          <span className="block text-indigo-600 xl:inline">
            With Blockchain
          </span>
        </h1>
        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 montserrat">
          Document Manager is a web application that allows you to store and
          control your documents based on blockchain technology. It is a simple
          and secure way to store your documents and control your access.
        </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start montserrat">
          <div className="rounded-md shadow">
            <a href="/dashboard">
              <div className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                Go Dashboard
              </div>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
