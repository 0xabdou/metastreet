import { SearchIcon } from "@heroicons/react/outline";
import { ethers } from "ethers";
import { useState } from "react";
import useSigner from "state/signer";
import AddressAvatar from "./AddressAvatar";
import Button from "./Button";
import CustomDialog from "./CustomDialog";
import IconButton from "./IconButton";
import { Input } from "./Input";

const ConnectButton = () => {
  const { address, loading, connectWallet, setSearchAddress } = useSigner();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string>();

  const onSubmit = () => {
    try {
      ethers.utils.getIcapAddress(searchQuery);
      setSearchAddress(searchQuery);
      setDialogOpen(false);
    } catch (e) {
      console.log(e);
      setError("Invalid address");
    }
  };

  if (address)
    return (
      <div className="flex items-center space-x-4">
        <IconButton
          icon={<SearchIcon className="h-full w-full" />}
          onClick={() => setDialogOpen(true)}
        />
        <AddressAvatar address={address} />
        <CustomDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title="SEARCH BY ADDRESS"
          description="Display NFTs for a different address"
          className="w-96"
        >
          <div className="flex items-center space-x-2">
            <Input
              value={searchQuery}
              error={error}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="0x367d3a87cc46fd91d202bd2b3ebe820fb010cadd"
              className="flex-grow"
            />
            <Button onClick={onSubmit}>SEARCH</Button>
          </div>
        </CustomDialog>
      </div>
    );
  return (
    <button
      className="flex h-10 w-36 items-center justify-center rounded-full bg-black px-4 font-semibold text-white"
      onClick={connectWallet}
      disabled={loading}
    >
      {loading ? "busy..." : "Connect wallet"}
    </button>
  );
};

export default ConnectButton;
