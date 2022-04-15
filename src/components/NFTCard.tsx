import classNames from "classnames";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useBalances, { NFT } from "state/balances";
import useSigner from "state/signer";
import { fetchNFTMetadata } from "../helpers";
import AddressInputDialog from "./AddressInputDialog";

type NFTMetadata = {
  name: string;
  description: string;
  imageURL: string;
};

type NFTCardProps = {
  nft: NFT;
  contractAddress: string;
  className?: string;
};

const NFTCard = (props: NFTCardProps) => {
  const { nft, contractAddress, className } = props;
  const { searchAddress } = useSigner();
  const { transferNFT } = useBalances();
  const [meta, setMeta] = useState<NFTMetadata>();
  const [loading, setLoading] = useState(false);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);

  useEffect(() => {
    fetchNFTMetadata({ contractAddress, tokenID: nft.token_id })
      .then(setMeta)
      .catch((e) => console.log(e));
  }, [contractAddress, nft.token_id]);

  const onTransfer = async (to: string) => {
    setLoading(true);
    try {
      await transferNFT({ to, contractAddress, tokenID: nft.token_id });
      toast.success("NFT Transferred, refresh the page");
    } catch (e) {
      toast.warn("Something wrong happened");
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <div
      className={classNames(
        "flex w-72 flex-shrink-0 flex-col overflow-hidden rounded-xl border font-semibold shadow-sm",
        className
      )}
    >
      {meta ? (
        <img
          src={meta?.imageURL}
          alt={meta?.name}
          className="h-80 w-full flex-shrink-0 object-cover object-center"
        />
      ) : (
        <div className="flex h-80 w-full flex-shrink-0 items-center justify-center">
          loading...
        </div>
      )}
      <div className="flex h-24 flex-col p-4">
        <p className="text-lg">{meta?.name ?? "..."}</p>
        <span className="text-sm font-normal line-clamp-2">
          {meta?.description ?? "..."}
        </span>
      </div>
      {
        // Only show the transfer button if the NFT is owned by the connected wallet
        !searchAddress && (
          <button
            className="group flex h-16 items-center justify-center bg-black text-lg font-semibold text-white"
            onClick={() => setAddressDialogOpen(true)}
            disabled={loading || !meta}
          >
            {loading && "BUSY..."}
            {!loading && "TRANSFER"}
          </button>
        )
      }
      <AddressInputDialog
        open={addressDialogOpen}
        onClose={() => setAddressDialogOpen(false)}
        onSubmit={onTransfer}
        title="Transfer"
        action="SUBMIT"
        description={
          <>
            Enter the address to which you want to transfer{" "}
            <span className="font-semibold">{meta?.name}</span> to:
          </>
        }
      />
    </div>
  );
};

export default NFTCard;
