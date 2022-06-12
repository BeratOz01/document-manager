import React from "react";

import { useAccount } from "components/hooks";
import { useWeb3 } from "components/providers";

import MyDocument from "components/ui/MyDocument";
import UploadDocument from "components/ui/UploadDocument";

const Dashboard = () => {
  const { account } = useAccount();
  const { web3, contract } = useWeb3();

  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleSetTab = () => setSelectedTab(1);

  return (
    <div className="flex montserrat flex-col">
      <ul className="flex flex-wrap text-md text-center text-gray-500 dark:text-gray-400 mx-auto mt-10 font-bold">
        <li className="mr-10 cursor-pointer">
          <p
            onClick={() => setSelectedTab(0)}
            className={`inline-block py-3 px-4 ${
              selectedTab == 0
                ? "active bg-blue-600 rounded-lg text-white"
                : "rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
            } `}
          >
            My Documents
          </p>
        </li>
        <li className="mr-10 cursor-pointer">
          <p
            onClick={() => setSelectedTab(1)}
            className={`inline-block py-3 px-4 ${
              selectedTab == 1
                ? "active bg-blue-600 rounded-lg text-white"
                : "rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
            } `}
          >
            Upload New Document
          </p>
        </li>
        <li className="mr-10 cursor-pointer">
          <p
            onClick={() => setSelectedTab(2)}
            className={`inline-block py-3 px-4 ${
              selectedTab == 2
                ? "active bg-blue-600 rounded-lg text-white"
                : "rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
            } `}
          >
            All Documents
          </p>
        </li>
      </ul>
      <div className="flex mt-10 container mx-auto">
        {selectedTab == 0 ? (
          <MyDocument handleSetTab={handleSetTab} />
        ) : selectedTab == 1 ? (
          <UploadDocument />
        ) : (
          <p>Other</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
