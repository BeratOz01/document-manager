import React, { CSSProperties } from "react";

// Hooks
import { useWeb3 } from "components/providers/web3";
import { useAccount } from "components/hooks";

import { Audio } from "react-loader-spinner";

const Dashboard = () => {
  const { web3, connect } = useWeb3();
  const { account } = useAccount();

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {};

    if (account?.data) fetchData();
  }, [account?.data]);
  return (
    <div className="flex">
      {account?.isValidating == true && (
        <Audio
          height="100"
          width="100"
          color="black"
          ariaLabel="loading"
          wrapperClass="mx-auto mt-52"
        />
      )}
    </div>
  );
};

export default Dashboard;
