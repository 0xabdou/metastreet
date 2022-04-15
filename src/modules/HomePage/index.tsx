import { ExclamationCircleIcon, XIcon } from "@heroicons/react/outline";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import EmptyState from "components/EmptyState";
import NFTCard from "components/NFTCard";
import useNFTs from "state/nfts";
import useSigner from "state/signer";

const HomePage = () => {
  const { signer, searchAddress, setSearchAddress } = useSigner();
  const { collections, collectionsError } = useNFTs();

  const notConnected = !signer;
  const loading = signer && !collections && !collectionsError;
  const empty = signer && collections && collections.length == 0;
  const loaded = signer && collections && collections.length > 0;

  return (
    <div className="flex w-full flex-col">
      {!notConnected && searchAddress && (
        <div className="mb-4 flex items-center space-x-2 self-center">
          <div className="flex items-center rounded bg-blue-100 px-2 py-1">
            <ExclamationCircleIcon className="mr-2 h-4 w-4" />
            <p className="text-sm">
              Showing NFTs owned by{" "}
              <span className="font-semibold">{searchAddress}</span>
            </p>
          </div>
          <button
            className="flex"
            title="clear"
            type="button"
            onClick={() => setSearchAddress(undefined)}
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      )}
      {notConnected && <EmptyState>Connect your wallet</EmptyState>}
      {loading && <EmptyState>Loading...</EmptyState>}
      {collectionsError && <EmptyState>Couldn't fetch your NFTs...</EmptyState>}
      {empty && <EmptyState>Nothing to show here</EmptyState>}

      {loaded && (
        <div className="flex flex-col">
          {collections.map((collection, idx) => (
            <div className="flex flex-col" key={`collection_${idx}`}>
              {/* COLLECTION TITLE */}
              <a
                href={`https://etherscan.io/address/${collection.contract_address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start"
              >
                <h2 className="mb-4 flex items-center text-2xl font-bold hover:underline">
                  {collection.contract_name} (
                  {collection.contract_ticker_symbol}){" "}
                  <ExternalLinkIcon className="h-6 w-6" />
                </h2>
              </a>
              {/* COLLECTION LIST OF NFTS */}
              <div className="flex flex-wrap">
                {collection.nft_data.map((nft) => (
                  <NFTCard
                    nft={nft}
                    contractAddress={collection.contract_address}
                    className="mr-2 mb-2"
                    key={nft.token_id}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
