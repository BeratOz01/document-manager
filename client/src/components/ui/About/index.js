import React from "react";

const About = () => {
  return (
    <div
      className="flex w-8/12 mx-auto montserrat px-8 my-20 flex-col"
      id="about"
    >
      <p className="tracking-tighter font-bold text-5xl text-left">
        How Are Things Done Technically ?
      </p>
      <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 px-1">
        Document Manager is not keep any private or important data in the
        blockchain. Instead of keeping all of the data in the blockchain, it is
        only keeping the 256 bit hash of the data and{" "}
        <span className="font-bold">mint</span> it to your account like NFTs.
        This is a way to keep your data private and secure.
      </p>
      <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 px-1">
        This hash contains:
        <ul class="list-disc dark:text-gray-400 ml-10 mt-1 text-md">
          <li>Name of the Document</li>
          <li>Uploader address</li>
          <li>IPFS Hash</li>
        </ul>
        With this hash no one can guess the data of the document.
      </p>
      <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 px-1">
        After user send transaction to the smart contract, the smart contract
        will mint the document to the user's account. Then, user need to upload
        document to backend server. When uploading this document to the server,
        user need to send components of hash to the server, too. This is a way
        to verify the document is uploaded by correct user.
      </p>
    </div>
  );
};

export default About;
