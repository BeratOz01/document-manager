import React from "react";

// Hooks
import { useAccount } from "components/hooks";
import { useWeb3 } from "components/providers";

// Client instance for axios requests
import { axiosClient } from "utils/axiosClient";

// Loading
import { Watch } from "react-loader-spinner";

// Components
import Modal from "../Modal";

const MyDocument = ({ handleSetTab }) => {
  const [files, setFiles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [error, setError] = React.useState(null);

  const [showModal, setShowModal] = React.useState(false);
  const [hash, setHash] = React.useState();

  const { account } = useAccount();
  const { web3, contract } = useWeb3();

  React.useEffect(() => {
    const fetchData = async () => {
      await axiosClient
        .get("/file/@mine", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((resp) => {
          setFiles(resp.data.files);
        })
        .catch((e) => {
          console.log(e);
          setError(e);
        })
        .finally(() => setLoading(false));
    };

    if (account?.data && web3 && contract) fetchData();
  }, [web3, contract, account?.data]);

  return (
    <div className="flex w-full flex-col">
      {loading ? (
        <Watch
          height="150"
          width="150"
          color="#2563eb"
          wrapperClass="mx-auto mt-24"
        />
      ) : (
        <>
          {files.length == 0 ? (
            <p className="font-bold text-center text-xl mt-10">
              You do not have any files uploaded.
            </p>
          ) : (
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <Modal
                show={showModal}
                closeModal={() => setShowModal(false)}
                hash={hash}
                web3={web3}
                contract={contract}
                account={account}
              />
              <table class="w-full text-sm text-left text-gray-500 ">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      ID
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Path
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Shared With
                    </th>
                    <th scope="col" class="px-6 py-3">
                      <span class="sr-only">Add</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((elem) => (
                    <tr class="bg-white border-b ">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900  whitespace-nowrap"
                      >
                        {elem._id}
                      </th>
                      <td class="px-6 py-4">{elem.name.slice(0, 10)}</td>
                      <td class="px-6 py-4">{elem.path.slice(0, 10)}...</td>
                      <td class="px-6 py-4">
                        {elem.allowedAddresses.length} Addresses
                      </td>
                      <td class="px-6 py-4 text-right">
                        <p
                          class="font-medium text-blue-600 inline cursor-pointer dark:text-blue-500 hover:underline"
                          onClick={() => {
                            setHash(elem.hash);
                            setShowModal(true);
                          }}
                        >
                          Give Access
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      <p
        className=" w-4/12 mx-auto mt-10 relative rounded px-5 py-2.5 overflow-hidden group bg-blue-500  hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300 cursor-pointer"
        onClick={handleSetTab}
      >
        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
        <span className="relative">Upload Document</span>
      </p>

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

export default MyDocument;
