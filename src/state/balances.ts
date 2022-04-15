import { useQuery } from "react-query";
import useSigner from "./signer";

export type NFT = {
  token_id: string;
  token_url: string;
};

type Collection = {
  contract_address: string;
  contract_name: string;
  contract_ticker_symbol: string;
  logo_url: string;
  nft_data: NFT[];
};

const useBalances = () => {
  const { address = "" } = useSigner();

  const currentQK = ["balances", address];
  const { data, error } = useQuery<Collection[], number>(
    currentQK,
    () => fetchBalancesRequest(address),
    {
      enabled: Boolean(address),
    }
  );

  return { collections: data, collectionsError: error };
};

const fetchBalancesRequest = async (address: string) => {
  const response = await fetch(`/api/balances/${address}`);
  if (response.status != 200) throw new Error(`${response.status}`);
  const json = await response.json();
  return json.collections;
};

export default useBalances;
