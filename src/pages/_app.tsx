import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignerProvider } from "state/signer";
import Layout from "../components/Layout";
import "../styles/globals.css";

const client = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SignerProvider>
      <QueryClientProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </QueryClientProvider>
    </SignerProvider>
  );
};

export default MyApp;
