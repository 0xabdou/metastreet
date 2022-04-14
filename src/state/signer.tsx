import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

type SignerContextType = {
  signer?: JsonRpcSigner;
  address?: string;
  loading: boolean;
  connectWallet: () => Promise<void>;
};

const SignerContext = createContext<SignerContextType>({} as any);

const useSigner = () => useContext(SignerContext);

export const SignerProvider = ({ children }: { children: ReactNode }) => {
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [address, setAddress] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ethereum = (window as any).ethereum;

    // Try to auto connect if metamask is unlocked
    const autoConnect = async () => {
      const provider = new Web3Provider(ethereum);
      try {
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) connectWallet();
      } catch (e) {}
    };
    autoConnect();

    // Listen to accountsChanged event
    const onAccountsChanged = (accounts: string[]) => {
      if (accounts.length) connectWallet();
      else {
        setSigner(undefined);
        setAddress(undefined);
      }
    };
    ethereum.on("accountsChanged", onAccountsChanged);

    // Remove listener after unmounting
    return () => {
      ethereum.removeListener("accountsChanged", onAccountsChanged);
    };
  }, []);

  const connectWallet = async () => {
    setLoading(true);
    try {
      // connect
      const provider = new Web3Provider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setSigner(signer);
      setAddress(address);
    } catch (e) {
      toast("Something wrong happened", { type: "error" });
      console.log(e);
    }
    setLoading(false);
  };

  const contextValue = { signer, address, loading, connectWallet };

  return (
    <SignerContext.Provider value={contextValue}>
      {children}
    </SignerContext.Provider>
  );
};

export default useSigner;
