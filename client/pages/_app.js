import "../styles/globals.css";

// Providers
import { Web3Provider } from "components/providers";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// Layout
import Layout from "components/ui/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Web3Provider>
  );
}

export default MyApp;
