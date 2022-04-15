import { SearchIcon } from "@heroicons/react/outline";
import { useState } from "react";
import useSigner from "state/signer";
import AddressAvatar from "./AddressAvatar";
import AddressInputDialog from "./AddressInputDialog";
import IconButton from "./IconButton";

const ConnectButton = () => {
  const { address, loading, connectWallet, setSearchAddress } = useSigner();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (address)
    return (
      <div className="flex items-center space-x-4">
        <IconButton
          icon={<SearchIcon className="h-full w-full" />}
          onClick={() => setDialogOpen(true)}
        />
        <AddressAvatar address={address} />
        <AddressInputDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSubmit={setSearchAddress}
        />
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
