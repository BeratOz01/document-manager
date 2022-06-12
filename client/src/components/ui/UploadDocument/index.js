import React from "react";

import { ipfsClient } from "utils/ipfsClient";

import { Watch } from "react-loader-spinner";
import { useWeb3 } from "components/providers";
import { useAccount } from "components/hooks";
import { axiosClient } from "utils/axiosClient";

const UploadDocument = () => {
  const { account } = useAccount();
  const [selectedFile, setSelectedFile] = React.useState();
  const [isSelected, setIsSelected] = React.useState(false);

  const [ipfsLoading, setIpfsLoading] = React.useState(false);
  const [path, setPath] = React.useState();
  const [hash, setHash] = React.useState(null);

  const [success, setSuccess] = React.useState(null);
  const [error, setError] = React.useState(null);

  const { web3, contract } = useWeb3();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
    setPath();
    setHash(null);
  };

  const uploadHandler = async () => {
    setIpfsLoading(true);
    const result = await ipfsClient.add(selectedFile);
    setPath(result.path);
    setIpfsLoading(false);
  };

  const sendTransaction = async () => {
    try {
      await contract.methods.mint(hash).send({ from: account?.data });
      await axiosClient
        .post(
          "/file/create",
          {
            sha: hash,
            name: selectedFile.name,
            path: path,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          setSuccess(true);
        })
        .catch((e) => {
          setError(e);
        });
    } catch (e) {}
  };

  React.useEffect(() => {
    const sendTransaction = async () => {
      const t = web3.utils.sha3(
        `${account?.data.toLowerCase()}${path}${selectedFile.name}`
      );
      setHash(t);
    };
    if (web3 && account?.data && path && selectedFile && contract)
      sendTransaction();
  }, [web3, account?.data, path, selectedFile && contract]);

  return (
    <div className="flex flex-col w-full">
      <div className="w-4/12 mx-auto">
        <label
          className="block mb-2 text-sm font-medium text-gray-500"
          htmlFor="file_input"
        >
          Upload file
        </label>
        <input
          className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          onChange={changeHandler}
          accept="application/pdf"
        />
        <p className="mt-1 text-sm text-gray-500" id="file_input_help">
          Only PDF files are allowed.
        </p>
      </div>

      {isSelected && (
        <>
          <p className="text-center mt-10">
            File name: <span className="font-bold">{selectedFile.name}</span>
          </p>
          {path && (
            <p className="text-center mt-2">
              Path: <span className="font-bold">{path}</span>
            </p>
          )}
        </>
      )}

      {isSelected && !path && (
        <p
          className=" w-4/12 mx-auto mt-10 relative rounded px-5 py-2.5 overflow-hidden group bg-blue-500  hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300 cursor-pointer"
          onClick={uploadHandler}
        >
          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span className="relative">
            {ipfsLoading ? (
              <Watch
                height="25"
                width="25"
                color="white"
                wrapperClass="mx-auto relative"
              />
            ) : (
              <span>Upload</span>
            )}
          </span>
        </p>
      )}

      {hash && (
        <p
          className=" w-4/12 mx-auto mt-10 relative rounded px-5 py-2.5 overflow-hidden group bg-blue-500  hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300 cursor-pointer"
          onClick={sendTransaction}
        >
          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span className="relative">Send Transaction</span>
        </p>
      )}

      {success && (
        <div
          class="p-4 mb-4 text-sm text-green-700 text-center bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800 w-4/12 mx-auto mt-20"
          role="alert"
        >
          <span class="font-bold text-center">Success!</span>
        </div>
      )}

      {error && (
        <div
          class="p-4 mb-4 text-sm text-red-700 text-center w-4/12 mx-auto bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 mt-20"
          role="alert"
        >
          <span class="font-bold">An Error Occurred</span>
        </div>
      )}
    </div>
  );
};

export default UploadDocument;
