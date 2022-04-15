import { Contract, providers } from "ethers";

export const ipfsToHTTPS = (url: string) => {
  if (url.startsWith("ipfs://")) {
    const cid = url.substring(7);
    return `https://ipfs.io/ipfs/${cid}`;
  }
  return url;
};

export const minifyAddress = (address: string) => {
  const start = address.substring(0, 5);
  const end = address.substring(address.length - 4);
  return `${start}...${end}`;
};

type fetchNFTMetadataProps = {
  tokenID: string;
  contractAddress: string;
};

const ERC_721_METADATA_ABI = [
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
];

export const fetchNFTMetadata = async (props: fetchNFTMetadataProps) => {
  // Instantiate a contract object
  const contract = new Contract(
    props.contractAddress,
    ERC_721_METADATA_ABI,
    providers.getDefaultProvider()
  );
  // Fetch the token URI from the contract
  const tokenURI = await contract.tokenURI(props.tokenID);
  console.log("TOKEN URI: ", tokenURI);
  // Fetch token metadata from the above URI
  const metadataResponse = await fetch(ipfsToHTTPS(tokenURI));
  if (metadataResponse.status != 200) return;
  const json = await metadataResponse.json();
  return {
    name: json.name as string,
    description: json.description as string,
    imageURL: ipfsToHTTPS(json.image),
  };
};
