import React from "react";

const Flow = () => {
  return (
    <div className="mx-auto w-8/12 mt-28 flex  justify-center space-x-5 py-10 montserrat">
      <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-xl text-center">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          1.
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Log In to with your Metamask account to start using Document Manager
          with only one signing.
        </p>
      </div>
      <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-xl text-center">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          2.
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Upload your documents to the application.
        </p>
      </div>
      <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-xl text-center">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          3.
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Set the access of your documents with blockchain.
        </p>
      </div>
    </div>
  );
};

export default Flow;
