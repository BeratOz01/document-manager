import React from "react";

import { useAccount } from "components/hooks";
import { useWeb3 } from "components/providers";

import { axiosClient } from "utils/axiosClient";

const Dashboard = () => {
  const [balanceOf, setBalanceOf] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const { account } = useAccount();
  const { web3 } = useWeb3();

  React.useEffect(() => {
    const fetchData = async () => {};

    if (account?.data && web3) fetchData();
  }, [account?.data, web3]);

  return (
    <div>
      <p onClick={() => console.log("d")}>Dashboard</p>
    </div>
  );
};

export default Dashboard;
