import React from "react";
import { AuthContext } from "store/auth-context";

// SWR
import useSWR from "swr";

export const handler = (web3, provider) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/accounts" : null),
    async () => {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      if (!account) {
        throw new Error(
          "Cannot retrieve an account. Please refresh the browser."
        );
      }

      return account.toLowerCase();
    }
  );

  const authCTX = React.useContext(AuthContext);

  React.useEffect(() => {
    const mutator = (accounts) => {
      mutate(accounts[0] ?? null);
    };

    provider &&
      provider.on("accountsChanged", (accounts) => {
        authCTX.logout();
        mutator(accounts);
      });
  }, [mutate, provider]);

  return {
    account: {
      data,
      mutate,
      ...rest,
    },
  };
};
