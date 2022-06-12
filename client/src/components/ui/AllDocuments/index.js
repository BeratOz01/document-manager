import React from "react";

import { Watch } from "react-loader-spinner";

// Hooks
import { useAccount } from "components/hooks";

import { axiosClient } from "utils/axiosClient";

const AllDocuments = () => {
  const { account } = useAccount();

  const [error, setError] = React.useState(null);

  const [files, setFiles] = React.useState();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      await axiosClient
        .get("/file/allowed/@me", {
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

    fetchData();
  }, []);

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
            {files?.map((elem) => (
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
                  <p class="font-medium text-blue-600 inline cursor-pointer dark:text-blue-500 hover:underline">
                    View
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllDocuments;
