import { ExternalLinkIcon } from "@heroicons/react/solid";
import EmptyState from "components/EmptyState";
import NFTCard from "components/NFTCard";
import useBalances from "state/balances";
import useSigner from "state/signer";

const HomePage = () => {
  const { signer } = useSigner();
  const { collections, collectionsError } = useBalances();

  const notConnected = !signer;
  const loading = signer && !collections;
  const empty = signer && collections && collections.length == 0;
  const loaded = signer && collections && collections.length > 0;

  return (
    <div className="flex w-full flex-col">
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
                  <NFTCard nft={nft} className="mr-2 mb-2" key={nft.token_id} />
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
