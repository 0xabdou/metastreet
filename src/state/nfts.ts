import { Contract } from "ethers";
import { useQuery } from "react-query";
import useSigner from "./signer";

export type NFT = {
  token_id: string;
  owner: string;
};

type Collection = {
  contract_address: string;
  contract_name: string;
  contract_ticker_symbol: string;
  logo_url: string;
  nft_data: NFT[];
};

const ERC_721_ABI = [
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const useNFTs = () => {
  const { signer, address, searchAddress } = useSigner();
  const addressToBeUsed = searchAddress ?? address ?? "";

  const currentQK = ["nfts", addressToBeUsed];
  const { data, error } = useQuery<Collection[], number>(
    currentQK,
    () => fetchNFTsRequest(addressToBeUsed),
    {
      enabled: Boolean(address),
    }
  );

  type TransferNFTProps = {
    to: string;
    tokenID: string;
    contractAddress: string;
  };

  const transferNFT = async (props: TransferNFTProps) => {
    const { to, tokenID, contractAddress } = props;
    const contract = new Contract(contractAddress, ERC_721_ABI, signer);
    const tx = await contract.safeTransferFrom(address, to, tokenID);
    await tx.wait();
  };

  return { collections: data, collectionsError: error, transferNFT };
};

const fetchNFTsRequest = async (address: string) => {
  const response = await fetch(`/api/nfts/${address}`);
  if (response.status != 200) throw new Error(`${response.status}`);
  const json = await response.json();
  return json.collections;
};

export default useNFTs;
