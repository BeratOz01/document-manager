import React from "react";

import { SiTwitter, SiGithub, SiLinkedin } from "react-icons/si";

const Contact = () => {
  return (
    <div className="mt-10" id="contact">
      <div className="p-4 w-full text-center  border shadow-md sm:p-8 bg-gray-800 border-gray-700 montserrat">
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Contact Me
        </h5>
        <div className="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 lg:space-x-10">
          <SiGithub
            size={35}
            color="white"
            onClick={() => window.open("https://www.google.com/", "_blank")}
          />
          <SiLinkedin
            size={35}
            color="white"
            onClick={() => window.open("https://www.google.com/", "_blank")}
          />
          <SiTwitter
            size={35}
            color="white"
            onClick={() => window.open("https://www.google.com/", "_blank")}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
