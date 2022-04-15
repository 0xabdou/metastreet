import classNames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NFT } from "state/balances";
import useSigner from "state/signer";
import { fetchNFTMetadata } from "../helpers";

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
  const { address } = useSigner();
  const router = useRouter();
  const [meta, setMeta] = useState<NFTMetadata>();
  const [loading, setLoading] = useState(false);
  const [sellPopupOpen, setSellPopupOpen] = useState(false);

  useEffect(() => {
    fetchNFTMetadata({ contractAddress, tokenID: nft.token_id })
      .then(setMeta)
      .catch((e) => console.log(e));
  }, [nft.token_url]);

  const showErrorToast = () => toast.warn("Something wrong!");

  const onButtonClick = async () => {};

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
      <div className="flex flex-col p-4">
        <p className="text-lg">{meta?.name ?? "..."}</p>
        <span className="text-sm font-normal">
          {meta?.description ?? "..."}
        </span>
      </div>
      <button
        className="group flex h-16 items-center justify-center bg-black text-lg font-semibold text-white"
        onClick={onButtonClick}
        disabled={loading}
      >
        {loading && "Busy..."}
        {!loading && "Transfer"}
      </button>
    </div>
  );
};

export default NFTCard;
