// Components
import Header from "../Header";

// Hooks
import { useWeb3 } from "components/providers/web3";
import { useAccount } from "components/hooks";

const Layout = ({ children }) => {
  const { connect, web3 } = useWeb3();
  const { account } = useAccount();
  return (
    <>
      <Header account={account?.data} connect={connect} />
      {children}
    </>
  );
};

export default Layout;
