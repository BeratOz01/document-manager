import React from "react";

import { useAccount } from "components/hooks";
import { useWeb3 } from "components/providers";

import { axiosClient } from "utils/axiosClient";

import { Watch } from "react-loader-spinner";

const Dashboard = () => {
  const [balanceOf, setBalanceOf] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const { account } = useAccount();
  const { web3, contract } = useWeb3();

  React.useEffect(() => {
    const fetchData = async () => {
      const b = await contract.methods.balanceOf(account?.data).call();
      setBalanceOf(b);
      console.log(b);
    };

    if (account?.data && web3 && contract) fetchData();
  }, [account?.data, web3, contract]);

  return (
    <div className="flex montserrat">
      {loading ? (
        <Watch
          height="150"
          width="150"
          color="#2563eb"
          wrapperClass="mx-auto mt-24"
        />
      ) : (
        <p>{balanceOf}</p>
      )}
    </div>
  );
};

export default Dashboard;
