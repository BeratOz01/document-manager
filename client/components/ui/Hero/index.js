import React from "react";

import Link from "next/link";

const Hero = () => {
  return (
    <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div class="sm:text-center lg:text-left">
        <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl montserrat">
          <span class="block xl:inline text-center">
            Store {"&"} Control Access Of Your Documents
          </span>{" "}
          <span class="block text-indigo-600 xl:inline">With Blockchain</span>
        </h1>
        <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 montserrat">
          Document Manager is a web application that allows you to store and
          control your documents based on blockchain technology. It is a simple
          and secure way to store your documents and control your access.
        </p>
        <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start montserrat">
          <div class="rounded-md shadow">
            <Link href="/dashboard">
              <div class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                Go Dashboard
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
