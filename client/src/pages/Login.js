import React from "react";

// Hooks
import { useAccount } from "components/hooks";
import { useWeb3 } from "components/providers";

import { axiosClient } from "utils/axiosClient";
import { AuthContext } from "store/auth-context";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const { web3, connect } = useWeb3();
  const { account } = useAccount();
  const navigate = useNavigate();

  const authCTX = React.useContext(AuthContext);

  const [user, setUser] = React.useState(null);

  const handleSignMessage = async () => {
    const c = await web3.eth.getCoinbase();

    let sig = await web3.eth.personal.sign(
      web3.utils.fromUtf8(`One time nonce for Document Manager: ${user.nonce}`),
      c,
      "",
      (err, signature) => {
        if (err) {
          console.log(err);
          return;
        }
        return signature;
      }
    );

    await axiosClient
      .post(`/user/${account?.data}/signature`, {
        signature: sig,
      })
      .then((resp) => {
        setUser(resp.data.user);
        authCTX.login(resp.data.user.token, resp.data.user.expiresAt);
      });
  };

  React.useEffect(() => {
    const fetchData = async () => {
      await axiosClient
        .post("/user/" + account?.data)
        .then((resp) => {
          console.log(resp.data.user);
          setUser(resp.data.user);
        })
        .catch(async (e) => {
          await axiosClient.get("/user/" + account?.data).then((resp) => {
            setUser(resp.data.user);
          });
        })
        .catch((e) => {
          console.log("E => ", e.message);
        });
    };

    if (account?.data) fetchData();
  }, [account?.data]);

  return (
    <div className="flex w-screen mt-52 montserrat">
      <p class="p-6 max-w-md rounded-lg border border-gray-200 shadow-xl bg-white mx-auto">
        <h5 class="mb-10 text-2xl font-bold tracking-tight text-gray-900 text-center">
          Login
        </h5>
        {account.data ? (
          <p
            class="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group cursor-pointer"
            onClick={() => handleSignMessage()}
          >
            <span class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
            <span class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
            <span class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span class="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
            <span class="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
              Sign Message
            </span>
          </p>
        ) : (
          <p
            class="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group cursor-pointer"
            onClick={() => connect()}
          >
            <span class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
            <span class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
            <span class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span class="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
            <span class="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
              Connect Your Wallet
            </span>
          </p>
        )}
      </p>
    </div>
  );
};

export default Login;
